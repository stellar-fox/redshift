/* global describe it */


var

    // needed modules
    assert = require("assert"),
    redshift = require("../dist/redshift"),
    { string } = require("@xcmats/js-toolbox"),


    // test data
    testVector3Mnemonic  = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better",
    testVector3PublicKeys = [
        "GC3MMSXBWHL6CPOAVERSJITX7BH76YU252WGLUOM5CJX3E7UCYZBTPJQ",
        "GB3MTYFXPBZBUINVG72XR7AQ6P2I32CYSXWNRKJ2PV5H5C7EAM5YYISO",
        "GDYF7GIHS2TRGJ5WW4MZ4ELIUIBINRNYPPAWVQBPLAZXC2JRDI4DGAKU",
        "GAFLH7DGM3VXFVUID7JUKSGOYG52ZRAQPZHQASVCEQERYC5I4PPJUWBD",
        "GAXG3LWEXWCAWUABRO6SMAEUKJXLB5BBX6J2KMHFRIWKAMDJKCFGS3NN",
        "GA6RUD4DZ2NEMAQY4VZJ4C6K6VSEYEJITNSLUQKLCFHJ2JOGC5UCGCFQ",
        "GCUDW6ZF5SCGCMS3QUTELZ6LSAH6IVVXNRPRLAUNJ2XYLCA7KH7ZCVQS",
        "GBJ646Q524WGBN5X5NOAPIF5VQCR2WZCN6QZIDOSY6VA2PMHJ2X636G4",
        "GDHX4LU6YBSXGYTR7SX2P4ZYZSN24VXNJBVAFOB2GEBKNN3I54IYSRM4",
        "GDXOY6HXPIDT2QD352CH7VWX257PHVFR72COWQ74QE3TEV4PK2KCKZX7",
    ],
    testVector3SecretKeys = [
        "SAEWIVK3VLNEJ3WEJRZXQGDAS5NVG2BYSYDFRSH4GKVTS5RXNVED5AX7",
        "SBKSABCPDWXDFSZISAVJ5XKVIEWV4M5O3KBRRLSPY3COQI7ZP423FYB4",
        "SD5CCQAFRIPB3BWBHQYQ5SC66IB2AVMFNWWPBYGSUXVRZNCIRJ7IHESQ",
        "SBSGSAIKEF7JYQWQSGXKB4SRHNSKDXTEI33WZDRR6UHYQCQ5I6ZGZQPK",
        "SBIZH53PIRFTPI73JG7QYA3YAINOAT2XMNAUARB3QOWWVZVBAROHGXWM",
        "SCVM6ZNVRUOP4NMCMMKLTVBEMAF2THIOMHPYSSMPCD2ZU7VDPARQQ6OY",
        "SBSHUZQNC45IAIRSAHMWJEJ35RY7YNW6SMOEBZHTMMG64NKV7Y52ZEO2",
        "SC2QO2K2B4EBNBJMBZIKOYSHEX4EZAZNIF4UNLH63AQYV6BE7SMYWC6E",
        "SCGMC5AHAAVB3D4JXQPCORWW37T44XJZUNPEMLRW6DCOEARY3H5MAQST",
        "SCPA5OX4EYINOPAUEQCPY6TJMYICUS5M7TVXYKWXR3G5ZRAJXY3C37GF",
    ],
    testVector4Mnemonic  = "cable spray genius state float twenty onion head street palace net private method loan turn phrase state blanket interest dry amazing dress blast tube",
    testVector4Passhrase = "p4ssphr4se"




// Vector 3
describe("Test Vector 3 (SEP-0005)", () => {

    // seed
    describe("BIP39 Seed", () =>
        it("should return: 937ae91...f567866", () =>
            assert.equal(
                redshift.mnemonicToSeedHex(testVector3Mnemonic),
                "937ae91f6ab6f12461d9936dfc1375ea5312d097f3f1eb6fed6a82fbe38c85824da8704389831482db0433e5f6c6c9700ff1946aa75ad8cc2654d6e40f567866"
            )
        )
    )


    // public keys
    testVector3PublicKeys.forEach((key, i) =>
        describe(`Public Key (m/44'/148'/${i}')`, () =>
            it(`should return: ${string.shorten(key, 11)}`, () =>
                assert.equal(
                    redshift.genKeypair(
                        redshift.mnemonicToSeedHex(testVector3Mnemonic), i
                    ).publicKey(),
                    key
                )
            )
        )
    )


    // secret keys
    testVector3SecretKeys.forEach((key, i) =>
        describe(`Secret Key (m/44'/148'/${i}')`, () =>
            it(`should return: ${string.shorten(key, 11)}`, () =>
                assert.equal(
                    redshift.genKeypair(
                        redshift.mnemonicToSeedHex(testVector3Mnemonic), i
                    ).secret(),
                    key
                )
            )
        )
    )

})




// ...
describe("Test Vector 4 (SEP-0005)", () => {
    describe("BIP39 Seed", () =>
        it("should return: d425d39...742a489", () =>
            assert.equal(
                redshift.mnemonicToSeedHex(testVector4Mnemonic, testVector4Passhrase),
                "d425d39998fb42ce4cf31425f0eaec2f0a68f47655ea030d6d26e70200d8ff8bd4326b4bdf562ea8640a1501ae93ccd0fd7992116da5dfa24900e570a742a489"
            )
        )
    )

    // PUBLIC KEYS

    describe("Public Key (m/44'/148'/0')", () =>
        it("should return: GDAHP...B63EQ", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                )).publicKey(),
                "GDAHPZ2NSYIIHZXM56Y36SBVTV5QKFIZGYMMBHOU53ETUSWTP62B63EQ"
            )
        )
    )

    describe("Public Key (m/44'/148'/1')", () =>
        it("should return: GDY47...4OJOC", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 1).publicKey(),
                "GDY47CJARRHHL66JH3RJURDYXAMIQ5DMXZLP3TDAUJ6IN2GUOFX4OJOC"
            )
        )
    )

    describe("Public Key (m/44'/148'/2')", () =>
        it("should return: GCLAQ...7JJID", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 2).publicKey(),
                "GCLAQF5H5LGJ2A6ACOMNEHSWYDJ3VKVBUBHDWFGRBEPAVZ56L4D7JJID"
            )
        )
    )

    describe("Public Key (m/44'/148'/3')", () =>
        it("should return: GBC36...5ZN3B", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 3).publicKey(),
                "GBC36J4KG7ZSIQ5UOSJFQNUP4IBRN6LVUFAHQWT2ODEQ7Y3ASWC5ZN3B"
            )
        )
    )

    describe("Public Key (m/44'/148'/4')", () =>
        it("should return: GA6NH...7E3CB", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 4).publicKey(),
                "GA6NHA4KPH5LFYD6LZH35SIX3DU5CWU3GX6GCKPJPPTQCCQPP627E3CB"
            )
        )
    )

    describe("Public Key (m/44'/148'/5')", () =>
        it("should return: GBOWM...OLA5L", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 5).publicKey(),
                "GBOWMXTLABFNEWO34UJNSJJNVEF6ESLCNNS36S5SX46UZT2MNYJOLA5L"
            )
        )
    )

    describe("Public Key (m/44'/148'/6')", () =>
        it("should return: GBL3F...EXTSZ", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 6).publicKey(),
                "GBL3F5JUZN3SQKZ7SL4XSXEJI2SNSVGO6WZWNJLG666WOJHNDDLEXTSZ"
            )
        )
    )

    describe("Public Key (m/44'/148'/7')", () =>
        it("should return: GA5XP...KSAND", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 7).publicKey(),
                "GA5XPPWXL22HFFL5K5CE37CEPUHXYGSP3NNWGM6IK6K4C3EFHZFKSAND"
            )
        )
    )

    describe("Public Key (m/44'/148'/8')", () =>
        it("should return: GDS5I...IZ3XU", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 8).publicKey(),
                "GDS5I7L7LWFUVSYVAOHXJET2565MGGHJ4VHGVJXIKVKNO5D4JWXIZ3XU"
            )
        )
    )

    describe("Public Key (m/44'/148'/9')", () =>
        it("should return: GBOSM...BCYRR", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 9).publicKey(),
                "GBOSMFQYKWFDHJWCMCZSMGUMWCZOM4KFMXXS64INDHVCJ2A2JAABCYRR"
            )
        )
    )

    // SECRET KEYS

    describe("Secret Key (m/44'/148'/0')", () =>
        it("should return: SAFWT...XYP2X", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                )).secret(),
                "SAFWTGXVS7ELMNCXELFWCFZOPMHUZ5LXNBGUVRCY3FHLFPXK4QPXYP2X"
            )
        )
    )

    describe("Secret Key (m/44'/148'/1')", () =>
        it("should return: SBQPD...MZPJF", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 1).secret(),
                "SBQPDFUGLMWJYEYXFRM5TQX3AX2BR47WKI4FDS7EJQUSEUUVY72MZPJF"
            )
        )
    )

    describe("Secret Key (m/44'/148'/2')", () =>
        it("should return: SAF2L...ZV6BZ", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 2).secret(),
                "SAF2LXRW6FOSVQNC4HHIIDURZL4SCGCG7UEGG23ZQG6Q2DKIGMPZV6BZ"
            )
        )
    )

    describe("Secret Key (m/44'/148'/3')", () =>
        it("should return: SDCCV...TV4GQ", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 3).secret(),
                "SDCCVBIYZDMXOR4VPC3IYMIPODNEDZCS44LDN7B5ZWECIE57N3BTV4GQ"
            )
        )
    )

    describe("Secret Key (m/44'/148'/4')", () =>
        it("should return: SA5TR...NDVNT", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 4).secret(),
                "SA5TRXTO7BG2Z6QTQT3O2LC7A7DLZZ2RBTGUNCTG346PLVSSHXPNDVNT"
            )
        )
    )

    describe("Secret Key (m/44'/148'/5')", () =>
        it("should return: SDEOE...SKKUC", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 5).secret(),
                "SDEOED2KPHV355YNOLLDLVQB7HDPQVIGKXCAJMA3HTM4325ZHFZSKKUC"
            )
        )
    )

    describe("Secret Key (m/44'/148'/6')", () =>
        it("should return: SDYNO...EEI6A", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 6).secret(),
                "SDYNO6TLFNV3IM6THLNGUG5FII4ET2H7NH3KCT6OAHIUSHKR4XBEEI6A"
            )
        )
    )

    describe("Secret Key (m/44'/148'/7')", () =>
        it("should return: SDXMJ...JXCYD", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 7).secret(),
                "SDXMJXAY45W3WEFWMYEPLPIF4CXAD5ECQ37XKMGY5EKLM472SSRJXCYD"
            )
        )
    )

    describe("Secret Key (m/44'/148'/8')", () =>
        it("should return: SAIZA...N2IQB", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 8).secret(),
                "SAIZA26BUP55TDCJ4U7I2MSQEAJDPDSZSBKBPWQTD5OQZQSJAGNN2IQB"
            )
        )
    )

    describe("Secret Key (m/44'/148'/9')", () =>
        it("should return: SDXDY...UXNOS", () =>
            assert.equal(
                redshift.genKeypair(redshift.mnemonicToSeedHex(
                    testVector4Mnemonic, testVector4Passhrase
                ), 9).secret(),
                "SDXDYPDNRMGOF25AWYYKPHFAD3M54IT7LCLG7RWTGR3TS32A4HTUXNOS"
            )
        )
    )

})
