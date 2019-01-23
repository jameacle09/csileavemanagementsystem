import React, { Component } from 'react';
import { Button, Table, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";
import SideBar from './SideBar';
import "./SideBarStyle.css";

class PublicHoliday extends Component {

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
                <div className="containerFlex_">
                    <ListGroup className="ListGroupSideBar">
                            <SideBar />
                    </ListGroup>
                    <ListGroup className="ListGroupContent">
                            <div>
                                <br /><br />
                                <div className="container" style={divStyle}>
                                    <Row>
                                        <Col><h3>Public Holiday</h3></Col>
                                    </Row>
                                </div>
                                <br />
                                <div className="container">
                                    <div style={spacing}>
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
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default PublicHoliday;