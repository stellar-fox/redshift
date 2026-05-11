# 🌌 Redshift

[![CI/CD](https://github.com/stellar-fox/redshift/actions/workflows/ci.yml/badge.svg)](https://github.com/stellar-fox/redshift/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646cff.svg)](https://vitejs.dev/)

**Redshift** is a secure, professional-grade Hierarchical Deterministic (HD) account generator for the Stellar network. Built with privacy and security as top priorities, it allows users to generate mnemonics and derive account keys completely offline.

---

> [!CAUTION]
>
> ### SECURITY WARNING
>
> **The domain `stellarfox.net` is no longer affiliated with this project or its original creators.**
> It has been hijacked and is currently being used as a phishing site. The "key generator" hosted there is NOT the legitimate Redshift application.
>
> **NEVER generate keys on that website.** It is suspected of using pre-determined or compromised entropy to steal private keys.
>
> The ONLY legitimate and safe way to use Redshift is via this GitHub repository or its official GitHub Pages deployment:
> **[https://stellar-fox.github.io/redshift/](https://stellar-fox.github.io/redshift/)**

---

## Features

- **Full Offline Support**: Designed to be run on air-gapped machines for maximum security.
- **Modern PWA Architecture**: Installable as a native-like application on mobile and desktop.
- **Standard Compliant**: Implements BIP39, BIP32, BIP44, and SEP-0005 specifications.
- **Multilingual**: Supports mnemonic generation in English, Japanese, French, Spanish, and more.
- **Type Safe**: Fully modernized codebase using TypeScript for enhanced reliability.

## Getting Started

### Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/stellar-fox/redshift.git
   cd redshift
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm run dev -w @stellar-fox/redshift-app
   ```

### Production Build

To generate a production-ready build:

```bash
npm run build -w @stellar-fox/redshift-app
```

## Security Recommendations

For maximum security when generating high-value keys:

1. Download the latest release as a ZIP file.
2. Transfer it to an **air-gapped** (never connected to the internet) computer.
3. Open `index.html` in a modern browser.
4. Generate your mnemonic and write it down on paper.

## Support & Donation

If you find this software useful and would like to support the original creators:

```
GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR
```

## License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

---

_Created with ❤️ by the original Stellar Fox team._
