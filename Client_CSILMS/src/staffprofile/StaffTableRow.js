import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

class StaffTableRow extends Component {

    render() {
        return(
            <tr>
                <td>{ this.props.staffprofile.csiStaffId }</td>
                <td>{ this.props.staffprofile.staffName }</td>
                <td>{ this.props.staffprofile.email }</td>
                <td>{ this.props.staffprofile.icNumber }</td>
                <td>{ this.props.staffprofile.jobTitle }</td>
                <td>{ this.props.staffprofile.mobileNo }</td>
                <td>{ this.props.staffprofile.businessUnit }</td>
                <td>{ this.props.staffprofile.lineManagerId }</td>
                <td>{ this.props.staffprofile.joinDate }</td>
                <td><Button className="btn btn-primary" color="primary" tag={Link} to="/newstaffprofile" activeclassname="active"><span className="fa fa-edit"></span></Button></td>
                <td><Button className="btn btn-primary" color="primary" tag={Link} to="/newstaffprofile" activeclassname="active"><span className="fa fa-trash"></span></Button></td>
            </tr>
        );
    }
}

export default StaffTableRow;