import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

class EditPublicHoliday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidayDate: "",
      holidayDay: "",
      holidayDescr: "",
      holidayState: ""
    };
  }

  componentDidMount() {
    const {
      holidayDate
    } = this.props.computedMatch.params;

    fetchData({
      url:
        API_BASE_URL +
        "/publicholiday/" +
        holidayDate,
      method: "GET"
    })
      .then(data => {
        console.log("Fetched Data", data);
        this.setState({
          holidayDate: data.holidayDate,
          holidayDay: data.holidayDay,
          holidayDescr: data.holidayDescr,
          holidayState: data.holidayState
        });

      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      holidayDate,
      holidayDay,
      holidayDescr,
      holidayState
    } = this.state;

    if (!isHrRole(this.props.currentUser)) {
      return (<Redirect to='/forbidden' />);
    }

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Public Holiday</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form>
            <FormGroup>
              <Label for="phDate">Date</Label>
              <Input
                type="date"
                name="phDate"
                id="phDate"
                value={holidayDate}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phDay">Day</Label>
              <Input type="text" name="phDay" id="phDay" value={holidayDay} />
            </FormGroup>
            <FormGroup>
              <Label for="holiday">Holiday</Label>
              <Input
                type="text"
                name="holiday"
                id="holiday"
                value={holidayDescr}
              />
            </FormGroup>
            <FormGroup>
              <Label for="state">State</Label>
              <Input type="text" name="state" id="state" value={holidayState} />
            </FormGroup>
            <Button variant="contained" color="primary" style={{ textTransform: "none", color: "white" }}>Save</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditPublicHoliday);
