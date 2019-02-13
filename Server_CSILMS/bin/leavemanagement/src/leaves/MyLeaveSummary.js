import React, { Component } from 'react';
import { Row, Col, Progress } from 'reactstrap';

class MyLeaveSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staffleave: {
                'availableLeave': ''
            }
        };
    }

    componentDidMount() {
        fetch('http://localhost/api/staffleaves')
        .then(response => response.json())
        .then(data => this.setState({staffleave: data}))
        .catch(err => {
            // if unable to fetch data, assign default (spaces) to values
            let staffleave = {
              'availableLeave': ''
            }
            this.setState({ staffleave: staffleave })
          })
    }

    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        let staffleave = this.state.staffleave;

        return (
            <div className="container" style={divStyle}>
                <Row>
                    <Col>
                        <h5>Annual Leave Balance: {staffleave['availableLeave']} Days</h5>
                        <Progress value="75">25%</Progress>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MyLeaveSummary;