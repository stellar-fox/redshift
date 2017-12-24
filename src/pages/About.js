import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className='flex-centered content'>

        <p className='title'>
          About
        </p>

        <p>
          Tested with SEP-0005 Vectors 3 and 4
        </p>
        <p>
          <strong>Disclaimer:</strong>&nbsp;
          Use at your own risk. HD account generators can be dangerous if you
          don't take proper security precautions. This tool should only serve as
          an emergency recovery tool in case the following are true:
        </p>
        <ul>
          <li>You need immediate access you your Stellar account</li>
          <li>You are in posession of your 24 word mnemonic</li>
          <li>You don't have or can't use your Ledger device at the moment</li>
        </ul>

        <p className='title'>
          <a href='https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki'>BIP39</a>
        </p>
        <p className='subtitle'>Hierarchical Deterministic Addresses</p>
        <p>
          BIP39 mnemonics can be used to generate deterministic series of
          account addresses. The method presented here uses 24 words to generate
          series of deterministic Stellar key pairs. You can find out more at
          Ian Coleman's <a href='https://iancoleman.io/bip39/'>Mnemonic Code
          Converter</a>.
        </p>

        <div className='p-b p-t'></div>
        <p className='title'>
          <a href='https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki'>BIP44</a>
        </p>
        <p className='subtitle'>
          Multi-Account Hierarchy for Deterministic Wallets
        </p>
        <p>
          Redshift uses BIP32 path with hardened derivation. You can choose to
          derive key pair for default account (with index address equal to 0) or
          uncheck 'Use Default Account' and select index number of account
          hierarchy that you want to derive the key pair for.
        </p>

        <div className='p-b p-t'></div>
        <p className='title'>
          <a href='https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md'>SEP-0005</a>
        </p>
        <p className='subtitle'>
          Key Derivation Methods for Stellar Accounts
        </p>
        <p>
          Stellar Ecosystem Proposal describes implementation of deterministic
          key derivation for Stellar accounts based on word mnemonic of different
          lengths. Redshift will use 24 word mnemonics in order to be compatible
          with Ledger devices. Different mnemonic lengths will be implemented in the
          future.
        </p>
      </div>


    )
  }
}
