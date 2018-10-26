import React from "react"
import ReactDOM from "react-dom"
import { unregister } from "./lib/caching-service-worker"

import RedShiftApp from "./components/RedShiftApp"




// render application's root into the DOM
ReactDOM.render(
    React.createElement(RedShiftApp),
    document.getElementById("root")
)




// https://bit.ly/oocache
unregister()
