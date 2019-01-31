import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class StaffTableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.staffprofile.csiStaffId}</td>
        <td>{this.props.staffprofile.staffName}</td>
        <td>{this.props.staffprofile.email}</td>
        <td>{this.props.staffprofile.icNumber}</td>
        <td>{this.props.staffprofile.jobTitle}</td>
        <td>{this.props.staffprofile.mobileNo}</td>
        <td>{this.props.staffprofile.businessUnit}</td>
        <td>{this.props.staffprofile.lineManagerId}</td>
        <td>{this.props.staffprofile.joinDate}</td>
        <td>
          <Button
            //to={`/liststaffprofile/edit/${this.props.staffprofile.csiStaffId}`}



            component={Link}
            to="/liststaffprofile/edit/add"
            variant="contained"
            color="primary"
            style={{ textTransform: "none", color: "white" }}
          >
            <span className="fa fa-edit" style={{ textTransform: "none", color: "white" }} />
          </Button>
        </td>
        <td>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none", color: "white" }}
          >
            <span className="fa fa-trash" style={{ textTransform: "none", color: "white" }} />
          </Button>
        </td>
      </tr>
    );
  }
}

export default StaffTableRow;
