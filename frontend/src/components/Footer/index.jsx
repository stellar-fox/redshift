import React from "react"
import { array } from "@xcmats/js-toolbox"
import { version } from "../../../package.json"
import "./index.css"




// <Footer> component
export default () =>
    <div className="footer">
        <footer>
            <div>
                &nbsp;© &nbsp;&nbsp;<span className="footersfox"><b><a href="https://stellarfox.net">Stellar Fox</a></b></span>&nbsp;&nbsp; <span className="footermoji" aria-label="fox" role="img">🦊</span> &nbsp;&nbsp;2017-2018.
            </div>
            <div className="right">
                Made with &nbsp;<span className="footerheart" aria-label="love" role="img">❤</span>&nbsp; in { array.draw(["Wrocław", "Berlin", "Bangkok"]) }. ver. <b>{ version }</b> &nbsp;&nbsp; &nbsp;<span className="footermoji" aria-label="rocket" role="img">🚀</span>&nbsp;
            </div>
        </footer>
    </div>
