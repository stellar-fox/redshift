import { Buffer } from "buffer"
if (typeof window !== "undefined") {
    (window as any).Buffer = Buffer;
    (window as any).process = { env: { NODE_ENV: "development" } };
}
import React from "react"
import { createRoot } from "react-dom/client"

import RedShiftApp from "./components/RedShiftApp"




// render application's root into the DOM
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<RedShiftApp />);
}




// https://bit.ly/oocache
