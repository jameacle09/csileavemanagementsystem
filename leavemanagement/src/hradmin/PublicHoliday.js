import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import SideBar from './SideBar';
import "../common/Styles.css"

class PublicHoliday extends Component {

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
                            <span className="header"><h3 style={headerStyle}>Public Holiday</h3></span>
                        </div><br />
                        <div>
                            <div>
                                <Button className="btn btn-primary" color="primary" tag={Link} to="/addpublicholiday" activeclassname="active">Add New</Button><span> </span>
                                <Button className="btn btn-primary" color="primary">Upload Holiday</Button>
                            </div>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Day</th>
                                        <th>Holiday</th>
                                        <th>State</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><Button className="btn btn-primary" color="primary" tag={Link} to="/editpublicholiday" activeclassname="active"><span>Edit</span></Button></td>
                                        <td><Button color="primary"><span>Delete</span></Button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicHoliday;