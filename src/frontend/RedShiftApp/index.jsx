import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { isObject } from "@xcmats/js-toolbox"
import { devEnv, dynamicImportLibs } from "../../lib/utils"

import Content from "../content/Content"
import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"

import "./index.css"




// expose 'redshift' dev. namespace only in dev. environment
if (devEnv()  &&  isObject(window)) {
    (async () => {
        window.rs = {
            ...(await dynamicImportLibs()),
        }
    })()
}




// <RedShiftApp> component
export default () =>
    <Router>
        <Fragment>
            <Navbar />
            <Content />
            <Footer />
        </Fragment>
    </Router>
