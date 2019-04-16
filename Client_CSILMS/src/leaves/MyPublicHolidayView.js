import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import "../common/Styles.css";
import { withRouter } from "react-router-dom";
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import LoadingPage from "../common/LoadingPage";

class MyPublicHolidayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidayDate: "",
      holidayDay: "",
      holidayDescr: "",
      holidayState: "",
      loading: true
    };
  }

  componentDidMount() {
    const { holidayDate } = this.props.computedMatch.params;

    fetchData({
      url: API_BASE_URL + "/publicholiday/" + holidayDate,
      method: "GET"
    })
      .then(data => {
        this.setState({
          holidayDate: data.holidayDate,
          holidayDay: data.holidayDay,
          holidayDescr: data.holidayDescr,
          holidayState: data.holidayState,
          loading: false
        });
      })
      .catch(err => {
        confirmAlert({
          message: "Record not found!",
          buttons: [
            {
              label: "OK",
              onClick: () => this.props.history.push("/mypublicholiday")
            }
          ]
        });
      });
  }

  handleCancel = () => {
    this.props.history.push("/mypublicholiday");
  };

  render() {
    const { holidayDate, holidayDay, holidayDescr, holidayState } = this.state;

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">View Public Holiday</h3>
          </span>
        </div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <div className="tableContainerFlex">
              <Form>
                <FormGroup row>
                  <Label for="phDate" sm={2}>
                    Date:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="date"
                      name="holidayDate"
                      id="phDate"
                      value={formatDateYMD(holidayDate)}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="phDay" sm={2}>
                    Day:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="holidayDay"
                      id="phDay"
                      value={holidayDay}
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="holiday" sm={2}>
                    Holiday:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      maxLength="50"
                      name="holidayDescr"
                      id="holiday"
                      value={holidayDescr}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="state" sm={2}>
                    State(s):
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      maxLength="100"
                      name="holidayState"
                      id="state"
                      value={holidayState}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button
                      type="button"
                      color="primary"
                      className="largeButtonOverride"
                      onClick={this.handleCancel}
                    >
                      Back
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(MyPublicHolidayView);
