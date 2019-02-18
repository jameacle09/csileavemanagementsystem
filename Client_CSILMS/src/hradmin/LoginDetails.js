import React, { Component } from "react";
import { Table, Input, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../common/Styles.css";
import { isHrRole } from '../util/APIUtils';
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import { confirmAlert } from "react-confirm-alert";

class Login extends Component {
    render(){
      return (
        <tr key={this.props.key}>
          <td>{this.props.item.userId}</td>
          <td>{this.props.item.emplId}</td>
          <td>{this.props.item.lockAccount}</td>
          <td>
            <Button
              onClick={this.props.confirmResetPassword}
              variant="contained"
              color="primary"
              style={{ textTransform: "none", color: "white" }}>
              {/*<span className="fa fa-edit" />*/}
                Reset Password
            </Button>
          </td>
          <td>
            <Button
              component={Link}
              to={`/logindetails/delete/${this.props.item.userId}`}
              variant="contained"
              color="primary"
              style={{ textTransform: "none", color: "white" }}>
                <span className="fa fa-trash" />
            </Button>
          </td>
        </tr>
      );
    }  
}

class LoginDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [
        // {
        //   joinDate: ""
        // }
      ]
    };
    this.loadLoginDetails = this.loadLoginDetails.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  confirmResetPassword(e, emplId){
    confirmAlert({
      message: "Do you want to reset password for employee " + emplId + "?" ,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.resetPassword(emplId)
        },
        {
          label: "No"
        }
      ]
    });
  }

  resetPassword(emplId){
    const values = {"emplid": emplId};
    const request = Object.assign({}, values);
    
    fetchData({
      url: API_BASE_URL + "/resetPassword",
      method: 'POST',
      body: JSON.stringify(request)
    }).then(response => {
      confirmAlert({
        message: "You have successfully reset password for employee " + emplId + "?" ,
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    }).catch(error => {
      if(error.status === 401) {
         this.props.history.push("/login");    
      } else {
        confirmAlert({
          message: error.status + " : " + error.message ,
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      }
    });
  }

  loadLoginDetails() {
    fetchData({
      url: API_BASE_URL + "/logindetails",
      method: "GET"
    })
      .then(response => {
        this.setState({
          userData: response
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({ userData: userData });
      });
  }

  componentDidMount() {
    this.loadLoginDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadLoginDetails();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const loginDetailsViews = [];
    this.state.userData.forEach((item, key) => {
      loginDetailsViews.push(
        <Login key={key}
          item={item}
          confirmResetPassword={(event) => this.confirmResetPassword(event, item.emplId)}
        />
      )
    });

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">User Login Details</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Row>
            <Col md="6" xs="6" className="search">
              <Input
                type="text"
                maxlength="50"
                placeholder="Search Employee"
                style={{ width: "35%" }}
              />
              <Button variant="contained" color="primary" type="submit">
                <span className="fa fa-search" />
              </Button>
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                component={Link}
                to="/logindetails/add"
                variant="contained"
                color="primary"
                style={{ textTransform: "none", color: "white" }}
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 10px 0px 0px" }}
                />
                Add User
              </Button>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Employee ID</th>
                {/* <th>Employee Name</th> */}
                <th>Account Locked?</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loginDetailsViews}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginDetails);
