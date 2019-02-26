import React from "react";
import { Button, Table } from "reactstrap";
import "./Modal.css";

class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  onSelect = e => {
    this.setState({ userId: "Test", emplId: "test", emplName: "text" });
    console.log(this.props);
    this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="newEmpLookupBackdrop">
        <div className="newEmpLookupModal">
          <div className="modalHeader">
            <h5>{this.props.children}</h5>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td />
                <td />
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={e => {
                      this.onSelect(e);
                    }}
                  >
                    <span className="fa fa-check" /> Select
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="modalFooter">
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={e => {
                this.onClose(e);
              }}
            >
              Close
            </Button>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default Modal;
