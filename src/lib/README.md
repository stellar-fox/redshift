# redshift

Stellar HD Accounts Generator - library.

[![npm version](https://img.shields.io/npm/v/@stellar-fox/redshift.svg)](https://www.npmjs.com/package/@stellar-fox/redshift)
[![npm license](https://img.shields.io/npm/l/@stellar-fox/redshift.svg)](https://www.npmjs.com/package/@stellar-fox/redshift)
[![GitHub top language](https://img.shields.io/github/languages/top/stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift)
[![GitHub code size](https://img.shields.io/github/languages/code-size/stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift)
[![GitHub tag](https://img.shields.io/github/tag/stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift)

```bash
$ npm install @stellar-fox/redshift
```

<br />




## [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) hierarchical deterministic addresses

`BIP39` mnemonics can be used to generate deterministic series of account
addresses. The method implemented here uses `24` (or `12`) words to generate
series of deterministic _Stellar_ key pairs. `24` word mnemonics are also used
by many hardware wallets (such as _Ledger Nano S_). This library can also be
used to restore account based on the mnemonic that was generated earlier
by either the hardware wallet or any other wallets compatible with `BIP32`,
`BIP39` and `BIP44` specifications.

<br />




## [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) multi-account hierarchy for deterministic wallets

_redshift library_ uses `BIP32` path with hardened derivation. One can choose
to derive key pair for default account (with `pathIndex` address equal to `0`)
or select `pathIndex` number of desired account hierarchy. The upper limit of
`pathIndex` number of child accounts is `2**31`.

<br />




## [SEP-0005](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md) key derivation methods for stellar accounts

_Stellar Ecosystem Proposal_ describes implementation of deterministic key
derivation for _Stellar_ accounts based on word mnemonic of different lengths.
_redshift library_ uses `24` (or `12`) word mnemonics.

<br />




> Tested with `SEP-0005` Vectors 3 and 4

<br />




## experimenting in browser

> [RunKit with @stellar-fox/redshift](https://npm.runkit.com/@stellar-fox/redshift)

<br />




## experimenting in [node.js](https://nodejs.org/)

```bash
$ git clone git@github.com:stellar-fox/redshift.git
Cloning into 'redshift'...
$ cd redshift/src/lib/
$ npm i
$ npm start
🎉  Successfully compiled 1 file with Babel.
```

```javascript
> redshift
{ ENTROPY: { high: 256, medium: 128 },
  LANGUAGE:
   { CN: 'chinese_simplified',
     CT: 'chinese_traditional',
     EN: 'english',
     FR: 'french',
     IT: 'italian',
     JP: 'japanese',
     KR: 'korean',
     SP: 'spanish' },
  genMnemonic: [Function: genMnemonic],
  hexSeed: [Function: hexSeed],
  keypair: [Function: keypair],
  random: [Function: random] }
```

<br />




## examples

* Randomly generate `mnemonic` of a high entropy in english.

    ```javascript
    > redshift.genMnemonic().split(' ')
    [ 'eye',
    'urge',
    'child',
    'before',
    'sudden',
    'this',
    'assault',
    'else',
    'brisk',
    'twelve',
    'hair',
    'topic',
    'divert',
    'raw',
    'onion',
    'cattle',
    'result',
    'birth',
    'catalog',
    'dice',
    'auction',
    'sibling',
    'goat',
    'initial' ]
    ```


* Randomly generate `mnemonic` of a medium entropy in italian.

    ```javascript
    > redshift.genMnemonic(redshift.LANGUAGE.IT, redshift.ENTROPY.medium)
    'desumere sogno cuculo stirpe sepolto salmone elfico giocare ...'
    ```


* Generate hex `seed` from a given `mnemonic`.

    ```javascript
    > mnemonic = redshift.genMnemonic()
    'hold awful slender tide arrange window burden erase bamboo ...'

    > seed = redshift.hexSeed(mnemonic)
    '016d98a5956955896613c59e277cf...318ca1e6d94f792316b8f5afa0d8f2dc6'
    ```


* Generate hex `seed` from a given `mnemonic` and secret passphrase.

    ```javascript
    > mnemonic = redshift.genMnemonic()
    'ride throw body pet abstract gossip few online acoustic scare ...'

    > seed = redshift.hexSeed(mnemonic, 'my secret phrase')
    '2b8b5c2a3bac1f54a5c716621e3c487...f54d68f7e14402ac9ff76f1fcf92096e'
    ```


* Generate stellar keypair object from a given `seed`.

    ```javascript
    > kp = redshift.keypair(seed)
    Keypair {
    type: 'ed25519',
    _secretSeed: <Buffer 95 a7 98 ... >,
    _secretKey: <Buffer 95 a7 98 ... >,
    _publicKey: <Buffer 16 90 31 ... > }

    > kp.
    kp.canSign  kp.publicKey     kp.rawPublicKey   kp.rawSecretKey
    kp.secret   kp.sign          kp.signDecorated  kp.signatureHint
    kp.verify   kp.xdrAccountId  kp.xdrPublicKey

    > kp.publicKey()
    'GALJAMOTJC2OU6GRCGLOANONTMAVHI3ZD6PTTR7ED5NPSJV3D2VC37RL'

    > kp.secret()
    'SCK2PGA6Q6YG6I77QLCW5ZENEWDDX4KHEBMT2AIV7FLAWCAGFCG2FZIT'
    ```


* Generate stellar keypair object from a given `seed` and `pathIndex`.

    ```javascript
    > kp = redshift.keypair(seed, 27)
    ...

    > kp.publicKey()
    'GBDKU27YWDIRYDFAZF5J2JNPI2CPICSML4VBREP3SC45MKV433NHRNCR'

    > kp.secret()
    'SBNWL6JJ3Q5CS6U4JUVUTOWIU24NDCWEI5P7BINENF4K3PHRST3QDOZH'
    ```

<br />




## support

    GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR
