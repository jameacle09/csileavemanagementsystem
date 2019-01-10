import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";

class ListStaffProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const spacing = {
            padding: "10px",
            textAlign: "right"
        }

        return (
            <div className="container">
                <div style={spacing}>
                    <Button className="btn btn-primary" color="primary" tag={Link} to="/newstaffprofile" activeclassname="active">Add New Employee</Button>
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>CSI Staff ID</th>
                            <th>Staff Name</th>
                            <th>Email</th>
                            <th>IC No./ Passport No.</th>
                            <th>Job Title</th>
                            <th>Mobile No.</th>
                            <th>Business Unit</th>
                            <th>Line Manager</th>
                            <th>Join Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListStaffProfile;