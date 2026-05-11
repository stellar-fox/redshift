import React from "react"
// <Footer> component
import { array } from "@xcmats/js-toolbox"
import { version } from "../../version"
import "./index.css"




// <Footer> component
export default () =>
    <div className="footer">
        <footer>
            <div>
                &nbsp;© &nbsp;<span className="footersfox"><b>Stellar Fox</b></span>&nbsp;&nbsp;2017-{new Date().getFullYear()}.
            </div>
            <div className="right">
                Made with &nbsp;<span className="footerheart" aria-label="love" role="img">❤</span>&nbsp; in { array.draw(["Wrocław", "Berlin", "Bangkok", "Zielona Góra", "Bad Steben"]) }. ver. <b>{ version }</b>
            </div>
        </footer>
    </div>
