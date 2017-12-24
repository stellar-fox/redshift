import React, {Component} from 'react'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <footer>
          <div>
            © <span>Stellar Fox</span> 2017.
          </div>
          <div className="right">
            Made with ♥ in Berlin | Bangkok
          </div>
        </footer>
      </div>
    )
  }
}
