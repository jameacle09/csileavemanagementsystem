import React, { Component } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import StaffTableRow from './StaffTableRow';

class ListStaffProfile extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const spacing = {
            padding: "10px",
            textAlign: "right"
        }

        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div>
                <br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>List of Staff Profile</h3></Col>
                    </Row>
                </div>
                <br />
                <div className="container">
                    <div style={spacing}>
                        <Button className="btn btn-primary" color="primary" onClick={this.props.showNewStaffProfile} activeclassname="active">Add New Employee</Button>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>CSI Staff ID</th>
                                <th>Staff Name</th>
                                <th>Email</th>
                                <th>NRIC / Passport No.</th>
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
                            {
                                this.props.data.map((staffprofile, index) =>
                                    <StaffTableRow key={index} staffprofile={staffprofile} />)
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default ListStaffProfile;