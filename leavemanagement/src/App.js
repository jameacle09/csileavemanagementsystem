import React, { Component } from 'react';
import Menu from './common/Menu';
import Footer from './common/Footer';
import Header from './common/Header';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './common/Main';
import HomePage from './home/HomePage';



class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Header />
        <HomePage />
        <Footer />
      </div>
    );
  }
}

export default App;
