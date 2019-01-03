import React, { Component } from 'react';
import Menu from './common/Menu';
import Footer from './common/Footer';
import Header from './common/Header';
import HomePage from './home/HomePage';
import Dashboard from './home/Dashboard';
import ListStaffProfile from './staffprofile/ListStaffProfile';
import MyProfile from './staffprofile/MyProfile';
import ChangePassword from './staffprofile/ChangePassword';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';



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
