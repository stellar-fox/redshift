/**
 * Redshift.
 * Stellar HD Address Generator.
 *
 * @module @stellar-fox/redshift
 * @license Apache-2.0
 */




declare module "@stellar-fox/redshift" {




    /**
     * Entropy preset.
     */
    export interface Entropy {
        HIGH: number;
        MEDIUM: number;
    }
    export const ENTROPY: Entropy;




    /**
     * Languages.
     */
    export interface Language {
        CN: string;
        CT: string;
        EN: string;
        FR: string;
        IT: string;
        JP: string;
        KR: string;
        SP: string;
    };
    export const LANGUAGE: Language;




    /**
     * Generate mnemonic. BIP39 implementation.
     */
    export function genMnemonic (
        language?: string,
        entropy?: number
    ): string;




    /**
     * Generate hex seed from a given `mnemonic` and `passphrase`.
     * BIP39 implementation.
     */
    export function mnemonicToSeedHex (
        mnemonic: string,
        passphrase?: string
    ): string;




    /**
     * Generate `stellar` Keypair object from a given `seed` and a `pathIndex`.
     */
    export function genKeypair (
        seed: string,
        pathIndex?: number
    ): object;




    /**
     * redshift.newAccount() return value description.
     */
    export interface AccountDescription {
        mnemonic: string;
        passphrase: string;
        pathIndex: number;
        seed: string;
        keypair: object;
    };




    /**
     * Randomly generate object with `mnemonic`,
     * `passphrase`, `pathIndex`, `seed` and `keypair`.
     */
    export function newAccount (
        pathIndex?: number,
        language?: string,
        passphrase?: string
    ): AccountDescription;




}
