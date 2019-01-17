import React, { Component } from 'react';
import SideBar from './SideBar';
import ListStaffProfile from '../staffprofile/ListStaffProfile';
import AddLeaveCategory from './AddLeaveCategory';

import { Container, Row, Col } from 'reactstrap';

class HrDashboard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col><SideBar /></Col>
                </Row>
            </div>
            
            
        );
    }
}

export default HrDashboard;