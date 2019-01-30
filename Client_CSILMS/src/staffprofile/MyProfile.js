import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../common/Styles.css";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    };
  }
  componentDidMount() {
    // fetch data from API
    fetch("http://localhost/api/staffprofile/1")
      .then(response => response.json())
      .then(data => this.setState({ userData: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let userData = {
          csiStaffId: "",
          staffName: "",
          email: "",
          icNumber: "",
          jobTitle: "",
          mobileNo: "",
          businessUnit: "",
          managerName: "",
          joinDate: "",
          lineManager: ""
        };
        this.setState({ userData: userData });
      });
  }
  render() {
    if (this.state.userData == null) {
      // display loading screen until data is available
      return (
        <div>
          <br />
          <div className="container">
            <ListGroup className="loadingTextContainer">
              <ListGroupItem color="primary">My Profile</ListGroupItem>
              <ListGroupItem>
                <h2 className="loadingText"> Loading </h2>
              </ListGroupItem>
            </ListGroup>
            <br />
          </div>
          <br />
        </div>
      );
    }
    let userData = this.state.userData;
    // reformat dates and retrive manager name ONLY when data fetch successfully
    if (userData["csiStaffId"] !== "") {
      let joinDate = new Date(this.state.userData["joinDate"]);
      userData["joinDate"] =
        joinDate.getFullYear() +
        "-" +
        (joinDate.getMonth() + 1) +
        "-" +
        joinDate.getDate();
      userData["managerName"] = this.state.userData["lineManager"]["staffName"];
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
            <tr>
              <td
                className="listStaffName"
                style={{ width: "35%", verticalAlign: "top" }}
              >
                {userData["staffName"]}
              </td>
              <td style={{ width: "15%", verticalAlign: "top" }}>
                CSI Staff ID
                <p className="profileText">{userData["csiStaffId"]}</p>
              </td>
              <td style={{ width: "25%", verticalAlign: "top" }}>
                Job Title <p className="profileText">{userData["jobTitle"]}</p>
              </td>
            </tr>
          </table>
        </div>

        <div className="containerProfileFlex">
          <div className="myProfileSubContainer">
            <ListGroup>
              <ListGroupItem color="primary">
                <b>My Profile</b>
              </ListGroupItem>
              <ListGroupItem>
                CSI Staff ID:
                <p className="profileDataText">{userData["csiStaffId"]}</p>
              </ListGroupItem>
              <ListGroupItem>
                Name: <p className="profileDataText">{userData["staffName"]}</p>
              </ListGroupItem>
              <ListGroupItem>
                NRIC / Passport No:
                <p className="profileDataText">{userData["icNumber"]}</p>
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
                <p className="profileDataText">{userData["joinDate"]}</p>
              </ListGroupItem>
            </ListGroup>
          </div>
          <div className="myProfileSubContainer">
            <ListGroup>
              <ListGroupItem color="primary">
                <b>Contact</b>
              </ListGroupItem>
              <ListGroupItem>
                Email: <p className="profileDataText">{userData["email"]}</p>
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
export default MyProfile;
