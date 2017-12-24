import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import './Content.css'
import About from '../../pages/About'
import Contact from '../../pages/Contact'
import Welcome from '../../pages/Welcome'

export default class Content extends Component {
  render() {
    return (
      <div className="main-content">
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/contact" component={Contact}></Route>
      </div>
    )
  }
}
