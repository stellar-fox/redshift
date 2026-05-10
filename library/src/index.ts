/**
 * Redshift.
 * Stellar HD Address Generator.
 *
 * @module @stellar-fox/redshift
 * @license Apache-2.0
 */

import {
    generateMnemonic,
    mnemonicToSeedSync,
    validateMnemonic as bip39validateMnemonic,
    wordlists,
} from "bip39"
import { Keypair as StellarKeypair } from "@stellar/stellar-sdk"
import { hmac } from "@noble/hashes/hmac"
import { sha512 } from "@noble/hashes/sha512"

// Helper to convert hex to bytes
const hexToBytes = (hex: string): Uint8Array => {
    if (hex.length % 2 !== 0) throw new Error("Invalid hex string");
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) {
        out[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    }
    return out;
};

/**
 * Entropy presets.
 */
export const ENTROPY = {
    HIGH: 256,
    MEDIUM: 128,
} as const

/**
 * Languages.
 */
export const LANGUAGE = {
    CN: "chinese_simplified",
    CT: "chinese_traditional",
    EN: "english",
    FR: "french",
    IT: "italian",
    JP: "japanese",
    KR: "korean",
    SP: "spanish",
} as const

export type Language = typeof LANGUAGE[keyof typeof LANGUAGE]

/**
 * Generate mnemonic. BIP39 implementation.
 */
export const genMnemonic = (
    language: Language | string = LANGUAGE.EN,
    entropy: number = ENTROPY.HIGH
): string => {
    // @ts-ignore - wordlists index signature
    const wordlist = wordlists[language];
    return generateMnemonic(entropy, undefined, wordlist);
}

/**
 * Check mnemonic validity. BIP39 implementation.
 */
export const validateMnemonic = (
    mnemonic: string, 
    language: Language | string = LANGUAGE.EN
): boolean => {
    // @ts-ignore
    const wordlist = wordlists[language];
    return bip39validateMnemonic(mnemonic, wordlist);
}

/**
 * Generate hex seed from a given `mnemonic` and `passphrase`.
 * BIP39 implementation.
 */
export const mnemonicToSeedHex = (mnemonic: string, passphrase?: string): string => {
    return mnemonicToSeedSync(mnemonic, passphrase).toString("hex");
}

/**
 * Generate `stellar` Keypair object
 * from a given `seed` and an `account` number.
 *
 * ` m / purpose' / coin_type' / account' ` (names defined in BIP-0044)
 *
 * ` m /      44' /       148' / account' ` (3 levels of BIP-0032 path)
 */
export const genKeypair = (
    hexSeed: string,
    account: number = 0,
    opts?: { Keypair?: typeof StellarKeypair }
): StellarKeypair => {
    if (typeof hexSeed !== "string" || typeof account !== "number") {
        throw new TypeError(
            "redshift.genKeypair() expected [string] and [number], " +
            `got [${typeof hexSeed}] and [${typeof account}]`
        );
    }

    const Keypair = opts?.Keypair || StellarKeypair;

    // SLIP-0010 Ed25519 master key derivation
    const ED25519_SEED = new TextEncoder().encode("ed25519 seed");
    const seedBytes = hexToBytes(hexSeed);
    let parent = hmac(sha512, ED25519_SEED, seedBytes);

    // Derive: m/44'/148'/account'
    for (const idx of [44, 148, account]) {
        const hardenedIndex = 0x80000000 + idx;
        const data = new Uint8Array(1 + 32 + 4);
        data[0] = 0x00;
        data.set(parent.slice(0, 32), 1);
        const view = new DataView(data.buffer);
        view.setUint32(33, hardenedIndex, false); // false = Big Endian
        
        parent = hmac(sha512, parent.slice(32, 64), data);
    }

    const secretKey = Buffer.from(parent.slice(0, 32));
    return Keypair.fromRawEd25519Seed(secretKey);
}

export interface AddressDescription {
    mnemonic: string;
    passphrase: string;
    account: number;
    seed: string;
    keypair: StellarKeypair;
}

/**
 * Randomly generate object with `mnemonic`,
 * `passphrase`, `account` number, `seed` and `keypair`.
 */
export const newAddress = (
    passphrase: string = "",
    account: number = 0,
    language: Language | string = LANGUAGE.EN,
    opts?: { Keypair?: typeof StellarKeypair }
): AddressDescription => {
    if (typeof passphrase !== "string" || typeof account !== "number") {
        throw new TypeError("redshift.newAddress(): wrong argument types");
    }

    const mnemonic = genMnemonic(language);
    const seed = mnemonicToSeedHex(mnemonic, passphrase);
    const keypair = genKeypair(seed, account, opts);

    return { mnemonic, passphrase, account, seed, keypair };
}

/**
 * Restore address from a given `mnemonic`,
 * `passphrase` and `account` number.
 */
export const restoreAddress = (
    mnemonic: string,
    passphrase: string = "",
    account: number = 0,
    opts?: { Keypair?: typeof StellarKeypair }
): AddressDescription => {
    if (typeof mnemonic !== "string" || typeof passphrase !== "string" || typeof account !== "number") {
        throw new TypeError("redshift.restoreAddress(): wrong argument types");
    }

    const seed = mnemonicToSeedHex(mnemonic, passphrase);
    const keypair = genKeypair(seed, account, opts);

    return { mnemonic, passphrase, account, seed, keypair };
}

/**
 * Return array of all defined words for a given language.
 */
export const words = (language: Language | string = LANGUAGE.EN): string[] => {
    // @ts-ignore
    return wordlists[language];
}
