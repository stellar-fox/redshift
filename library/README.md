# redshift

Stellar HD Accounts Generator - library.

[![npm version](https://img.shields.io/npm/v/@stellar-fox/redshift.svg)](https://www.npmjs.com/package/@stellar-fox/redshift)
[![npm license](https://img.shields.io/npm/l/@stellar-fox/redshift.svg)](https://www.npmjs.com/package/@stellar-fox/redshift)
[![GitHub top language](https://img.shields.io/github/languages/top/stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift)
[![GitHub code size](https://img.shields.io/github/languages/code-size/stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift)
[![GitHub tag](https://img.shields.io/github/tag/stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift)

```bash
$ npm i @stellar-fox/redshift
```

<br />




## index

* [hierarchical deterministic addresses](#hierarchical-deterministic-addresses)
* [multi-account hierarchy](#multi-account-hierarchy-for-deterministic-wallets)
* [key derivation methods](#key-derivation-methods-for-stellar-accounts)
* [documentation](#documentation)
* [experimenting in browser](#experimenting-in-browser)
* [experimenting locally](#experimenting-locally)
* [examples](#examples)
* [tests](#tests)
* [support](#support)
* [license](#license)

<br />




## hierarchical deterministic addresses

Mnemonic (a lists of specially prepared words) can be used to generate
deterministic series of account addresses. The method implemented here uses
`24` (or `12`) words to generate series of deterministic _Stellar_ key pairs.
`24` word mnemonics are also used by many hardware wallets
(such as _Ledger Nano S_). This library can also be used to restore account
based on the mnemonic that was generated earlier by either the hardware wallet
or any other wallets compatible with [BIP-0032][bip32], [BIP-0039][bip39],
[BIP-0043][bip43], [BIP-0044][bip44], [SLIP-0010][slip10], [SLIP-0044][slip44]
and [SEP-0005][sep05] specifications.

<br />




## multi-account hierarchy for deterministic wallets

_redshift library_ uses [BIP-0032][bip32] path with a hardened derivation.
One can choose to derive key pair for default account (with `account` number
equal to `0`) or select other `account` number in `m / 44' / 148' / account'`
hierarchy. The upper limit of `account` number of child accounts is `2**31`
(`2'147'483'648`).

<br />




## key derivation methods for stellar accounts

_Stellar Ecosystem Proposal_ describes implementation of deterministic key
derivation for _Stellar_ accounts based on word mnemonic of different lengths.
_redshift library_ uses `24` (or `12`) word mnemonics.

<br />




## documentation

> [API Reference](https://stellar-fox.github.io/redshift/jsdoc/)

<br />




## experimenting in browser

> [RunKit with @stellar-fox/redshift](https://npm.runkit.com/@stellar-fox/redshift)


* recovering _stellar_ keypair based on known `mnemonic`,
    `passphrase` and an `account` number:

    https://runkit.com/xcmats/redshift.restore/


* generating a new _stellar_ address:

    https://runkit.com/xcmats/redshift.new/

<br />




## experimenting locally

```bash
$ git clone git@github.com:stellar-fox/redshift.git
Cloning into 'redshift'...
$ cd redshift/library/
$ npm i
$ npm start
Compiling for 'production' ...
Hash: f3832f6c64d8af6ce6d0
Version: webpack 4.23.1
Time: 1861ms
Built at: 2018-10-27 23:38:41
      Asset      Size  Chunks             Chunk Names
redshift.js  12.7 KiB       0  [emitted]  redshift
Entrypoint redshift = redshift.js
[0] external "bip39" 42 bytes {0} [built]
[2] external "@xcmats/js-toolbox" 42 bytes {0} [built]
[3] external "stellar-base" 42 bytes {0} [built]
[4] ./package.json 3.61 KiB {0} [built]
[5] ./src/index.js 3.03 KiB {0} [built]
    + 1 hidden module
```

```javascript
redshift
```

> ```javascript
> { ENTROPY: { HIGH: 256, MEDIUM: 128 },
>   LANGUAGE:
>    { CN: 'chinese_simplified',
>      CT: 'chinese_traditional',
>      EN: 'english',
>      FR: 'french',
>      IT: 'italian',
>      JP: 'japanese',
>      KR: 'korean',
>      SP: 'spanish' },
>   genMnemonic: [Function: genMnemonic],
>   validateMnemonic: [Function: validateMnemonic],
>   mnemonicToSeedHex: [Function: mnemonicToSeedHex],
>   genKeypair: [Function: genKeypair],
>   newAddress: [Function: newAddress],
>   restoreAddress: [Function: restoreAddress],
>   version: [Getter] }
> ```

<br />




## examples

* Randomly generate `mnemonic` of a high entropy using english words.

    ```javascript
    redshift.genMnemonic().split(' ')
    ```

    > ```javascript
    > [ 'eye',
    > 'urge',
    > 'child',
    > 'before',
    > 'sudden',
    > 'this',
    > 'assault',
    > 'else',
    > 'brisk',
    > 'twelve',
    > 'hair',
    > 'topic',
    > 'divert',
    > 'raw',
    > 'onion',
    > 'cattle',
    > 'result',
    > 'birth',
    > 'catalog',
    > 'dice',
    > 'auction',
    > 'sibling',
    > 'goat',
    > 'initial' ]
    > ```


* Randomly generate `mnemonic` of a medium entropy in italian.

    ```javascript
    redshift.genMnemonic(redshift.LANGUAGE.IT, redshift.ENTROPY.MEDIUM)
    ```

    > ```javascript
    > 'desumere sogno cuculo stirpe sepolto salmone elfico giocare ...'
    > ```


* Generate hex `seed` from a given `mnemonic`.

    ```javascript
    mnemonic = redshift.genMnemonic()
    ```

    > ```javascript
    > 'hold awful slender tide arrange window burden erase bamboo ...'
    > ```

    ```javascript
    seed = redshift.mnemonicToSeedHex(mnemonic)
    ```

    > ```javascript
    > '016d98a5956955896613c59e277...8ca1e6d94f792316b8f5afa0d8f2dc6'
    > ```


* Generate hex `seed` from a given `mnemonic` and a secret `passphrase`.

    ```javascript
    mnemonic = redshift.genMnemonic()
    ```

    > ```javascript
    > 'ride throw body pet abstract gossip few online acoustic ...'
    > ```

    ```javascript
    seed = redshift.mnemonicToSeedHex(mnemonic, 'my secret phrase')
    ```

    > ```javascript
    > '2b8b5c2a3bac1f54a5c716621e3...4d68f7e14402ac9ff76f1fcf92096e'
    > ```


* Generate _stellar_ `keypair` object from a given `seed`.

    ```javascript
    kp = redshift.genKeypair(seed)
    ```

    > ```javascript
    > Keypair {
    > type: 'ed25519',
    > _secretSeed: <Buffer ... >,
    > _secretKey: <Buffer ... >,
    > _publicKey: <Buffer ... > }
    > ```

    ```javascript
    kp.<press-TAB-key>
    ```

    > ```javascript
    > kp.canSign  kp.publicKey     kp.rawPublicKey   kp.rawSecretKey
    > kp.secret   kp.sign          kp.signDecorated  kp.signatureHint
    > kp.verify   kp.xdrAccountId  kp.xdrPublicKey
    > ```

    ```javascript
    kp.publicKey()
    ```

    > ```javascript
    > 'GALJAMOTJC2OU6GRCGLOANONTMAVHI3ZD6PTTR7ED5NPSJV3D2VC37RL'
    > ```

    ```javascript
    kp.secret()
    ```

    > ```javascript
    > 'SCK2PGA6Q6YG6I77QLCW5ZENEWDDX4KHEBMT2AIV7FLAWCAGFCG2FZIT'
    > ```


* Generate _stellar_ `keypair` object from a given `seed`
    and an `account` number.

    ```javascript
    kp = redshift.genKeypair(seed, 27)
    ...
    kp.publicKey()
    ```

    > ```javascript
    > 'GBDKU27YWDIRYDFAZF5J2JNPI2CPICSML4VBREP3SC45MKV433NHRNCR'
    > ```

    ```javascript
    kp.secret()
    ```

    > ```javascript
    > 'SBNWL6JJ3Q5CS6U4JUVUTOWIU24NDCWEI5P7BINENF4K3PHRST3QDOZH'
    > ```


* Generate object with a new `mnemonic` of high entropy, resulting
    `seed` and _stellar_ `keypair`. Optionally, `passphrase`
    and `account` number can be passed as an arguments.

    ```javascript
    redshift.newAddress('strawberryFieldsF0R3V3R', 27)
    ```

    > ```javascript
    > { mnemonic: 'spell crawl shiver swallow ecology mercy ...',
    >   passphrase: 'strawberryFieldsF0R3V3R',
    >   account: 27,
    >   seed: 'd3dbb69cf5a538ef8594fafd3...70a10a806b9a44be5157917',
    >   keypair:
    >    Keypair {
    >      type: 'ed25519',
    >      _secretSeed: <Buffer ... >,
    >      _publicKey: <Buffer ... > } }
    > ```


* Restore address from a given `mnemonic`, `passphrase`
    and an `account` number.

    ```javascript
    redshift.restoreAddress(
        'innocent yellow push captain end focus solution ...',
        's3cRET',
        3
    )
    ```

    > ```javascript
    > { mnemonic: 'innocent yellow push captain end focus ...',
    >   passphrase: 's3cRET',
    >   account: 3,
    >   seed: 'ac16748b113fb3ca85fb5cac...5290d80bec70cd4fda0878',
    >   keypair:
    >    Keypair {
    >      type: 'ed25519',
    >      _secretSeed: <Buffer ... >,
    >      _secretKey: <Buffer ... >,
    >      _publicKey: <Buffer ... > } }
    > ```

<br />




## tests

> Tested with [SEP-0005][sep05] Vectors 3 and 4 ([source][ts])

```bash
$ npm run test:full

  Test Vector 3 (SEP-0005)
    Test Vector 3 Mnemonic Validation
      ✓ should be valid
    BIP39 Seed
      ✓ should return: 937ae91...f567866
    Public Key (m/44'/148'/0')
      ✓ should return: GC3MM...BTPJQ (58ms)
    Public Key (m/44'/148'/1')
      ✓ should return: GB3MT...YYISO
    Public Key (m/44'/148'/2')
      ✓ should return: GDYF7...DGAKU
   ...
      ✓ should return: SBSHU...2ZEO2
    Secret Key (m/44'/148'/7')
      ✓ should return: SC2QO...YWC6E
    Secret Key (m/44'/148'/8')
      ✓ should return: SCGMC...MAQST
    Secret Key (m/44'/148'/9')
      ✓ should return: SCPA5...C37GF

  Test Vector 4 (SEP-0005)
    Test Vector 4 Mnemonic Validation
      ✓ should be valid
    BIP39 Seed
      ✓ should return: d425d39...742a489
    Public Key (m/44'/148'/0')
      ✓ should return: GDAHP...B63EQ
    Public Key (m/44'/148'/1')
      ✓ should return: GDY47...4OJOC
    ...
    Secret Key (m/44'/148'/9')
      ✓ should return: SDXDY...UXNOS


  44 passing (517ms)
```

<br />




## support

```
GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR
```

<br />




## license

**redshift** is released under the Apache License, Version 2.0. See the
[LICENSE](https://github.com/stellar-fox/redshift/blob/master/LICENSE)
for more details.




[bip32]: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
[bip39]: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
[bip43]: https://github.com/bitcoin/bips/blob/master/bip-0043.mediawiki
[bip44]: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
[slip10]: https://github.com/satoshilabs/slips/blob/master/slip-0010.md
[slip44]: https://github.com/satoshilabs/slips/blob/master/slip-0044.md
[sep05]: https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md
[ts]: https://github.com/stellar-fox/redshift/blob/master/library/test/test.js
