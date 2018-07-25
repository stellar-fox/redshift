# redshift

Stellar HD Accounts Generator - library.

[![GitHub top language](https://img.shields.io/github/languages/top/stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift)
[![GitHub code size](https://img.shields.io/github/languages/code-size/stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift)

```bash
$ npm install @stellar-fox/redshift
```

<br />




## experimenting in browser

...

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
    'desumere sogno cuculo stirpe sepolto salmone elfico giocare rodaggio ...'
    ```


* Generate hex `seed` from a given `mnemonic`.

    ```javascript
    > mnemonic = redshift.genMnemonic()
    'hold awful slender tide arrange window burden erase bamboo woman ...'

    > seed = redshift.hexSeed(mnemonic)
    '016d98a5956955896613c59e277cf...baf80a5318ca1e6d94f792316b8f5afa0d8f2dc6'
    ```


* Generate hex `seed` from a given `mnemonic` and secret passphrase.

    ```javascript
    > mnemonic = redshift.genMnemonic()
    'ride throw body pet abstract gossip few online acoustic scare limit ...'

    > seed = redshift.hexSeed(mnemonic, 'my secret phrase')
    '2b8b5c2a3bac1f54a5c716621e3c487...4dc085f54d68f7e14402ac9ff76f1fcf92096e'
    ```


* Generate stellar keypair object from a given `seed`.

    ```javascript
    > kp = redshift.keypair(seed)
    Keypair {
    type: 'ed25519',
    _secretSeed: <Buffer 95 a7 98 1e 87 b0 6f 23 ff 82 c5 6e e4 8d 25 ... >,
    _secretKey: <Buffer 95 a7 98 1e 87 b0 6f 23 ff 82 c5 6e e4 8d 25 86 ... >,
    _publicKey: <Buffer 16 90 31 d3 48 b4 ea 78 d1 11 96 e0 35 cd 9b 01 ... > }

    > kp.
    kp.canSign    kp.publicKey       kp.rawPublicKey     kp.rawSecretKey
    kp.secret     kp.sign            kp.signDecorated    kp.signatureHint
    kp.verify     kp.xdrAccountId    kp.xdrPublicKey

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
