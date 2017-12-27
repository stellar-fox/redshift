import React, {Component} from 'react'

export default class Contact extends Component {
  render() {
    return (
      <div className='flex-centered'>
        <p className='title'>syntaxval@gmail.com</p>
        <p className='subtitle'>
          <a href='https://github.com/stellar-fox'>
            https://github.com/stellar-fox
          </a>
        </p>
        <p><a href='https://keybase.io/syntaxval/pgp_keys.asc?fingerprint=1dfed048b07023a7d9b980297fb5ef4d9c22b993'>
          PGP key</a> 1DFE D048 B070 23A7 D9B9 8029 7FB5 EF4D 9C22 B993
        </p>
        <p>
        <em>Redshift</em> is licensed under BSD 2-Clause License.
        </p>
        <p>
          If you find this software useful and/or would like to extend your
          support, please donate to:
        </p>
        <p>
          <a href='https://stellar.expert/explorer/account/GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR'>
            GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR
          </a>
        </p>
        <p class='smaller'>
          Even a fraction of XLM would make a difference. ♡
          We would love to hear your feedback and suggestions.
        </p>
      </div>
    )
  }
}
