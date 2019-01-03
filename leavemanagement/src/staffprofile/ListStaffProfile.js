import React, { Component } from 'react';
import { Table } from 'reactstrap';

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
                    <button className="btn btn-primary">Add New Employee</button>
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