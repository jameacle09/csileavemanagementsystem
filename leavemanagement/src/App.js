import React, { Component } from 'react';
import Menu from './common/Menu';
import Footer from './common/Footer';
import WelcomePage from './common/WelcomePage';



class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <WelcomePage />
        <Footer />
      </div>
    );
  }
}

export default App;
