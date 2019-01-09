import React, { Component } from 'react';
import './SideBarStyle.css';
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';

class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const SideBarStyle = {
            height: "100vh",
            width: "300px",
            background: "lightblue"
        }
        return (
            <div style={SideBarStyle}>
                <Nav vertical>
                    <NavItem>
                        <NavLink href="#">Staff Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Staff Leave</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Public Holiday</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Leave Category</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default SideBar;