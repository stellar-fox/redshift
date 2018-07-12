import React, { Component } from "react"
import { Route } from "react-router-dom"

import About from "../../pages/About"
import Contact from "../../pages/Contact"
import Welcome from "../Welcome"

import "./index.css"




// <Content> component
export default class Content extends Component {
    render () {
        return (
            <div className="main-content">
                <Route exact path="/redshift/" component={Welcome} />
                <Route exact path="/redshift/about" component={About} />
                <Route exact path="/redshift/contact" component={Contact} />
            </div>
        )
    }
}
