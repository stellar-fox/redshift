import { Buffer } from "buffer"
if (typeof window !== "undefined") {
    window.Buffer = Buffer;
    window.process = { env: { NODE_ENV: "development" } };
}
import React from "react"
import { createRoot } from "react-dom/client"
import { unregister } from "./lib/caching-service-worker"

import RedShiftApp from "./components/RedShiftApp"




// render application's root into the DOM
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<RedShiftApp />);
}




// https://bit.ly/oocache
unregister()
