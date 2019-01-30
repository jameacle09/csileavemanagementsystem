import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class StaffTableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.staffprofile.emplId}</td>
        <td>{this.props.staffprofile.name}</td>
        <td>{this.props.staffprofile.businessEmail}</td>
        <td>{this.props.staffprofile.nricPassport}</td>
        <td>{this.props.staffprofile.jobTitle}</td>
        <td>{this.props.staffprofile.mobileNo}</td>
        <td>{this.props.staffprofile.businessUnit}</td>
        <td>{this.props.staffprofile.managerName}</td>
        <td>{this.props.staffprofile.joinDate}</td>
        <td>
          <Button
            className="btn btn-primary"
            color="primary"
            tag={Link}
            to={`/liststaffprofile/edit/${this.props.staffprofile.emplId}`}
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
            to="/liststaffprofile"
            activeclassname="active"
          >
            <span className="fa fa-trash" />
          </Button>
        </td>
      </tr>
    );
  }
}

export default StaffTableRow;
