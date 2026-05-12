# @stellar-fox/redshift

**Secure, high-performance Stellar HD account generation library.**

[![npm version](https://img.shields.io/npm/v/@stellar-fox/redshift.svg)](https://www.npmjs.com/package/@stellar-fox/redshift)
[![Node.js Version](https://img.shields.io/node/v/@stellar-fox/redshift.svg)](https://nodejs.org)
[![CI/CD](https://github.com/stellar-fox/redshift/actions/workflows/ci.yml/badge.svg)](https://github.com/stellar-fox/redshift/actions/workflows/ci.yml)
[![Downloads](https://img.shields.io/npm/dm/@stellar-fox/redshift.svg)](https://www.npmjs.com/package/@stellar-fox/redshift)
[![License](https://img.shields.io/npm/l/@stellar-fox/redshift.svg)](https://github.com/stellar-fox/redshift/blob/master/LICENSE)

Redshift is a lightweight, security-focused library for generating Stellar mnemonics and deriving account keys. It is built to be used in both browser and Node.js environments, with a focus on auditability and modern cryptographic standards.

## Features

- **Standard Compliant**: Implements BIP39, BIP32, BIP44, and SEP-0005.
- **Hardened Security**: Uses `@noble/hashes` for high-performance, audited cryptographic operations.
- **TypeScript Native**: Full type safety out of the box.
- **Zero-Config Build**: Ships with ESM and CJS support via `tsup`.
- **Lightweight**: Minimal dependencies, focused purely on account generation.

## Installation

```bash
npm install @stellar-fox/redshift
```

## Quick Start

```typescript
import { genMnemonic, mnemonicToSeedHex, genKeypair } from '@stellar-fox/redshift';

const mnemonic = genMnemonic(); // Generate 24 words
const seed = mnemonicToSeedHex(mnemonic); // Get seed
const keypair = genKeypair(seed, 0); // Derive Account 0

console.log(`Address: ${keypair.publicKey()}`);
```

## Usage

### Generate a New Mnemonic

```typescript
import { genMnemonic, LANGUAGE } from "@stellar-fox/redshift";

// Generate a 24-word English mnemonic (256 bits, default)
const mnemonic = genMnemonic();

// Generate a 12-word Spanish mnemonic (128 bits)
const mnemonic12 = genMnemonic(LANGUAGE.SP, 128);
```

### Derive Stellar Keys

```typescript
import { genKeypair, mnemonicToSeedHex } from "@stellar-fox/redshift";

const mnemonic = "..."; // your 24 words
const seed = mnemonicToSeedHex(mnemonic, "optional-passphrase");

// Derive the primary account (m/44'/148'/0')
const keypair = genKeypair(seed, 0);

console.log(keypair.publicKey()); // G...
console.log(keypair.secret()); // S...
```

### Full Address Restoration

```typescript
import { restoreAddress } from "@stellar-fox/redshift";

const { keypair } = restoreAddress(mnemonic, "passphrase", 0);
```

## Security & Auditability

Security is the primary directive of Redshift. The library is designed to be small, readable, and easily auditable.

- **Audited Primitives**: Instead of custom crypto, we rely on the [@noble](https://github.com/paulmillr/noble-hashes) suite, which has undergone professional security audits and is resistant to side-channel attacks.
- **Deterministic & Air-Gapped**: The library has zero network dependencies. It is designed to be run on air-gapped machines for maximum safety.
- **Standard Compliance**:
    - **BIP39**: Mnemonic generation and seed derivation.
    - **BIP32/BIP44**: Hierarchical Deterministic wallet structure.
    - **SLIP-0010**: Ed25519 master key derivation (Stellar standard).
    - **SEP-0005**: Full compatibility with the Stellar ecosystem.

## License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

---

Created with ❤️ by the Stellar Fox team.
