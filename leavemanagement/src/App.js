import React, { Component } from 'react';
import Menu from './common/Menu';
import Footer from './common/Footer';
import Header from './common/Header';
import HomePage from './home/HomePage';
import ApplyLeave from './leaves/ApplyLeave';
import MyLeaveDetails from './leaves/MyLeaveDetails';
import MyLeaveHistory from './leaves/MyLeaveHistory';
import MyProfile from './staffprofile/MyProfile';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/applyleave" component={ApplyLeave} />
            <Route path="/myleavehistory" component={MyLeaveHistory} />
            <Route path="/myleavedetails" component={MyLeaveDetails} />
            <Route path="/myprofile" component={MyProfile} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
