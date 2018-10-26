import React, { Component } from "react"
import bip39 from "bip39"
import { string } from "@xcmats/js-toolbox"

import {
    genMnemonic,
    mnemonicToSeedHex,
    genKeypair,
    LANGUAGE,
} from "../../../../library/dist/redshift"

import Panel from "../Panel"
import Button from "../Button"
import Checkbox from "../Checkbox"
import Input from "../Input"
import RadioTag from "../RadioTag"

import "./index.css"




// <Welcome> component
export default class Welcome extends Component {

    // ...
    state = {
        mnemonic: undefined,
        bip39Seed: undefined,
        StellarBase: true,
        sjcl: true,
        pubKey: undefined,
        secretKey: undefined,
        useDefaultAccount: true,
        pathEditable: false,
        checked: true,
        derivationPath: "0",
        derivationPathIndex: 0,
        derivationPrefix: "44'/148'/",
        buttonVisible: true,
        restoring: false,
        restoredPhrase: [],
        wordValue: string.empty(),
        passphrase: string.empty(),
        language: LANGUAGE.EN,
        languageDescription: "English",
        mnemonicInvalid: false,
    }


    // ...
    setLanguage = (event) => {
        const target = event.target
        target.previousSibling.checked = true
        this.setState({
            language: target.previousSibling.value,
            languageDescription: target.textContent,
        })
    }


    // ...
    updateMnemonic = () => {
        this.setState({ buttonVisible: false })
        const
            mnemonic = genMnemonic(this.state.language),
            bip39Seed = mnemonicToSeedHex(mnemonic, this.state.passphrase)

        this.setState({ mnemonic, bip39Seed })

        if (this.state.sjcl && this.state.StellarBase) {
            const keypair = genKeypair(
                bip39Seed,
                this.state.derivationPathIndex
            )
            this.setState((_prevState) => ({
                pubKey: keypair.publicKey(),
            }))
            this.setState((_prevState) => ({
                secretKey: keypair.secret(),
            }))
        }
    }


    // ...
    enterMnemonic = () => {
        this.setState({ buttonVisible: false })
        this.setState((_prevState) => ({ restoring: 1 }))
    }


    // ...
    restoreMnemonic = (mnemonic) => {
        this.setState((_prevState) => ({ restoring: undefined }))

        const bip39Seed = mnemonicToSeedHex(mnemonic)

        this.setState({ mnemonic, bip39Seed })

        if (this.state.sjcl && this.state.StellarBase) {
            const keyPair = genKeypair(
                bip39Seed,
                this.state.derivationPathIndex
            )
            this.setState((_prevState) => ({
                pubKey: keyPair.publicKey(),
            }))
            this.setState((_prevState) => ({
                secretKey: keyPair.secret(),
            }))
        }
    }


    // ...
    advanceWord = (index, value) => {
        this.setState({ restoring: index + 1 })
        this.setState(
            {
                restoredPhrase: [...this.state.restoredPhrase, value],
            },
            () => {
                if (index === 24) {
                    let splitter = " "
                    if (this.state.language === LANGUAGE.JP) {
                        splitter = "\u3000"
                    }
                    let mnemonicStr = this.state.restoredPhrase.join(splitter)
                    if (!bip39.validateMnemonic(mnemonicStr)) {
                        this.setState({ mnemonicInvalid: true })
                    }
                    this.restoreMnemonic(mnemonicStr)
                }
            }
        )
        this.setState((_prevState) => ({ wordValue: string.empty() }))
    }


    // ...
    updateWord = (event) => {
        this.setState({
            wordValue: event.target.value,
        })
    }


    // ...
    updatePassphrase = (event) => {
        this.setState(
            {
                passphrase: event.target.value,
            },
            () => {
                const bip39Seed = bip39.mnemonicToSeedHex(
                    this.state.mnemonic,
                    this.state.passphrase
                )
                this.setState(
                    {
                        bip39Seed,
                    },
                    () => {
                        if (
                            this.state.sjcl &&
                            this.state.StellarBase &&
                            this.state.pubKey &&
                            !this.state.restoring
                        ) {
                            const keyPair = genKeypair(
                                bip39Seed,
                                this.state.derivationPathIndex
                            )
                            this.setState((_prevState) => ({
                                pubKey: keyPair.publicKey(),
                            }))
                            this.setState((_prevState) => ({
                                secretKey: keyPair.secret(),
                            }))
                        }
                    }
                )
            }
        )
    }


    // ...
    numberedList = (words, offset) => {
        if (!offset) {
            offset = 1
        }
        const listItems = words.map((_, index) => (
            <div key={index}>
                <span className="number">{index + offset + ". "}</span>
                <span>{_}</span>
            </div>
        ))
        return <div>{listItems}</div>
    }


    // ...
    reset = (_event) => {
        this.setState({
            mnemonic: undefined,
            bip39Seed: undefined,
            pubKey: undefined,
            secretKey: undefined,
            useDefaultAccount: true,
            pathEditable: false,
            checked: true,
            derivationPath: "0",
            derivationPathIndex: 0,
            derivationPrefix: "44'/148'/",
            buttonVisible: true,
            restoring: false,
            restoredPhrase: [],
            wordValue: string.empty(),
            passphrase: string.empty(),
            language: LANGUAGE.EN,
            languageDescription: "English",
            mnemonicInvalid: false,
        })
    }


    // ...
    handleLoadSjcl = () => {
        this.setState({
            sjcl: true,
        })
    }


    // ...
    handleLoadStellar = (_event) => {
        this.setState({
            StellarBase: true,
        })
    }


    // ...
    handleCheckboxClick = (event) => {
        const target = event.target
        this.setState({
            useDefaultAccount: target.checked,
        })
        this.setState((_prevState) => ({
            pathEditable: !target.checked,
        }))
        // reset derivation path index to 0
        if (target.checked) {
            this.setState((_prevState) => ({
                derivationPath: "0",
                derivationPathIndex: 0,
            }))
            if (this.state.pubKey) {
                let keyPair = genKeypair(this.state.bip39Seed, 0)
                this.setState((_prevState) => ({
                    pubKey: keyPair.publicKey(),
                }))
                this.setState((_prevState) => ({
                    secretKey: keyPair.secret(),
                }))
            }
        }
    }


    // ...
    handlePathChange = (event) => {
        const target = event.target
        if (isNaN(target.value)) {
            return false
        }
        const index = parseInt(target.value, 10)
        this.setState({
            derivationPath: target.value,
            derivationPathIndex: index,
        })
        if (this.state.pubKey) {
            if (!isNaN(index) && index >= 0) {
                let keyPair = genKeypair(this.state.bip39Seed, index)
                this.setState((_prevState) => ({
                    derivationPathIndex: index,
                }))
                this.setState((_prevState) => ({
                    pubKey: keyPair.publicKey(),
                }))
                this.setState((_prevState) => ({
                    secretKey: keyPair.secret(),
                }))
            }
        }
    }


    // ...
    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.advanceWord(this.state.restoring, this.state.wordValue)
        }
    }


    // ...
    renderMnemonic = () => {
        let splitter = " "
        if (this.state.language === LANGUAGE.JP) {
            splitter = "\u3000"
        }
        const mnemonic = this.state.mnemonic.split(splitter)
        return (
            <div className="columns">
                <div className="column">
                    {this.numberedList(mnemonic.slice(0, 12))}
                </div>
                <div className="column">
                    {this.numberedList(mnemonic.slice(12), 13)}
                </div>
            </div>
        )
    }


    // ...
    render = () => {
        let panel,
            pubKey,
            secretKey,
            derivationPath,
            button,
            stellarBase,
            restorePanels,
            useDefaultAccount,
            language,
            warning,
            reset
        if (!this.state.StellarBase) {
            stellarBase = (
                <div className="tiny">✗&nbsp;StellarBase did not load.</div>
            )
        }
        if (this.state.mnemonic) {
            panel = (
                <div className="p-t">
                    <Panel
                        title={
                            "Mnemonic [256 bits] - " +
                            this.state.languageDescription
                        }
                        content={this.renderMnemonic()}
                    />
                    <div className="p-b p-t">
                        <Input
                            label={"Passphrase (optional)"}
                            inputType="text"
                            maxLength="100"
                            autoComplete="off"
                            value={this.state.passphrase}
                            handleChange={this.updatePassphrase.bind(this)}
                            subLabel={"Enter mnemonic passphrase."}
                        />
                    </div>
                </div>
            )
        }
        if (this.state.buttonVisible) {
            button = (
                <div className="p-b p-t">
                    <Button
                        handleClick={this.updateMnemonic.bind(this)}
                        label="Generate"
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        handleClick={this.enterMnemonic.bind(this)}
                        label="Restore"
                    />
                </div>
            )
        }
        if (this.state.pubKey) {
            pubKey = (
                <div className="break-string">
                    <Panel
                        title={
                            "Public Key [" +
                            this.state.derivationPrefix +
                            this.state.derivationPath +
                            "']"
                        }
                        content={this.state.pubKey}
                    />
                </div>
            )
        }
        if (this.state.secretKey) {
            secretKey = (
                <div className="break-string">
                    <Panel
                        title={
                            "Secret Key [" +
                            this.state.derivationPrefix +
                            this.state.derivationPath +
                            "']"
                        }
                        content={this.state.secretKey}
                    />
                </div>
            )
            reset = (
                <div className="p-t p-b">
                    <Button handleClick={this.reset.bind(this)} label="Reset" />
                </div>
            )
        }
        if (this.state.pathEditable) {
            derivationPath = (
                <div className="p-b p-t">
                    <Input
                        label="Account Index"
                        inputType="text"
                        maxLength="100"
                        autoComplete="off"
                        value={this.state.derivationPath}
                        handleChange={this.handlePathChange.bind(this)}
                        subLabel={
                            "Account Derivation Path: [" +
                            this.state.derivationPrefix +
                            this.state.derivationPath +
                            "']"
                        }
                    />
                </div>
            )
        }
        if (this.state.restoring) {
            restorePanels = (
                <div className="flex-centered">
                    <p className="p-t subtitle-large">
                        Restoring {this.state.languageDescription} mnemonic.
                    </p>
                    <p className="subtitle-large smaller">
                        Type your 24 word mnemonic to restore Stellar account
                        keys. Use 'Next' button or 'Enter' key to advance to the
                        next word.
                    </p>
                    <div className="p-b p-t">
                        <Input
                            label={"Word " + this.state.restoring}
                            inputType="text"
                            maxLength="100"
                            autoComplete="off"
                            value={this.state.wordValue}
                            keyPress={this.handleKeyPress.bind(this)}
                            handleChange={this.updateWord.bind(this)}
                            subLabel={
                                "Enter word number: " + this.state.restoring
                            }
                        />
                    </div>
                    <Button
                        handleClick={this.advanceWord.bind(
                            this,
                            this.state.restoring,
                            this.state.wordValue
                        )}
                        label="Next"
                    />
                </div>
            )
        }
        if (!this.state.restoring && this.state.mnemonic) {
            useDefaultAccount = (
                <div className="p-b p-t">
                    <Checkbox
                        isChecked={this.state.useDefaultAccount}
                        handleChange={this.handleCheckboxClick.bind(this)}
                        label="Use Default Account"
                    />
                </div>
            )
        }
        if (!this.state.mnemonic && !this.state.restoring) {
            language = (
                <div>
                    <div className="flex-row-centered column">
                        <RadioTag
                            checked="true"
                            value={LANGUAGE.EN}
                            handleClick={this.setLanguage.bind(this)}
                            name="language"
                            label="English"
                        />&nbsp;&nbsp;
                        <RadioTag
                            value={LANGUAGE.SP}
                            handleClick={this.setLanguage.bind(this)}
                            name="language"
                            label="Español"
                        />&nbsp;&nbsp;
                        <RadioTag
                            value={LANGUAGE.FR}
                            handleClick={this.setLanguage.bind(this)}
                            name="language"
                            label="Français"
                        />&nbsp;&nbsp;
                        <RadioTag
                            value={LANGUAGE.IT}
                            handleClick={this.setLanguage.bind(this)}
                            name="language"
                            label="Italiano"
                        />
                    </div>
                    <div className="flex-row-centered column">
                        <RadioTag
                            value={LANGUAGE.JP}
                            handleClick={this.setLanguage.bind(this)}
                            name="language"
                            label="日本語"
                        />&nbsp;&nbsp;
                        <RadioTag
                            value={LANGUAGE.CN}
                            handleClick={this.setLanguage.bind(this)}
                            name="language"
                            label="中文(简体)"
                        />&nbsp;&nbsp;
                        <RadioTag
                            value={LANGUAGE.CT}
                            handleClick={this.setLanguage.bind(this)}
                            name="language"
                            label="中文(繁體)"
                        />&nbsp;&nbsp;
                        <RadioTag
                            value={LANGUAGE.KR}
                            handleClick={this.setLanguage.bind(this)}
                            name="language"
                            label="한국어"
                        />
                    </div>
                </div>
            )
        }
        if (this.state.mnemonicInvalid) {
            warning = (
                <div className="warning">
                    <p className="warning-title">Warning: Checksum Invalid</p>
                    <p className="warning-subtitle">
                        The words you entered did not pass checksum validation.
                        This means that either you mistyped some of the words or
                        the phrase you entered was not generated by this
                        application. It is however possible to use the phrase
                        you restored to generate account keys. You can try
                        entering your phrase again by clicking 'Reset' button.
                    </p>
                </div>
            )
        }

        return (
            <div>
                <div className="flex-centered">
                    <p className="title">Redshift</p>
                    <p className="subtitle">Stellar HD Address Generator</p>
                    {language}
                    {button}
                    {warning}
                    {panel}
                    {useDefaultAccount}
                    {derivationPath}
                    {restorePanels}
                </div>
                <div className="p-t public">{pubKey}</div>
                <div className="p-t secret">{secretKey}</div>
                <div className="flex-centered">
                    <div>{stellarBase}</div>
                    {reset}
                </div>
            </div>
        )
    }
}
