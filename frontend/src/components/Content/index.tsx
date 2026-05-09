import React, { Component } from "react"
import { Routes, Route } from "react-router-dom"

import About from "../About"
import Contact from "../Contact"
import Welcome from "../Welcome"

import "./index.css"




// <Content> component
export default class Content extends Component {
    render () {
        return (
            <div className="main-content">
                <Routes>
                    <Route path="/redshift/" element={<Welcome />} />
                    <Route path="/redshift/about" element={<About />} />
                    <Route path="/redshift/contact" element={<Contact />} />
                </Routes>
            </div>
        )
    }
}
