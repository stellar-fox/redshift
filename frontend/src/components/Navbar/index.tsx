import React from "react"
import { NavLink } from "react-router-dom"

import logo from "../RedShiftApp/sf.logo.png"
import "./index.css"




// <Navbar> component
export default () =>
    <div className="navbar">
        <nav>
            <img
                src={logo}
                className="company-logo m-l"
                alt="Stellar Fox"
            />
            <div className="right m-r">
                <NavLink
                    className={({ isActive }) => (isActive ? "selected" : "")}
                    to="/"
                    end
                >
                    Home
                </NavLink>❘
                <NavLink
                    className={({ isActive }) => (isActive ? "selected" : "")}
                    to="/about"
                    end
                >
                    About
                </NavLink>❘
                <NavLink
                    className={({ isActive }) => (isActive ? "selected" : "")}
                    to="/contact"
                    end
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    </div>
