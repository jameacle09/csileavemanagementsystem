import React, { Component } from 'react';
import { Table, Button, Input } from 'reactstrap';
import StaffTableRow from './StaffTableRow';
import { Link } from "react-router-dom";
import SideBar from '../hradmin/SideBar';
import "../common/Styles.css"

class ListStaffProfile extends Component {

    render() {
        const headerStyle = {
            margin: "0 0 0 10px"
        };

        const divStyle = {
            background: "#B8E2FC",
            width: "auto",
            margin: "0 0 0 0",
            padding: "25px 0 25px 20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div className="menuContainer">
                <div className="menu">
                    <div>
                        <SideBar />
                    </div>
                    <div className="content">
                        <div style={divStyle}>
                            <span className="header"><h3 style={headerStyle}>Staff Profile</h3></span>
                        </div><br />
                        <div className="search">
                            <Input type="text" maxlength="50" placeholder="Search Employee" style={{ width: "25%" }} />
                            <Button className="btn btn-primary" color="primary" type="submit">Search</Button>
                            <div style={{ marginLeft: "57%" }}>
                                <Button className="btn btn-primary" color="primary" tag={Link} to="/newstaffprofile" activeclassname="active">Add New Employee</Button>
                            </div>
                        </div>
                        <div>
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
                </div>
            </div>
        );
    }
}

export default ListStaffProfile;