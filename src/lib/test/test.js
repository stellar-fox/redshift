/* global describe it */
var assert = require("assert")
var redshift = require("../lib/index")

var testVector3Mnemonic = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better"


describe("Test Vector 3 (SEP-0005)", () => {
    describe("BIP39 Seed", () =>
        it("should return: 937ae91...f567866", () =>
            assert.equal(
                redshift.hexSeed(testVector3Mnemonic),
                "937ae91f6ab6f12461d9936dfc1375ea5312d097f3f1eb6fed6a82fbe38c85824da8704389831482db0433e5f6c6c9700ff1946aa75ad8cc2654d6e40f567866"
            )
        )
    )

    // PUBLIC KEYS

    describe("Public Key (m/44'/148'/0')", () =>
        it("should return: GC3MM...BTPJQ", () =>
            assert.equal(
                redshift.keypair(redshift.hexSeed(testVector3Mnemonic)).publicKey(),
                "GC3MMSXBWHL6CPOAVERSJITX7BH76YU252WGLUOM5CJX3E7UCYZBTPJQ"
            )
        )
    )

    describe("Public Key (m/44'/148'/1')", () =>
        it("should return: GB3MT...YYISO", () =>
            assert.equal(
                redshift.keypair(redshift.hexSeed(testVector3Mnemonic), 1).publicKey(),
                "GB3MTYFXPBZBUINVG72XR7AQ6P2I32CYSXWNRKJ2PV5H5C7EAM5YYISO"
            )
        )
    )

    describe("Public Key (m/44'/148'/2')", () =>
        it("should return: GDYF7...DGAKU", () =>
            assert.equal(
                redshift.keypair(redshift.hexSeed(testVector3Mnemonic), 2).publicKey(),
                "GDYF7GIHS2TRGJ5WW4MZ4ELIUIBINRNYPPAWVQBPLAZXC2JRDI4DGAKU"
            )
        )
    )

    // SECRET KEYS

    describe("Public Key (m/44'/148'/2')", () =>
        it("should return: SAEWI...D5AX7", () =>
            assert.equal(
                redshift.keypair(redshift.hexSeed(testVector3Mnemonic)).secret(),
                "SAEWIVK3VLNEJ3WEJRZXQGDAS5NVG2BYSYDFRSH4GKVTS5RXNVED5AX7"
            )
        )
    )


})
