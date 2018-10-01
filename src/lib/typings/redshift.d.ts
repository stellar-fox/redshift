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
    export declare const ENTROPY: object;




    /**
     * Languages.
     */
    export declare const LANGUAGE: object;




    /**
     * Generate mnemonic.
     */
    export declare function genMnemonic (
        language?: string,
        entropy?: number
    ): string;




    /**
     * Generate hex seed from a given mnemonic.
     */
    export declare function hexSeed (
        mnemonic: string,
        passphrase?: string
    ): string;




    /**
     * Generate stellar keypair object from a given seed and pathIndex.
     */
    export declare function keypair (
        seed: string,
        pathIndex?: number
    ): object;




    /**
     * Randomly generate object with mnemonic, seed,
     * keypair, publicKey and secret.
     */
    export declare function random (
        language?: string,
        passphrase?: string,
        pathIndex?: number
    ): object;




}
