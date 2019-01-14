import React, { Component } from 'react';

class StaffTableRow extends Component {

    constructor(props) {
        super(props); 
        
    }

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
            </tr>
        );
    }
}

export default StaffTableRow;