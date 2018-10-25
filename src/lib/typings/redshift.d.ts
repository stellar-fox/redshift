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
     * Generate mnemonic.
     */
    export function genMnemonic (
        language?: string,
        entropy?: number
    ): string;




    /**
     * Generate hex seed from a given mnemonic.
     */
    export function hexSeed (
        mnemonic: string,
        passphrase?: string
    ): string;




    /**
     * Generate stellar keypair object from a given seed and pathIndex.
     */
    export function keypair (
        seed: string,
        pathIndex?: number
    ): object;




    /**
     * Randomly generate object with mnemonic, seed,
     * keypair, publicKey and secret.
     */
    export function random (
        language?: string,
        passphrase?: string,
        pathIndex?: number
    ): object;




}
