import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import {
    devEnv,
    isObject,
    to_,
} from "@xcmats/js-toolbox"
import { dynamicImportLibs } from "../../lib/utils"

import Content from "../Content"
import Footer from "../Footer"
import Navbar from "../Navbar"

import "typeface-roboto"
import "./index.css"




// expose 'redshift' dev. namespace (only in dev. environment)
if (devEnv()  &&  isObject(window)) {
    (async () => {
        window.sf = { ...(await dynamicImportLibs()) }
        window.to_ = to_
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
