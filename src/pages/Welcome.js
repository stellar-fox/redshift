import React, {Component} from 'react'
// import Script from 'react-load-script'
import Panel from '../frontend/panel/Panel'
import Button from '../frontend/button/Button'
import Checkbox from '../frontend/checkbox/Checkbox'
import Input from '../frontend/input/Input'
import RadioTag from '../frontend/radiotag/RadioTag'
import bip39 from 'bip39'
import {generateKeyPair} from '../lib/sep5'
import './Welcome.css'


export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mnemonic: undefined,
      bip39Seed: undefined,
      StellarBase: true,
      sjcl: true,
      pubKey: undefined,
      secretKey: undefined,
      useDefaultAccount: true,
      pathEditable: false,
      checked: true,
      derivationPath: '0',
      derivationPathIndex: 0,
      derivationPrefix: "44'/148'/",
      buttonVisible: true,
      restoring: false,
      restoredPhrase: [],
      wordValue: '',
      passphrase: '',
      language: 'english',
      languageDescription: 'English',
      mnemonicInvalid: false,
    }
  }

  updateMnemonic() {
    this.setState({
      buttonVisible: false
    })
    const mnemonic = bip39.generateMnemonic(
        256, undefined, bip39.wordlists[this.state.language]
      ),
      bip39Seed = bip39.mnemonicToSeedHex(mnemonic, this.state.passphrase)
    this.setState({
      mnemonic,
      bip39Seed
    })
    if (this.state.sjcl && this.state.StellarBase) {
      const keyPair = generateKeyPair(bip39Seed, this.state.derivationPathIndex)
      this.setState((prevState) => ({
        pubKey: keyPair.publicKey()
      }))
      this.setState((prevState) => ({
        secretKey: keyPair.secret()
      }))
    }
  }

  enterMnemonic() {
    this.setState({
      buttonVisible: false
    })

    this.setState((prevState) => ({
      restoring: 1
    }))
  }

  restoreMnemonic(mnemonic) {
    this.setState((prevState) => ({
      restoring: undefined
    }))
    const bip39Seed = bip39.mnemonicToSeedHex(mnemonic)
    this.setState({
      mnemonic,
      bip39Seed
    })
    if (this.state.sjcl && this.state.StellarBase) {
      const keyPair = generateKeyPair(bip39Seed, this.state.derivationPathIndex)
      this.setState((prevState) => ({
        pubKey: keyPair.publicKey()
      }))
      this.setState((prevState) => ({
        secretKey: keyPair.secret()
      }))
    }
  }

  advanceWord(index, value) {
    this.setState({
      restoring: index + 1
    })
    this.setState({
      restoredPhrase: [...this.state.restoredPhrase, value]
    }, () => {
      if (index === 24) {
        let splitter = ' '
        if (this.state.language === 'japanese') {
          splitter = '\u3000'
        }
        let mnemonicStr = this.state.restoredPhrase.join(splitter)
        if (!bip39.validateMnemonic(mnemonicStr)) {
          this.setState({mnemonicInvalid: true})
        }
        this.restoreMnemonic(mnemonicStr)
      }
    })
    this.setState((prevState) => ({
      wordValue: ''
    }))
  }

  updateWord(event) {
    this.setState({
      wordValue: event.target.value
    })
  }

  updatePassphrase(event) {
    this.setState({
      passphrase: event.target.value
    }, () => {
      const bip39Seed = bip39.mnemonicToSeedHex(
        this.state.mnemonic, this.state.passphrase
      )
      this.setState({
        bip39Seed
      }, () => {
        if (this.state.sjcl && this.state.StellarBase &&
            this.state.pubKey && !this.state.restoring) {
          const keyPair = generateKeyPair(
            bip39Seed, this.state.derivationPathIndex
          )
          this.setState((prevState) => ({
            pubKey: keyPair.publicKey()
          }))
          this.setState((prevState) => ({
            secretKey: keyPair.secret()
          }))
        }
      })
    })
  }

  numberedList(words, offset) {
    if (!offset) {
      offset = 1
    }
    const listItems = words.map((_, index) => (
      <div key={index}>
        <span className='number'>{((index + offset) + '. ')}</span>
        <span>{_}</span>
      </div>
    ))
    return (
      <div>
        {listItems}
      </div>
    )
  }

  renderMnemonic() {
    let splitter = ' '
    if (this.state.language === 'japanese') {
      splitter = '\u3000'
    }
    const mnemonic = this.state.mnemonic.split(splitter)
    return (
      <div className='columns'>
        <div className='column'>
          {this.numberedList(mnemonic.slice(0,12))}
        </div>
        <div className='column'>
          {this.numberedList(mnemonic.slice(12), 13)}
        </div>
      </div>
    )
  }

  handleLoadSjcl() {
    this.setState({
      sjcl: true
    })
  }

  handleLoadStellar(event) {
    this.setState({
      StellarBase: true
    })
  }

  handleCheckboxClick(event) {
    const target = event.target
    this.setState({
      useDefaultAccount: target.checked
    })
    this.setState((prevState) => ({
      pathEditable: !target.checked
    }))
    // reset derivation path index to 0
    if(target.checked) {
      this.setState((prevState) => ({
        derivationPath: '0',
        derivationPathIndex: 0
      }))
      if (this.state.pubKey) {
        let keyPair = generateKeyPair(this.state.bip39Seed, 0)
        this.setState((prevState) => ({
          pubKey: keyPair.publicKey()
        }))
        this.setState((prevState) => ({
          secretKey: keyPair.secret()
        }))
      }
    }
  }

  handlePathChange(event) {
    const target = event.target
    if (isNaN(target.value)) {
      return false
    }
    const index = parseInt(target.value, 10)
    this.setState({
      derivationPath: target.value,
      derivationPathIndex: index
    })
    if (this.state.pubKey) {
      if (!isNaN(index) && index >= 0) {
        let keyPair = generateKeyPair(this.state.bip39Seed, index)
        this.setState((prevState) => ({
          derivationPathIndex: index
        }))
        this.setState((prevState) => ({
          pubKey: keyPair.publicKey()
        }))
        this.setState((prevState) => ({
          secretKey: keyPair.secret()
        }))
      }
    }
  }

  setLanguage(event) {
    const target = event.target
    target.previousSibling.checked = true
    this.setState({
      language: target.previousSibling.value,
      languageDescription: target.textContent
    })
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      this.advanceWord(
        this.state.restoring, this.state.wordValue
      )
    }
  }

  reset(event) {
    this.setState({
      mnemonic: undefined,
      bip39Seed: undefined,
      pubKey: undefined,
      secretKey: undefined,
      useDefaultAccount: true,
      pathEditable: false,
      checked: true,
      derivationPath: '0',
      derivationPathIndex: 0,
      derivationPrefix: "44'/148'/",
      buttonVisible: true,
      restoring: false,
      restoredPhrase: [],
      wordValue: '',
      passphrase: '',
      language: 'english',
      languageDescription: 'English',
      mnemonicInvalid: false,
    })
  }

  render() {
    let panel, pubKey, secretKey, derivationPath, button, stellarBase,
      restorePanels, useDefaultAccount, language, warning, reset
    if (!this.state.StellarBase) {
      stellarBase = (
        <div className='tiny'>
          ✗&nbsp;StellarBase did not load.
        </div>
      )
    }
    if (this.state.mnemonic) {
      panel = (
        <div className='p-t'>
          <Panel
            title={'Mnemonic [256 bits] - ' + this.state.languageDescription}
            content={this.renderMnemonic()} />
          <div className='p-b p-t'>
            <Input
              label={"Passphrase (optional)"}
              inputType="text"
              maxLength="100"
              autoComplete="off"
              value={this.state.passphrase}
              handleChange={this.updatePassphrase.bind(this)}
              subLabel={
                "Enter mnemonic passphrase."
              }/>
          </div>
        </div>
      )
    }
    if (this.state.buttonVisible) {
      button = (
        <div className='p-b p-t'>
          <Button
            handleClick={this.updateMnemonic.bind(this)}
            label='Generate' />
          &nbsp;&nbsp;&nbsp;
          <Button
            handleClick={this.enterMnemonic.bind(this)}
            label='Restore' />
        </div>
      )
    }
    if (this.state.pubKey) {
      pubKey = (
        <div className='break-string'>
          <Panel
            title={"Public Key [" + this.state.derivationPrefix +
            this.state.derivationPath + "']"}
            content={this.state.pubKey} />
        </div>
      )
    }
    if (this.state.secretKey) {
      secretKey = (
        <div className='break-string'>
          <Panel
            title={"Secret Key [" + this.state.derivationPrefix +
            this.state.derivationPath + "']"}
            content={this.state.secretKey} />
        </div>
      )
      reset = (
        <div className='p-t p-b'>
          <Button
            handleClick={
              this.reset.bind(this)
            }
            label='Reset' />
        </div>
      )
    }
    if (this.state.pathEditable) {
      derivationPath = (
        <div className='p-b p-t'>
        <Input
          label="Account Index"
          inputType="text"
          maxLength="100"
          autoComplete="off"
          value={this.state.derivationPath}
          handleChange={this.handlePathChange.bind(this)}
          subLabel={
            "Account Derivation Path: [" + this.state.derivationPrefix +
            this.state.derivationPath + "']"
          }/>
        </div>
      )
    }
    if (this.state.restoring) {
      restorePanels = (
        <div className='flex-centered'>
          <p className='p-t subtitle-large'>
            Restoring {this.state.languageDescription} mnemonic.
          </p>
          <p className='subtitle-large smaller'>
            Type your 24 word mnemonic to restore Stellar account keys.
            Use 'Next' button or 'Enter' key to advance to the next word.
          </p>
          <div className='p-b p-t'>
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
              }/>
          </div>
          <Button
            handleClick={
              this.advanceWord.bind(
                this, this.state.restoring, this.state.wordValue
              )
            }
            label='Next' />
        </div>
      )
    }
    if (!this.state.restoring && this.state.mnemonic) {
      useDefaultAccount = (
        <div className='p-b p-t'>
          <Checkbox
            isChecked={this.state.useDefaultAccount}
            handleChange={this.handleCheckboxClick.bind(this)}
            label='Use Default Account' />
        </div>
      )
    }
    if (!this.state.mnemonic && !this.state.restoring) {
      language = (
        <div>
        <div className='flex-row-centered column'>
          <RadioTag checked='true' value='english'
            handleClick={this.setLanguage.bind(this)}
            name='language' label='English' />&nbsp;&nbsp;
          <RadioTag value='spanish' handleClick={this.setLanguage.bind(this)}
            name='language' label='Español' />&nbsp;&nbsp;
          <RadioTag value='french' handleClick={this.setLanguage.bind(this)}
            name='language' label='Français' />&nbsp;&nbsp;
          <RadioTag value='italian' handleClick={this.setLanguage.bind(this)}
            name='language' label='Italiano' />
        </div>
        <div className='flex-row-centered column'>
          <RadioTag value='japanese' handleClick={this.setLanguage.bind(this)}
            name='language' label='日本語' />&nbsp;&nbsp;
          <RadioTag value='chinese_simplified'
            handleClick={this.setLanguage.bind(this)}
            name='language' label='中文(简体)' />&nbsp;&nbsp;
          <RadioTag value='chinese_traditional'
            handleClick={this.setLanguage.bind(this)}
            name='language' label='中文(繁體)' />
        </div>
        </div>
      )
    }
    if (this.state.mnemonicInvalid) {
      warning = (
        <div className='warning'>
          <p className='warning-title'>
            Warning: Checksum Invalid
          </p>
          <p className='warning-subtitle'>
            The words you entered did not pass checksum validation.
            This means that either you mistyped some of the words or the phrase
            you entered was not generated by this application. It is however
            possible to use the phrase you restored to generate account keys.
            You can try entering your phrase again by clicking 'Reset' button.
          </p>
        </div>
      )
    }

    return (
      <div>
        <div className='flex-centered'>
          <p className='title'>
            Redshift
          </p>
          <p className='subtitle'>
            Stellar HD Address Generator
          </p>
          {language}
          {button}
          {warning}
          {panel}
          {useDefaultAccount}
          {derivationPath}
          {restorePanels}
        </div>
        <div className='p-t public'>
          {pubKey}
        </div>
        <div className='p-t secret'>
          {secretKey}
        </div>
        <div className='flex-centered'>
          <div>
            {stellarBase}
          </div>
          {reset}
        </div>
      </div>
    )
  }
}
