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
 * @param {String} seed
 * @param {Number} [pathIndex=0]
 * @returns {Object}
 */
export const genKeypair = (seed, pathIndex = 0) => {

    const

        // ...
        seedToMasterNode = (seed) => (
            (I) => ({ IL: I.slice(0, 8), IR: I.slice(8) })
        )(
            new sjclMisc.hmac(
                sjclCodec.utf8String.toBits("ed25519 seed"),
                sjclHash.sha512
            ).encrypt(seed)
        ),


        // ...
        derivePath = (initIL, initIR, path) => {
            let IL = initIL, IR = initIR

            for (
                let pathIndex = 0;
                pathIndex < path.length;
                pathIndex++
            ) {
                let
                    index = path[pathIndex] + 0x80000000,
                    I = new sjclMisc.hmac(IR, sjclHash.sha512).encrypt(
                        bitArray.concat(
                            bitArray.concat(sjclCodec.hex.toBits("0x00"), IL),
                            sjclCodec.hex.toBits(index.toString(16))
                        )
                    )
                IL = I.slice(0, 8)
                IR = I.slice(8)
            }

            return { IL, IR }
        },


        // ...
        masterNode = func.compose(
            seedToMasterNode,
            sjclCodec.hex.toBits
        )(seed)


    return func.compose(
        Keypair.fromRawEd25519Seed.bind(Keypair),
        codec.hexToBytes,
        sjclCodec.hex.fromBits
    )(
        derivePath(
            masterNode.IL,
            masterNode.IR,
            [44, 148, pathIndex]
        ).IL
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
