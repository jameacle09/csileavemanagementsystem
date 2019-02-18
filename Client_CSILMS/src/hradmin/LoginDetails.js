import React, { Component } from "react";
import { Table, Input, Row, Col, Button } from "reactstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../common/Styles.css";
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import "react-table/react-table.css";

class LoginDetails extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      loginDetailsData: []
    };
    this.loadLoginDetails = this.loadLoginDetails.bind(this);
  }

  loadLoginDetails() {
    fetchData({
      url: API_BASE_URL + "/logindetails",
      method: "GET"
    }).then(data => {
      console.log(data);
      // this.setState({
      //   loginDetailsData: data
      // });
    });

    // .catch(error => {
    //   if (error.status === 401) {
    //     this.props.history.push("/login");
    //   }
    //   let loginDetailsData = [];
    //   this.setState({ loginDetailsData: loginDetailsData });
    // });
  }

  componentDidMount() {
    this._isMounted = true;
    // this.loadLoginDetails();
    fetchData({
      url: API_BASE_URL + "/logindetails",
      method: "GET"
    }).then(loginDetails => {
      // console.log(data);
      if (this._isMounted) {
        this.setState({
          loginDetailsData: loginDetails
        });
      }
      // this.setState({
      //   loginDetailsData: data
      // })
    });
  }

  // componentDidUpdate(nextProps) {
  //   if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
  //     this.loadLoginDetails();
  //   }
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    console.log(this.state.loginDetailsData);

    const showFullString = strLocked => {
      if (strLocked === "1") {
        return "Yes";
      } else {
        return "No";
      }
    };

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
        filterable: true
      },
      {
        id: "name",
        Header: "Employee Name",
        // accessor: "employeeDetails.name",
        Cell: "",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "jobTitle",
        Header: "Job Title",
        // accessor: "employeeDetails.jobTitle",
        Cell: "",
        minWidth: 120,
        sortable: true,
        filterable: true
      },
      {
        id: "lockAccount",
        Header: "Account Locked?",
        accessor: str => showFullString(str.lockAccount),
        minWidth: 80,
        sortable: true,
        filterable: true
      },
      {
        id: "Action",
        Header: "Action",
        accessor: editButton => (
          <Button
            color="primary"
            size="sm"
            tag={Link}
            to={`/logindetails/edit/${editButton.userId}`}
            activeclassname="active"
            className="smallButtonOverride"
          >
            <span className="fa fa-edit" style={{ color: "white" }} />
            &nbsp;Edit
          </Button>
        ),
        minWidth: 72,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
    ];
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">User Login Details</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              {/* <Button component={Link} to="" className="largeButtonOverride">
                <span
                  className="fa fa-file-excel"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Export to Excel
              </Button> */}
              {/* <ExportToExcel employeeProfiles={this.state.employeeProfiles}>
                <span
                  className="fa fa-file-excel"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
              </ExportToExcel> */}
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
          </Row>
          <ReactTable
            data={this.state.loginDetailsData}
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
            <tbody>
              {this.state.loginDetailsData.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.userId}</td>
                    <td>{item.emplId}</td>
                    <td>{item.lockAccount}</td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        color="primary"
                        tag={Link}
                        to={`/logindetails/edit/${"userid"}`}
                        activeclassname="active"
                      >
                        <span className="fa fa-edit" />
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        color="primary"
                        tag={Link}
                        to={`/logindetails/delete/${"userid"}`}
                        activeclassname="active"
                      >
                        <span className="fa fa-trash" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table> */}
        </div>
      </div>
    );
  }
}

export default LoginDetails;
