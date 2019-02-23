import React, { Component } from "react";
import { Button, Table, Input, Row, Col } from "reactstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../common/Styles.css";
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from "react-confirm-alert";

class Login extends Component {
  render() {
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
            style={{ textTransform: "none", color: "white" }}
          >
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
            style={{ textTransform: "none", color: "white" }}
          >
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
      userData: []
    };
    this.loadLoginDetails = this.loadLoginDetails.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.confirmResetPassword = this.confirmResetPassword.bind(this);
  }

  confirmResetPassword(e, emplId) {
    console.log(emplId);
    confirmAlert({
      message: "Do you want to reset password for employee " + emplId + "?",
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

  resetPassword(emplId) {
    const values = { emplid: emplId };
    const request = Object.assign({}, values);

    fetchData({
      url: API_BASE_URL + "/resetPassword",
      method: "POST",
      body: JSON.stringify(request)
    })
      .then(response => {
        confirmAlert({
          message:
            "You have successfully reset password for employee " + emplId,
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
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

    const showFullString = strLocked => {
      if (strLocked === 1) {
        return "Yes";
      } else {
        return "No";
      }
    };

    const loginDetailsViews = [];
    this.state.userData.forEach((item, key) => {
      loginDetailsViews.push(
        <Login
          key={key}
          item={item}
          confirmResetPassword={event =>
            this.confirmResetPassword(event, item.emplId)
          }
        />
      );
    });

    const loginDetailsCols = [
      {
        id: "userId",
        Header: "User ID (Email)",
        accessor: "userId",
        minWidth: 140,
        sortable: true,
        filterable: true
      },

      {
        id: "emplId",
        Header: "Employee ID",
        accessor: "emplId",
        minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "lockAccount",
        Header: "Account Locked?",
        accessor: str => showFullString(str.lockAccount),
        minWidth: 80,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "quickReset",
        Header: "Quick Reset",
        accessor: resetButton => (
          <Button
            color="primary"
            size="sm"
            onClick={event =>
              this.confirmResetPassword(event, resetButton.emplId)
            }
            variant="contained"
            // style={{ textTransform: "none", color: "white" }}
            activeclassname="active"
            className="smallButtonOverride"
          >
            Reset Password
          </Button>
        ),
        minWidth: 72,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
      // {
      //   id: "Action",
      //   Header: "Action",
      //   accessor: editButton => (
      //     <Button
      //       color="primary"
      //       size="sm"
      //       tag={Link}
      //       to={`/logindetails/edit/${editButton.userId}`}
      //       activeclassname="active"
      //       className="smallButtonOverride"
      //     >
      //       <span className="fa fa-edit" style={{ color: "white" }} />
      //       &nbsp;Edit
      //     </Button>
      //   ),
      //   minWidth: 72,
      //   sortable: false,
      //   filterable: false,
      //   style: {
      //     textAlign: "center"
      //   }
      // }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">User Login Details</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          {/* <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              <span> </span>
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                color="primary"
                component={Link}
                tag={Link}
                to="/logindetails/add"
                className="largeButtonOverride"
                activeclassname="active"
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Add User
              </Button>
            </Col>
          </Row> */}
          <ReactTable
            data={this.state.userData}
            columns={loginDetailsCols}
            defaultPageSize={10}
            pages={this.state.pages}
            loading={this.state.loading}
            filterable={true}
            sortable={true}
            multiSort={true}
            // rowsText="Rows per page"
            loadingText="Loading Employee Login Details..."
            noDataText="No data available."
            className="-striped"
          />
          {/* <Row>
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
                <th>Employee Name</th>
                <th>Account Locked?</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{loginDetailsViews}</tbody>
          </Table> */}
        </div>
      </div>
    );
  }
}

export default withRouter(LoginDetails);
