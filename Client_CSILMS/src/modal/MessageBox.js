import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Modal.css";

class MessageBox extends React.Component {
  onWindowClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    console.log("Props", this.props);

    if (!this.props.show) {
      return null;
    }

    return (
      <Modal
        isOpen={this.props.show}
        toggle={this.onClose}
        className={this.props.className}
        style={{
          width: "360px",
          height: "300px",
          margin: "220px auto"
        }}
      >
        <ModalHeader>{this.props.msgHeaderText}</ModalHeader>
        <ModalBody>{this.props.msgBodyText}</ModalBody>
        <ModalFooter>
          {(() => {
            console.log("Hey", this.props.msgButton);
            if (this.props.msgButton === "YesNo") {
              return (
                <React.Fragment>
                  <Button
                    type="submit"
                    color="primary"
                    onClick={() => this.props.onExecute()}
                    className="largeButtonOverride"
                  >
                    Yes
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => this.props.onWindowClose()}
                  >
                    No
                  </Button>
                </React.Fragment>
              );
            } else if (this.props.msgButton === "OK") {
              return (
                <Button
                  color="primary"
                  onClick={() => this.props.onWindowClose()}
                >
                  OK
                </Button>
              );
            }
          })()}
        </ModalFooter>
      </Modal>
    );
  }
}

export default MessageBox;
