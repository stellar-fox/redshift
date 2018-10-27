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
 * Entropy preset.
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
    generateMnemonic(
        entropy,
        undefined,
        wordlists[language]
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
 * Generate `stellar` Keypair object from a given `seed` and a `pathIndex`.
 *
 * @function genKeypair
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki}
 * @param {String} seed
 * @param {Number} [pathIndex=0]
 * @returns {Object}
 */
export const genKeypair = (seed, pathIndex = 0) => {

    // hash-based message authentication using sha512
    const hmac512 = (key, data) =>
        new sjclMisc.hmac(key, sjclHash.sha512).encrypt(data)

    // generate _stellar_ `Keypair` object from a path-derived `seed`
    return func.compose(
        // consume seed represented as `TypedArray`
        // and produce _stellar_ `Keypair` object
        Keypair.fromRawEd25519Seed.bind(Keypair),
        // convert SJCL's `bits` representation to a `TypedArray` in two steps:
        // `bits-to-hex` and then `hex-to-bytes` (read it right-to-left)
        codec.hexToBytes, sjclCodec.hex.fromBits
    )(
        // walk the path and compute "hardened child extended private key"
        [44, 148, pathIndex].reduce(
            // compute "hardened child"
            (acc, el) => hmac512(
                acc.slice(8),
                [
                    sjclCodec.hex.toBits("0x00"),
                    acc.slice(0, 8),
                    sjclCodec.hex.toBits((el + 0x80000000).toString(16)),
                ].reduce(bitArray.concat, [])
            ),
            // derive a "master extended private key" from an address seed
            hmac512(
                sjclCodec.utf8String.toBits("ed25519 seed"),
                sjclCodec.hex.toBits(seed)
            )
        ).slice(0, 8)
    )

}




/**
 * Randomly generate object with `mnemonic`,
 * `passphrase`, `pathIndex`, `seed` and `keypair`.
 *
 * @function newAccount
 * @param {String} [passphrase=""]
 * @param {Number} [pathIndex=0]
 * @param {String} [language=LANGUAGE.EN]
 * @returns {Object}
 */
export const newAccount = (
    passphrase = string.empty(),
    pathIndex = 0,
    language = LANGUAGE.EN
) => {

    let
        mnemonic = genMnemonic(language),
        seed = mnemonicToSeedHex(mnemonic, passphrase),
        keypair = genKeypair(seed, pathIndex)

    return { mnemonic, passphrase, pathIndex, seed, keypair }

}




/**
 * Library version.
 *
 * @constant version
 */
export { version } from "../package.json"
