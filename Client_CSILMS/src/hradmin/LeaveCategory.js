import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';

class LeaveCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [
        // {
        //   joinDate: ""
        // }
      ]
    };
    this.loadLeaveCategory = this.loadLeaveCategory.bind(this);
  }

  loadLeaveCategory() {
    fetchData({
      url: API_BASE_URL + "/leavecategories",
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
    this.loadLeaveCategory();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadLeaveCategory();
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
            <h3 className="headerStyle">List of Leave Category</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <div style={{ textAlign: "right" }}>
            <Button
              component={Link}
              to="/leavecategory/add"
              variant="contained"
              color="primary"
              style={{ textTransform: "none", color: "white" }}
            >
              <span
                className="fa fa-plus"
                style={{ margin: "0px 10px 0px 0px" }}
              />{" "}
              New
            </Button>
            <br />
            <br />
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>Leave Code</th>
                <th>Description</th>
                <th>Entitlement</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.userData.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.leaveCode}</td>
                      <td>{item.leaveDescr}</td>
                      <td>{item.entitlement}</td>
                      <td><Button
                        component={Link}
                        to={`/leavecategory/edit/${item.leaveCode}`}
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "none", color: "white" }}
                      >
                        <span className="fa fa-edit" />
                      </Button></td>
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

export default withRouter(LeaveCategory);
