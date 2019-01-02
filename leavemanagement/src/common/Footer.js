import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="card" align="center">
        <div className="card-header">
          Copyright 2019 CSI Interfusion Sdn. Bhd.
      </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
          </blockquote>
        </div>
      </div>
    );
  }
}

export default Footer;

