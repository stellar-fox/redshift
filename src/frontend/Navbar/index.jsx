import React from "react"
import { NavLink } from "react-router-dom"

import logo from "../RedShiftApp/logo.svg"
import "./index.css"




// <Navbar> component
export default () =>
    <div className="navbar">
        <nav>
            <img src={logo} className="company-logo" alt="logo" />
            <div className="right">
                <NavLink
                    exact
                    activeClassName="selected"
                    to="/redshift/"
                >
                    Home
                </NavLink>❘
                <NavLink
                    exact
                    activeClassName="selected"
                    to="/redshift/about"
                >
                    About
                </NavLink>❘
                <NavLink
                    exact
                    activeClassName="selected"
                    to="/redshift/contact"
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    </div>
