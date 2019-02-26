import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import TranslateitemToExcel from "./TranslateitemToExcel";

class TranslateItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateItemsData: [],
      loading: true
    };
    this.loadTranslateItems = this.loadTranslateItems.bind(this);
  }

  loadTranslateItems() {
    fetchData({
      url: API_BASE_URL + "/translateitems",
      method: "GET"
    })
      .then(data => {
        this.setState({
          translateItemsData: data,
          loading: false
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({
          translateItemsData: userData,
          loading: false
        });
      });
  }

  componentDidMount() {
    this.loadTranslateItems();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadTranslateItems();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const showStatusDesc = strStatus => {
      if (strStatus === "A") {
        return "Active";
      } else {
        return "Inactive";
      }
    };

    const TranslateItemsCols = [
      {
        id: "fieldname",
        Header: "Field Name",
        accessor: "id.fieldname",
        width: 170,
        sortable: true,
        filterable: true
      },
      {
        id: "fieldvalue",
        Header: "Field Value",
        accessor: "id.fieldvalue",
        width: 150,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "xlatlongname",
        Header: "Field Long Name",
        accessor: "xlatlongname",
        // minWidth: 40,
        sortable: true,
        filterable: true
      },
      {
        id: "xlatshortname",
        Header: "Field Short Name",
        accessor: "xlatshortname",
        // minWidth: 40,
        sortable: true,
        filterable: true
      },
      {
        id: "effStatus",
        Header: "Effective Status",
        accessor: str => showStatusDesc(str.effStatus),
        width: 150,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "editAction",
        Header: "Action",
        accessor: editButton => (
          <Button
            size="sm"
            tag={Link}
            to={`/translateitems/edit/${editButton.id.fieldname}/${
              editButton.id.fieldvalue
            }`}
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
            <h3 className="headerStyle">Translate Items</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              <TranslateitemToExcel translateItemsData={this.state.translateItemsData} />
            </Col>                    
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                tag={Link}
                to={`/translateitems/add`}
                className="largeButtonOverride"
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Add Translate Item
              </Button>
            </Col>
          </Row>
          <ReactTable
            data={this.state.translateItemsData}
            columns={TranslateItemsCols}
            defaultPageSize={10}
            pages={this.state.pages}
            filterable={true}
            sortable={true}
            multiSort={true}
            noDataText="No data available."
            className="-striped"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(TranslateItems);
