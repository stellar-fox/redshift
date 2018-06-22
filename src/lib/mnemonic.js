import bip39 from "bip39"

export const ENTROPY = {
    high: 256,
    medium: 128,
}

export const LANGUAGE = {
    EN: "english",
    JP: "japanese",
}

export const genPhrase = (entropy=ENTROPY.high, language=LANGUAGE.EN) =>
    bip39.generateMnemonic(entropy, undefined, bip39.wordlists[language])