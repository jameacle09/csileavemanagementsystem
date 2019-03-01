import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import { fetchData, formatDateDMY, formatDateYMD } from "../util/APIUtils";
import ExportToExcel from "./PublicHolidayToExcel";

class PublicHoliday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicHolidayDetails: [],
      loading: true
    };
  }

  loadPublicHolidayDetails = () => {
    fetchData({
      url: API_BASE_URL + "/publicholidays",
      method: "GET"
    })
      .then(data => {
        this.setState({
          publicHolidayDetails: data,
          loading: false
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({ userData: userData });
      });
  };

  componentDidMount() {
    this.loadPublicHolidayDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadPublicHolidayDetails();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const PublicHolidayCols = [
      {
        id: "holidayDate",
        Header: "Date",
        accessor: d => formatDateDMY(d.holidayDate),
        width: 100,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "holidayDay",
        Header: "Day",
        accessor: "holidayDay",
        minWidth: 60,
        sortable: true,
        filterable: true
      },
      {
        id: "holidayDescr",
        Header: "Holiday",
        accessor: "holidayDescr",
        minWidth: 130,
        sortable: true,
        filterable: true
      },
      {
        id: "holidayState",
        Header: "State(s)",
        accessor: "holidayState",
        minWidth: 290,
        sortable: true,
        filterable: true
      },
      {
        id: "editAction",
        Header: "Action",
        accessor: editButton => (
          <Button
            size="sm"
            tag={Link}
            to={`/publicholiday/edit/${formatDateYMD(editButton.holidayDate)}`}
            className="smallButtonOverride"
          >
            <span className="fa fa-edit" /> Edit
          </Button>
        ),
        minWidth: 40,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Public Holidays</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              <ExportToExcel
                publicHolidayDetails={this.state.publicHolidayDetails}
              />
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                tag={Link}
                to={`/publicholiday/uploadholiday`}
                className="largeButtonOverride"
              >
                <span
                  className="fa fa-upload"
                  style={{ margin: "0px 10px 0px 0px" }}
                />
                Upload Holidays
              </Button>
              <span> </span>
              <Button
                tag={Link}
                to={`/publicholiday/add`}
                className="largeButtonOverride"
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Add Holiday
              </Button>
            </Col>
          </Row>
          <ReactTable
            data={this.state.publicHolidayDetails}
            columns={PublicHolidayCols}
            defaultPageSize={10}
            pages={this.state.pages}
            loading={this.state.loading}
            filterable={true}
            sortable={true}
            multiSort={true}
            loadingText="Loading Public Holidays..."
            noDataText="No data available."
            className="-striped"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(PublicHoliday);
