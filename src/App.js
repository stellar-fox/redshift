import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { isObject } from "@xcmats/js-toolbox"
import { devEnv, dynamicImportLibs } from "./lib/utils"

import Content from "./frontend/content/Content"
import Footer from "./frontend/footer/Footer"
import Navbar from "./frontend/navbar/Navbar"

import "./App.css"




// expose 'redshift' dev. namespace only in dev. environment
if (devEnv()  &&  isObject(window)) {
    (async () => {
        window.rs = {
            ...(await dynamicImportLibs()),
        }
    })()
}




// <App> component
export default () =>
    <Router>
        <Fragment>
            <Navbar />
            <Content />
            <Footer />
        </Fragment>
    </Router>
