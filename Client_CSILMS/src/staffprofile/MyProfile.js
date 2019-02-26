import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../common/Styles.css";
import Loading from "../img/Spinner-1s-200px.gif";
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        emplId: "",
        name: "",
        businessEmail: "",
        nricPassport: "",
        jobTitle: "",
        mobileNo: "",
        businessUnit: "",
        managerName: "",
        joinDate: "",
        reportsTo: ""
      }
    };

    this.loadUserProfile = this.loadUserProfile.bind(this);

  }

  loadUserProfile() {
    fetchData({
      url: API_BASE_URL + "/employeedetail/me",
      method: 'GET'
    }).then(response => {
      this.setState({
        userData: response
      });
    }).catch(error => {
      if (error.status === 401) {
        this.props.history.push("/login");
      }
      let userData = {
        emplId: "",
        name: "",
        businessEmail: "",
        nricPassport: "",
        jobTitle: "",
        mobileNo: "",
        businessUnit: "",
        managerName: "",
        joinDate: "",
        reportsTo: ""
      };
      this.setState({ userData: userData });
    });
  }

  componentDidMount() {
    this.loadUserProfile();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadUserProfile();
    }
  }


  render() {
    if (this.state.userData == null) {
      // display loading screen until data is available
      return (
        <div className="containerFlex">
          <img src={Loading} alt="Loading" style={{ padding: "300px" }} />
        </div>
      );
    }
    let userData = this.state.userData;
    // reformat dates and retrive manager name ONLY when data fetch successfully
    if (userData["emplId"] !== "") {
      // let joinDate = new Date(this.state.userData["joinDate"]);
      // userData["joinDate"] =
      //   joinDate.getFullYear() +
      //   "-" +
      //   (joinDate.getMonth() + 1) +
      //   "-" +
      //   joinDate.getDate();
      userData["managerName"] = this.state.userData["reportsTo"]["name"];
    }
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <table
            style={{
              width: "100%",
              height: "100%",
              margin: "0 auto",
              padding: "0"
            }}
          >
          <tbody>
            <tr>
              <td
                className="listStaffName"
                style={{ width: "35%", verticalAlign: "top" }}
              >
                {userData["name"]}
              </td>
              <td style={{ width: "15%", verticalAlign: "top" }}>
                Employee ID
                <p className="profileText">{userData["emplId"]}</p>
              </td>
              <td style={{ width: "25%", verticalAlign: "top" }}>
                Job Title <p className="profileText">{userData["jobTitle"]}</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="containerProfileFlex">
          <div className="myProfileSubContainer">
            <ListGroup>
              <ListGroupItem color="primary">
                <b>My Profile</b>
              </ListGroupItem>
              <ListGroupItem>
              Employee ID:
                <p className="profileDataText">{userData["emplId"]}</p>
              </ListGroupItem>
              <ListGroupItem>
              Employee Name: <p className="profileDataText">{userData["name"]}</p>
              </ListGroupItem>
              <ListGroupItem>
                NRIC / Passport No:
                <p className="profileDataText">{userData["nricPassport"]}</p>
              </ListGroupItem>
            </ListGroup>
          </div>
          <div className="myProfileSubContainer">
            <ListGroup>
              <ListGroupItem color="primary">
                <b>Business</b>
              </ListGroupItem>
              <ListGroupItem>
                Business Unit:
                <p className="profileDataText">{userData["businessUnit"]}</p>
              </ListGroupItem>
              <ListGroupItem>
                Line Manager:
                <p className="profileDataText">{userData["managerName"]}</p>
              </ListGroupItem>
              <ListGroupItem>
                Join Date:{" "}
                <p className="profileDataText"><Moment format="YYYY-MM-DD">{userData["joinDate"]}</Moment></p>
              </ListGroupItem>
            </ListGroup>
          </div>
          <div className="myProfileSubContainer">
            <ListGroup>
              <ListGroupItem color="primary">
                <b>Contact</b>
              </ListGroupItem>
              <ListGroupItem>
                Email: <p className="profileDataText">{userData["businessEmail"]}</p>
              </ListGroupItem>
              <ListGroupItem>
                Mobile No.:{" "}
                <p className="profileDataText">{userData["mobileNo"]}</p>
              </ListGroupItem>
            </ListGroup>
          </div>
          <br />
          <div className="buttonChngPwd">
            <Button
              component={Link}
              to="/changepassword/add"
              variant="contained"
              color="primary"
              style={{ textTransform: "none", color: "white" }}

            >
              Change Password
            </Button>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
export default withRouter(MyProfile);
