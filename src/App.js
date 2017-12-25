import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Content from './frontend/content/Content'
import Footer from './frontend/footer/Footer'
import Navbar from './frontend/navbar/Navbar'

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
