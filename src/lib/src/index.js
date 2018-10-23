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
    high: 256,
    medium: 128,
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
 * Generate mnemonic.
 *
 * @function genMnemonic
 * @param {String} [language=LANGUAGE.EN]
 * @param {Number} [entropy=ENTROPY.high]
 * @returns {String}
 */
export const genMnemonic = (
    language = LANGUAGE.EN,
    entropy = ENTROPY.high
) =>
    generateMnemonic(
        entropy,
        undefined,
        wordlists[language]
    )




/**
 * Generate hex seed from a given mnemonic.
 *
 * @function hexSeed
 * @param {String} mnemonic
 * @param {String} [passphrase=""]
 * @returns {String}
 */
export const hexSeed = mnemonicToSeedHex




/**
 * Generate stellar keypair object from a given seed and pathIndex.
 *
 * @function keypair
 * @param {String} seed
 * @param {Number} [pathIndex=0]
 * @returns {Object}
 */
export const keypair = (seed, pathIndex = 0) => {

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

            return { IL: IL, IR: IR }
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
 * Randomly generate object
 * with mnemonic, seed, keypair, publicKey and secret.
 *
 * @function random
 * @param {String} [language=LANGUAGE.EN]
 * @param {String} [passphrase=""]
 * @param {Number} [pathIndex=0]
 * @returns {Object}
 */
export const random = (
    language = LANGUAGE.EN,
    passphrase = string.empty(),
    pathIndex = 0
) => {

    const
        mnemonic = genMnemonic(language),
        seed = hexSeed(mnemonic, passphrase),
        keys = keypair(seed, pathIndex)

    return {
        mnemonic,
        seed,
        keypair: keys,
        publicKey: keys.publicKey(),
        secret: keys.secret(),
    }

}
