/**
 * Redshift.
 * Stellar HD Address Generator.
 *
 * @module @stellar-fox/redshift
 * @license Apache-2.0
 */




import {
    generateMnemonic,
    mnemonicToSeedHex,
    validateMnemonic as bip39validateMnemonic,
    wordlists,
} from "bip39"
import {
    codec,
    func,
    string,
} from "@xcmats/js-toolbox"
import {
    bitArray,
    codec as sjclCodec,
    misc as sjclMisc,
    hash as sjclHash,
} from "sjcl"
import { Keypair } from "stellar-base"




/**
 * Entropy presets.
 *
 * @name ENTROPY
 */
export const ENTROPY = Object.freeze({
    HIGH: 256,
    MEDIUM: 128,
})




/**
 * Languages.
 *
 * @name LANGUAGE
 */
export const LANGUAGE = Object.freeze({
    CN: "chinese_simplified",
    CT: "chinese_traditional",
    EN: "english",
    FR: "french",
    IT: "italian",
    JP: "japanese",
    KR: "korean",
    SP: "spanish",
})




/**
 * Generate mnemonic. BIP39 implementation.
 *
 * @function genMnemonic
 * @param {String} [language=LANGUAGE.EN]
 * @param {Number} [entropy=ENTROPY.HIGH]
 * @returns {String}
 */
export const genMnemonic = (
    language = LANGUAGE.EN,
    entropy = ENTROPY.HIGH
) =>
    func.rearg(generateMnemonic)(2, 0, 1)(
        wordlists[language],
        entropy
    )




/**
 * Check mnemonic validity. BIP39 implementation.
 *
 * @function validateMnemonic
 * @param {String} mnemonic
 * @param {String} [language=LANGUAGE.EN]
 * @returns {Boolean} `true` if mnemonic checksum is ok, `false` otherwise
 */
export const validateMnemonic = (mnemonic, language = LANGUAGE.EN) =>
    bip39validateMnemonic(mnemonic, wordlists[language])




/**
 * Generate hex seed from a given `mnemonic` and `passphrase`.
 * BIP39 implementation.
 *
 * @function mnemonicToSeedHex
 * @param {String} mnemonic
 * @param {String} [passphrase=""]
 * @returns {String}
 */
export { mnemonicToSeedHex } from "bip39"




/**
 * Generate `stellar` Keypair object
 * from a given `seed` and an `account` number.
 *
 * ` m / purpose' / coin_type' / account' ` (names defined in BIP-0044)
 *
 * ` m /      44' /       148' / account' ` (3 levels of BIP-0032 path)
 *
 * @function genKeypair
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki}
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki}
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0043.mediawiki}
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
 * @see {@link https://github.com/satoshilabs/slips/blob/master/slip-0010.md}
 * @see {@link https://github.com/satoshilabs/slips/blob/master/slip-0044.md}
 * @see {@link https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md}
 * @param {String} hexSeed hex-encoded seed
 * @param {Number} [account=0]
 * @returns {Object}
 */
export const genKeypair = (hexSeed, account = 0) => {

    // hash-based message authentication using sha512 (hmac-sha512)
    const hmac512 = (key, data) =>
        new sjclMisc.hmac(key, sjclHash.sha512).encrypt(data)

    // generate _stellar_ `Keypair` object from child extended secret key
    return func.pipe(
        // walk the path and compute "child, hardened, extended, private key":
        // 44' - "purpose" constant - see BIP-0043 and BIP-0044
        // 148' - SLIP-0044 registered coin type (XLM)
        [44, 148, account].reduce(
            // compute "child extended hardened key" from "extended parent"
            (parent, index) => hmac512(
                // I_R - parent chain code (last 32 bytes)
                parent.slice(8),
                [
                    // padding
                    sjclCodec.hex.toBits("0x00"),
                    // ser_256(k_par) - parent secret key (I_L)
                    parent.slice(0, 8),
                    // ser_32(i) - "i" is 2**31 + index ("hardened")
                    sjclCodec.hex.toBits((2**31 + index).toString(16)),
                // concatenate all of the above
                ].reduce(bitArray.concat, [])
            ),
            // derive a "master extended private key" from an address seed
            hmac512(
                // SLIP-0010 salt for ed25519 curve
                sjclCodec.utf8String.toBits("ed25519 seed"),
                // SJCL's `bits` representation of seed
                sjclCodec.hex.toBits(hexSeed)
            )
        // child extended secret key (first 32 bytes)
        ).slice(0, 8)
    )(
        // convert SJCL's `bits` representation to a `TypedArray` in two steps:
        // `bits-to-hex` ...
        sjclCodec.hex.fromBits,
        // ... and then `hex-to-bytes`
        codec.hexToBytes,
        // consume seed represented as `TypedArray`
        // and produce _stellar_ `Keypair` object
        Keypair.fromRawEd25519Seed.bind(Keypair)
    )

}




/**
 * redshift.newAddress() return value description.
 *
 * @typedef {Object} AddressDescription
 * @property {String} mnemonic
 * @property {String} passphrase
 * @property {Number} account
 * @property {String} seed
 * @property {Object} keypair
 */




/**
 * Randomly generate object with `mnemonic`,
 * `passphrase`, `account` number, `seed` and `keypair`.
 *
 * @function newAddress
 * @param {String} [passphrase=""]
 * @param {Number} [account=0]
 * @param {String} [language=LANGUAGE.EN]
 * @returns {AddressDescription}
 */
export const newAddress = (
    passphrase = string.empty(),
    account = 0,
    language = LANGUAGE.EN
) => {

    let
        mnemonic = genMnemonic(language),
        seed = mnemonicToSeedHex(mnemonic, passphrase),
        keypair = genKeypair(seed, account)

    return { mnemonic, passphrase, account, seed, keypair }

}




/**
 * Restore address from a given `mnemonic`,
 * `passphrase` and `account` number.
 *
 * @function restoreAddress
 * @param {String} mnemonic
 * @param {String} [passphrase=""]
 * @param {Number} [account=0]
 * @returns {AddressDescription}
 */
export const restoreAddress = (
    mnemonic,
    passphrase = string.empty(),
    account = 0
) => {

    let
        seed = mnemonicToSeedHex(mnemonic, passphrase),
        keypair = genKeypair(seed, account)

    return { mnemonic, passphrase, account, seed, keypair }

}




/**
 * Library version.
 *
 * @constant {String} version
 */
export { version } from "../package.json"




/**
 * Return array of all defined words for a given language.
 *
 * @function words
 * @param {String} [language=LANGUAGE.EN]
 * @returns {Array.<String>}
 */
export const words = (language = LANGUAGE.EN) => wordlists[language]
