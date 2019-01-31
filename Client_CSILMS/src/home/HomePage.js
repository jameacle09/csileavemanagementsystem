import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import Dashboard from "./Dashboard";
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants'; 
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        name: ""
      }
    };
    
    this.loadUserProfile = this.loadUserProfile.bind(this);
  }

  loadUserProfile(){
    fetchData({
      url: API_BASE_URL + "/persondetail/me",
      method: 'GET'
    }).then(response => {
      this.setState({
        userData: response
      });
    }).catch(error => {
      if(error.status === 401) {
         this.props.history.push("/login");    
      } 
    });
  }

  componentDidMount() {
    this.loadUserProfile();
  }

  componentDidUpdate(nextProps) {
    if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadUserProfile();
    }
  }

  render() {
    const divStyle = {
      backgroundImage:
        "url('http://www.chinasofti.com/en/styles/extends/about/images/header.jpg')",
      backgroundSize: "cover",
      marginTop: "-16px",
      color: "#FFFFFF",
      textShadow: "1px 1px #7A7974"
    };

    let userData = this.state.userData;

    return (
      <div>
        <Jumbotron style={divStyle}>
          
          <h1 className="display-3">Hello, {userData["name"]}! </h1>
          <p className="lead">Welcome to CSI Leave Management System.</p>
          {
            // <hr className="my-2" />
            // <p>Leave Management System for employees of CSI Interfusion Sdn. Bhd.</p>
            // <p className="lead">
            //   <Button color="primary">Apply Leave</Button>
            // </p>
          }
        </Jumbotron>
        <Dashboard currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

export default withRouter(HomePage);
