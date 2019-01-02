import React, { Component } from 'react';
import Menu from './common/Menu';
import Footer from './common/Footer';
import WelcomePage from './common/WelcomePage';
import Header from './common/Header';
import NewStaffProfile from './common/NewStaffProfile';



class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Header />
        <WelcomePage />
        <NewStaffProfile />
        <Footer />
      </div>
    );
  }
}

export default App;
