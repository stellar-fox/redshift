import React from "react"
import "./index.css"

// <About> component
export default () =>
    <div className="page-container">
        <header className="page-header">
            <h1 className="page-title">About Redshift</h1>
            <p className="subtitle-large">Secure Stellar HD Account Generator</p>
        </header>

        <section className="warning-banner">
            <strong>Security First:</strong> Redshift is designed to be used offline. For high-value accounts, we recommend downloading the source and running it on an air-gapped machine.
        </section>

        <div className="about-grid">
            {/* Core Logic Card */}
            <article className="about-card">
                <h2>How it works</h2>
                <p>
                    Redshift generates 24-word mnemonics (256 bits of entropy) following the BIP39 standard.
                    These mnemonics derive a master seed used to generate deterministic Stellar accounts.
                </p>
                <ul>
                    <li><strong>Generate:</strong> Auto-generates a new high-entropy phrase.</li>
                    <li><strong>Restore:</strong> Recover accounts from existing mnemonics.</li>
                </ul>
            </article>

            {/* Standards Card */}
            <article className="about-card">
                <h2>Standards</h2>
                <p>Redshift strictly adheres to industry-standard protocols:</p>
                <ul>
                    <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki">BIP39</a>: Mnemonic generation.</li>
                    <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">BIP44</a>: Multi-account hierarchy.</li>
                    <li><a href="https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md">SEP-0005</a>: Stellar key derivation.</li>
                </ul>
                <p style={{fontSize: '0.9rem', marginTop: '1rem'}}>
                    Check out Ian Coleman's <a href="https://iancoleman.io/bip39/">Mnemonic Code Converter</a> for an excellent reference implementation.
                </p>
            </article>

            {/* Privacy Card */}
            <article className="about-card">
                <h2>Privacy & Safety</h2>
                <p>
                    Once loaded, Redshift makes <strong>zero network requests</strong>. 
                    All cryptographic operations happen locally in your browser.
                </p>
                <p>
                    We recommend reading Bruce Schneier's guide on <a href="https://www.schneier.com/blog/archives/2013/10/air_gaps.html">Air Gaps</a> for maximum protection.
                </p>
            </article>
        </div>

        <footer className="about-footer">
            <p>
                <strong>Verification:</strong> The core logic is verified against SEP-0005 Test Vectors 3 and 4.&nbsp;
                <a href="https://github.com/stellar-fox/redshift/blob/master/library/test/redshift.test.ts">View Test Suite</a>
            </p>
            <p>
                Redshift uses the <a href="https://www.npmjs.com/package/@stellar-fox/redshift">@stellar-fox/redshift</a> library.
                <br />
                Licensed under Apache License 2.0.
            </p>
        </footer>
    </div>


