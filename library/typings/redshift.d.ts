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
    }
    export const LANGUAGE: Language;




    /**
     * Generate mnemonic. BIP39 implementation.
     */
    export function genMnemonic (
        language?: string,
        entropy?: Entropy
    ): string;




    /**
     * Check mnemonic validity. BIP39 implementation.
     */
    export function validateMnemonic (
        mnemonic: string,
        language?: Language
    ): boolean;




    /**
     * Generate hex seed from a given `mnemonic` and `passphrase`.
     * BIP39 implementation.
     */
    export function mnemonicToSeedHex (
        mnemonic: string,
        passphrase?: string
    ): string;




    /**
     * Generate `stellar` Keypair object
     * from a given `seed` and an `account` number.
     *
     * ` m / purpose' / coin_type' / account' ` (names defined in BIP-0044)
     *
     * ` m /      44' /       148' / account' ` (3 levels of BIP-0032 path)
     */
    export function genKeypair (
        seed: string,
        account?: number,
        opts?: object
    ): object;




    /**
     * redshift.newAddress() return value description.
     */
    export interface AddressDescription {
        mnemonic: string;
        passphrase: string;
        account: number;
        seed: string;
        keypair: object;
    }




    /**
     * Randomly generate object with `mnemonic`,
     * `passphrase`, `account` number, `seed` and `keypair`.
     */
    export function newAddress (
        passphrase?: string,
        account?: number,
        language?: Language,
        opts?: object
    ): AddressDescription;




    /**
     * Restore address from a given `mnemonic`,
     * `passphrase` and `account` number.
     */
    export function restoreAddress (
        mnemonic: string,
        passphrase: string,
        account: number,
        opts?: object
    ): AddressDescription;




    /**
     * Return array of all defined words for a given language.
     */
    export function words (language?: string): string[];




    /**
     * Library version.
     */
    export const version: string;

}
