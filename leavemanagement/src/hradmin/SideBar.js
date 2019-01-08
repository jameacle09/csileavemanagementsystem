import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class SideBar extends Component {
    render() {
        const SideBarStyle = {
            height: "100%",
            width: "300px",
            
            background: "#293749"
        }
        return (

            <div style={SideBarStyle}>
                <Nav vertical>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                </Nav>
            </div>

        );
    }
}

export default SideBar;