import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className='flex-centered content'>

        <p className='title'>
          Terms of Service
        </p>
        <p>
          By using <em>Redshift</em>, you are agreeing to the following terms
          and conditions. This service is provided on an "as is" basis, without
          any warranties. We are not responsible for any losses in Stellar native
          asset (XLM) or any other tokens held in your Stellar account(s) that you may incur
          for any reason. In no event shall <em>Redshift</em> be held liable for
          anything arising out of or in any way connected with your use of this
          Service whether such liability is under contract. <em>Redshift</em> shall
          not be held liable for any indirect, consequential or special
          liability arising out of or in any way related to your use of this Service.
          We reserve the right to modify or terminate the Service for any reason,
          without notice at any time. We reserve the right to alter these Terms
          at any time.

          Use at your own risk. HD account generators can be dangerous if you
          don't take proper security precautions. This tool can be used to restore
          your Stellar account from previously generated mnemonic. We recommend
          that this functionality only be used in case the following are true:
        </p>
        <ul>
          <li>You need immediate "<em>spend access</em>" to your Stellar account</li>
          <li>You are in posession of your 24 word mnemonic</li>
          <li>You don't have or can't use your Ledger device at the moment</li>
        </ul>
        <p>
          Once this web application is loaded there is no further network requests
          being made. All operations are performed in the browser. If you want
          to add an extra layer of security, while generating a new mnemonic,
          we recommend that you
          download the copy of the web site and run it on an air gapped computer.
          You can read about air gapped machines (and how to make one) in Bruce
          Schneier's <a href='https://www.schneier.com/blog/archives/2013/10/air_gaps.html'>
          blog article</a>.
        </p>

        <p className='title'>
          How does <em>Redshift</em> work?
        </p>
        <p>
          There are two modes of operation:
        </p>
        <p>
          <strong>Generate</strong><br/>
          24 words mnemonic (256 bits of entropy) is auto generated. The mnemonic
          is used to derive a seed, which serves as a basis for generating
          deterministic Stellar accounts. Each mnemonic can be complemented with
          a passphrase. The passphrase can be any UTF-8 string up to 100 characters
          and is "something you know" in addition to "something you have"
          such as your 24 word mnemonic. This prevents the perpetrators from gaining
          access to your account even when they get a hold of your mnemonic as they
          would still need your passphrase to restore the account. You can also
          choose to specify the account hierarchy, expressed as a positive integer
          index. 0 is used to generate the default account.

        </p>
        <p>
          <strong>Restore</strong><br/>
          If you have already generted your mnemonic phrase in the past by using
          a hardware wallet or this tool, you can restore your Stellar
          account keys by entering the 24 words. If you protected your mnemonic
          with a passphrase you can enter it as well. Restoring the account can
          really be thought of as creating the mnemonic by hand. Each word of the
          mnemonic is limited to 100 characters and can be any UTF-8 string. You can
          come up with your own phrase and it will still generate a valid Stellar
          account, however, this is <strong>strongly discouraged</strong> as it
          is not secure due to the low level of randomness.
        </p>

        <p className='title'>
          <a href='https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki'>BIP39</a>
        </p>
        <p className='subtitle'>Hierarchical Deterministic Addresses</p>
        <p>
          BIP39 mnemonics can be used to generate deterministic series of
          account addresses. The method presented here uses 24 words to generate
          series of deterministic Stellar key pairs. 24 word mnemonics are also
          used by many hardware wallets (such as Ledger Nano S). This tool can
          also be used to <em>restore</em> your account based on the mnemonic
          that was generated earlier by either the hardware wallet or any other
          wallets compatible with BIP39, BIP32 and BIP44 specifications.
          You can find out more and take a look at Ian Coleman's <a href='https://iancoleman.io/bip39/'>
           Mnemonic Code Converter</a> implementation.
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
          uncheck 'Use Default Account' and select index number of desired account
          hierarchy. The upper limit of index number of child accounts is 2<sup>31</sup>.
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
        <p className='title'>Libraries used:</p>
        <ul>
          <li>
            <a href='https://crypto.stanford.edu/sjcl/'>sjcl
            </a> - Stanford Javascript Crypto Library
          </li>
          <li>
            <a href='https://github.com/stellar/js-stellar-base'>
              js-stellar-base</a> - Lowest level stellar helper library.
          </li>
        </ul>

        <p>
          Tested with SEP-0005 Vectors 3 and 4
        </p>
      </div>


    )
  }
}
