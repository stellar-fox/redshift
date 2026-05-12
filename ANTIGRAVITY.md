# Antigravity Project Directives: Redshift

This file serves as the "Source of Truth" for development standards, design systems, and security protocols for the Redshift project.

Stay away from unnecessary emojis. Use them only when it is natural and necessary. Which should be almost never in this case.

## 🌌 Core Philosophy

Redshift is a high-security, professional-grade Stellar account generator. Every UI decision must prioritize clarity, security, and responsiveness.

## 🎨 Design System

### Colors & Aesthetics

- **Primary Accent**: Gold/Yellow (`rgb(244, 176, 4)`).
- **Background**: Deep Space Blue (`rgb(15, 46, 83)`).
- **Error/Alert**: Muted Red (`rgb(208, 47, 69)`).
- **Transparency**: Use consistent `rgba` overlays (0.1 to 0.25) for panels and banners to create a "glass" effect.

### Tone & Documentation
- **Professionalism**: Maintain a clean, academic tone for all technical documentation (READMEs, JSdocs). 
- **No Emojis**: Avoid using emojis in technical documentation or headers to maintain a professional, high-security aesthetic.

### Layout (The "Deck" System)

- **Container**: All pages must use `.page-container` (max-width 1000px).
- **Width**: All interactive panels must stretch to `97vw` on mobile and `max-width: 960px` on desktop for a unified vertical alignment.
- **Margins**: Use the global `page-container` responsive padding to ensure identical left/right alignment across all pages (Home, About, Community).

## 🧩 Component Standards

### Panels (`Panel` component)

- Use for all data display (Mnemonic, Keys) and complex inputs.
- Promoting field labels to the `Panel` header is preferred over internal `Input` labels.

### Inputs (`Input` component)

- Supports both `input` and `textarea`.
- **Textarea**: Use for phrases or long strings to allow easy pasting.
- **Feedback**: Use the `subLabel` area for helpful instructions.

### Buttons (`Button` component)

- Supports `disabled` state for pre-flight validation (e.g., waiting for 24 words).

## 🔒 Security Protocols

- **Memory Scrubbing**: Sensitive inputs (like mnemonics in the Restore flow) must be wiped from the state immediately after use or on screen unload.
- **Verification**: Always perform checksum validation on mnemonics before allowing account restoration.
- **Verbatim Warnings**: Security warnings regarding asset theft and "secret phrases" must be prominently displayed on the Home page.
- **Domain Scrubbing**: No references to legacy or hijacked domains (`stellarfox.net`) should exist in the app code.

## 🛠 Tech Stack

- **Framework**: React (Class components in legacy areas, Functional for new components).
- **Language**: TypeScript (Strict mode).
- **Build**: Vite + PWA Plugin.
- **Versioning**: Automated via CI (targets semantic versioning).
