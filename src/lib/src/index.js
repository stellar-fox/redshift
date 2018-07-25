/**
 * Redshift.
 * Stellar HD Address Generator.
 *
 * @module @stellar-fox/redshift
 * @license Apache-2.0
 */




import bip39 from "bip39"
import sjcl from "sjcl"
import StellarBase from "stellar-base"
import { emptyString } from "@xcmats/js-toolbox"




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
 * @param {Number} [entropy=ENTROPY.high]
 * @param {String} [language=LANGUAGE.EN]
 * @returns {String}
 */
export const genMnemonic = (
    entropy = ENTROPY.high,
    language = LANGUAGE.EN
) =>
    bip39.generateMnemonic(
        entropy, undefined, bip39.wordlists[language]
    )




/**
 * Generate hex seed from a given mnemonic.
 *
 * @function hexSeed
 * @param {String} mnemonic
 * @param {String} [passphrase=""]
 * @returns {String}
 */
export const hexSeed = (mnemonic, passphrase = emptyString()) =>
    bip39.mnemonicToSeedHex(mnemonic, passphrase)




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
        seedToMasterNode = (seed) => {
            const
                hmac = new sjcl.misc.hmac(
                    sjcl.codec.utf8String.toBits("ed25519 seed"),
                    sjcl.hash.sha512
                ),
                I = hmac.encrypt(seed),
                IL = I.slice(0, 8),
                IR = I.slice(8)

            return { IL: IL, IR: IR, }
        },


        // ...
        derivePath = (initIL, initIR, path) => {
            let
                index, I,
                IL = initIL,
                IR = initIR

            for (let pathIndex = 0;  pathIndex < path.length;  pathIndex++) {
                index = path[pathIndex] + 0x80000000
                const hmac = new sjcl.misc.hmac(IR, sjcl.hash.sha512)
                I = hmac.encrypt(
                    sjcl.bitArray.concat(
                        sjcl.bitArray.concat(
                            sjcl.codec.hex.toBits("0x00"), IL
                        ),
                        sjcl.codec.hex.toBits(index.toString(16))
                    )
                )
                IL = I.slice(0, 8)
                IR = I.slice(8)
            }

            return { IL: IL, IR: IR, }
        },


        // ...
        fromBits = (arr, padding = true, paddingCount = 8) => {
            var out, ol, tmp, smallest

            if (arr.length === 0) {
                return new ArrayBuffer(0)
            }

            ol = sjcl.bitArray.bitLength(arr) / 8

            // check to make sure the bitLength is divisible by 8, if it isn't
            // we can't do anything since arraybuffers work with bytes,
            // not bits
            if (sjcl.bitArray.bitLength(arr) % 8  !==  0) {
                throw new Error(
                    "Invalid bit size. It must be divisble by 8 " +
                    "to fit in an ArrayBuffer correctly.",
                )
            }

            if (padding  &&  ol % paddingCount !== 0) {
                ol += paddingCount - (ol % paddingCount)
            }

            // padded temp for easy copying
            tmp = new DataView(new ArrayBuffer(arr.length * 4))
            for (let i = 0;  i < arr.length;  i++) {
                // get rid of the higher bits
                tmp.setUint32(i * 4, (arr[i] << 32))
            }

            // now copy the final message if we are not going to 0 pad
            out = new DataView(new ArrayBuffer(ol))

            // save a step when the tmp and out bytelength are equal
            if (out.byteLength === tmp.byteLength) {
                return tmp.buffer
            }

            smallest =
                tmp.byteLength < out.byteLength ?
                    tmp.byteLength : out.byteLength

            for (let i = 0;  i < smallest;  i++) {
                out.setUint8(i, tmp.getUint8(i))
            }

            return out.buffer
        },


        // ...
        hdAccountFromSeed = function (seed, pathIndex) {
            let
                masterNode = seedToMasterNode(sjcl.codec.hex.toBits(seed)),
                derivedPath = derivePath(
                    masterNode.IL, masterNode.IR, [44, 148, pathIndex,]
                )

            return StellarBase.Keypair.fromRawEd25519Seed(
                fromBits(derivedPath.IL)
            )
        }


    return hdAccountFromSeed(seed, pathIndex)
}




/**
 * Randomly generate object with mnemonic, seed, keypair, publicKey and secret.
 *
 * @function random
 * @param {String} [language=LANGUAGE.EN]
 * @param {String} [passphrase=""]
 * @param {Number} [pathIndex=0]
 * @returns {Object}
 */
export const random = (
    language = LANGUAGE.EN,
    passphrase = emptyString(),
    pathIndex = 0
) => {
    const
        mnemonic = genMnemonic(ENTROPY.high, language),
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