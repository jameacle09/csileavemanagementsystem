import React, { Component } from "react";
import LoadingGIF from "../img/blue-spin.gif";

class LoadingPage extends Component {
  render() {
    const outerContainer = {
      display: "table",
      position: "relative",
      // top: "0",
      // left: "0",
      height: "482px",
      width: "100%"
      // border: "2px solid black"
    };

    const middleContainer = {
      display: "table-cell",
      position: "relative",
      margin: "auto",
      verticalAlign: "middle"
    };

    const innerContainer = {
      marginLeft: "auto",
      marginLight: "auto",
      width: "400px"
      /*whatever width you want*/
    };
    return (
      <div style={outerContainer}>
        <div style={middleContainer}>
          <img
            src={LoadingGIF}
            alt="Loading..."
            style={{
              width: "140px",
              height: "140px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
        </div>
      </div>
    );
  }
}

export default LoadingPage;
