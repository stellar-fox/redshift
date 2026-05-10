import React from "react"
import "./index.css"

// <Community & Support> component
export default () =>
    <div className="page-container">
        <header className="page-header">
            <h1 className="page-title">Community & Support</h1>
            <p className="subtitle-large">Redshift is an open-source project maintained by the Stellar Fox community.</p>
        </header>

        <div className="contact-grid">
            <article className="contact-card">
                <h3>GitHub</h3>
                <p>Found a bug or have a feature request?</p>
                <a href="https://github.com/stellar-fox/redshift/issues" className="button-link">
                    Open an Issue
                </a>
            </article>

            <article className="contact-card">
                <h3>Open Source</h3>
                <p>Explore our other projects and contributions.</p>
                <a href="https://github.com/stellar-fox" className="button-link">
                    Follow us on GitHub
                </a>
            </article>
        </div>

        <section className="donation-section">
            <h3>Support the Project</h3>
            <p>If you find Redshift useful, consider supporting the original creators:</p>
            <div className="address-box">
                GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR
            </div>
            <p className="smaller">
                <a href="https://stellar.expert/explorer/public/account/GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR">
                    View on Stellar.expert
                </a>
            </p>
        </section>

        <footer className="community-footer">
            <p>
                <em>Redshift</em> is licensed under{" "}
                <a href="https://github.com/stellar-fox/redshift/blob/master/LICENSE">
                    Apache License Version 2
                </a>
            </p>
        </footer>
    </div>

