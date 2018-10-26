/* global describe it */


var

    // needed modules
    assert = require("assert"),
    redshift = require("../dist/redshift"),
    { string } = require("@xcmats/js-toolbox"),


    // test data
    testVector3Mnemonic  = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better",
    testVector3SeedHex = "937ae91f6ab6f12461d9936dfc1375ea5312d097f3f1eb6fed6a82fbe38c85824da8704389831482db0433e5f6c6c9700ff1946aa75ad8cc2654d6e40f567866",
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
    testVector4Passhrase = "p4ssphr4se",
    testVector4SeedHex = "d425d39998fb42ce4cf31425f0eaec2f0a68f47655ea030d6d26e70200d8ff8bd4326b4bdf562ea8640a1501ae93ccd0fd7992116da5dfa24900e570a742a489",
    testVector4PublicKeys = [
        "GDAHPZ2NSYIIHZXM56Y36SBVTV5QKFIZGYMMBHOU53ETUSWTP62B63EQ",
        "GDY47CJARRHHL66JH3RJURDYXAMIQ5DMXZLP3TDAUJ6IN2GUOFX4OJOC",
        "GCLAQF5H5LGJ2A6ACOMNEHSWYDJ3VKVBUBHDWFGRBEPAVZ56L4D7JJID",
        "GBC36J4KG7ZSIQ5UOSJFQNUP4IBRN6LVUFAHQWT2ODEQ7Y3ASWC5ZN3B",
        "GA6NHA4KPH5LFYD6LZH35SIX3DU5CWU3GX6GCKPJPPTQCCQPP627E3CB",
        "GBOWMXTLABFNEWO34UJNSJJNVEF6ESLCNNS36S5SX46UZT2MNYJOLA5L",
        "GBL3F5JUZN3SQKZ7SL4XSXEJI2SNSVGO6WZWNJLG666WOJHNDDLEXTSZ",
        "GA5XPPWXL22HFFL5K5CE37CEPUHXYGSP3NNWGM6IK6K4C3EFHZFKSAND",
        "GDS5I7L7LWFUVSYVAOHXJET2565MGGHJ4VHGVJXIKVKNO5D4JWXIZ3XU",
        "GBOSMFQYKWFDHJWCMCZSMGUMWCZOM4KFMXXS64INDHVCJ2A2JAABCYRR",
    ],
    testVector4SecretKeys = [
        "SAFWTGXVS7ELMNCXELFWCFZOPMHUZ5LXNBGUVRCY3FHLFPXK4QPXYP2X",
        "SBQPDFUGLMWJYEYXFRM5TQX3AX2BR47WKI4FDS7EJQUSEUUVY72MZPJF",
        "SAF2LXRW6FOSVQNC4HHIIDURZL4SCGCG7UEGG23ZQG6Q2DKIGMPZV6BZ",
        "SDCCVBIYZDMXOR4VPC3IYMIPODNEDZCS44LDN7B5ZWECIE57N3BTV4GQ",
        "SA5TRXTO7BG2Z6QTQT3O2LC7A7DLZZ2RBTGUNCTG346PLVSSHXPNDVNT",
        "SDEOED2KPHV355YNOLLDLVQB7HDPQVIGKXCAJMA3HTM4325ZHFZSKKUC",
        "SDYNO6TLFNV3IM6THLNGUG5FII4ET2H7NH3KCT6OAHIUSHKR4XBEEI6A",
        "SDXMJXAY45W3WEFWMYEPLPIF4CXAD5ECQ37XKMGY5EKLM472SSRJXCYD",
        "SAIZA26BUP55TDCJ4U7I2MSQEAJDPDSZSBKBPWQTD5OQZQSJAGNN2IQB",
        "SDXDYPDNRMGOF25AWYYKPHFAD3M54IT7LCLG7RWTGR3TS32A4HTUXNOS",
    ]




// Vector 3
describe("Test Vector 3 (SEP-0005)", () => {

    // seed
    describe("BIP39 Seed", () =>
        it(`should return: ${string.shorten(testVector3SeedHex, 15)}`, () =>
            assert.equal(
                redshift.mnemonicToSeedHex(testVector3Mnemonic),
                testVector3SeedHex
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




// Vector 4
describe("Test Vector 4 (SEP-0005)", () => {

    // seed
    describe("BIP39 Seed", () =>
        it(`should return: ${string.shorten(testVector4SeedHex, 15)}`, () =>
            assert.equal(
                redshift.mnemonicToSeedHex(
                    testVector4Mnemonic,
                    testVector4Passhrase,
                ),
                testVector4SeedHex
            )
        )
    )


    // public keys
    testVector4PublicKeys.forEach((key, i) =>
        describe(`Public Key (m/44'/148'/${i}')`, () =>
            it(`should return: ${string.shorten(key, 11)}`, () =>
                assert.equal(
                    redshift.genKeypair(
                        redshift.mnemonicToSeedHex(
                            testVector4Mnemonic,
                            testVector4Passhrase,
                        ), i
                    ).publicKey(),
                    key
                )
            )
        )
    )


    // secret keys
    testVector4SecretKeys.forEach((key, i) =>
        describe(`Secret Key (m/44'/148'/${i}')`, () =>
            it(`should return: ${string.shorten(key, 11)}`, () =>
                assert.equal(
                    redshift.genKeypair(
                        redshift.mnemonicToSeedHex(
                            testVector4Mnemonic,
                            testVector4Passhrase,
                        ), i
                    ).secret(),
                    key
                )
            )
        )
    )

})
