import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Content from './frontend/content/Content'
import Footer from './frontend/footer/Footer'
import Navbar from './frontend/navbar/Navbar'

import { isObject } from "@xcmats/js-toolbox"
import { devEnv, dynamicImportLibs } from "./lib/utils"


// expose 'redshift' dev. namespace only in dev. environment
if (devEnv() && isObject(window)) {
  (async () => {
  window.rs = {
    ...await dynamicImportLibs(),
  }
  })()
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Content />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
