import React from "react"
import ReactDOM from "react-dom"
import { unregister } from "./caching-service-worker"
import App from "./App"




// render application's root into the DOM
ReactDOM.render(
    React.createElement(App),
    document.getElementById("root")
)




// https://bit.ly/oocache
unregister()
