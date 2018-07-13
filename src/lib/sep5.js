import sjcl from "sjcl"
import StellarBase from "stellar-base"




// ...
export const generateKeyPair = (seed, pathIndex) => {
    let keyPair = null

    const
        // ...
        seedToMasterNode = (seed) => {
            const hmac = new sjcl.misc.hmac(
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
            let index,
                I,
                IL = initIL,
                IR = initIR,
                pathIndex
            for (pathIndex = 0; pathIndex < path.length; pathIndex++) {
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
        hdAccountFromSeed = (seed, pathIndex) => {
            let masterNode = seedToMasterNode(sjcl.codec.hex.toBits(seed)),
                derivedPath = derivePath(masterNode.IL, masterNode.IR, [
                    44,
                    148,
                    pathIndex,
                ])
            return StellarBase.Keypair.fromRawEd25519Seed(
                sjcl.codec.arrayBuffer.fromBits(derivedPath.IL)
            )
        }

    keyPair = hdAccountFromSeed(seed, pathIndex)

    return keyPair
}
