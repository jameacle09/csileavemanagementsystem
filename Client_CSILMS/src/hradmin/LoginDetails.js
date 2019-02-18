import React, { Component } from "react";
import { Table, Input, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../common/Styles.css";
import { isHrRole } from '../util/APIUtils';
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';

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
  }

  loadLoginDetails() {
    fetchData({
      url: API_BASE_URL + "/logindetails",
      method: 'GET'
    }).then(response => {
      this.setState({
        userData: response
      });
    }).catch(error => {
      if (error.status === 401) {
        this.props.history.push("/login");
      }
      let userData = [];
      this.setState({ userData: userData });
      console.log(userData);
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
      return (<Redirect to='/forbidden' />);
    }

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
              {
                this.state.userData.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.userId}</td>
                      <td>{item.emplId}</td>
                      <td>{item.lockAccount}</td>
                      <td>
                        <Button
                          component={Link}
                          to={`/logindetails/edit/${item.userId}`}
                          variant="contained"
                          color="primary"
                          style={{ textTransform: "none", color: "white" }}
                        >
                          <span className="fa fa-edit" />
                        </Button>
                      </td>
                      <td>
                        <Button
                          component={Link}
                          to={`/logindetails/delete/${item.userId}`}
                          variant="contained"
                          color="primary"
                          style={{ textTransform: "none", color: "white" }}
                        >
                          <span className="fa fa-trash" />
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginDetails);
