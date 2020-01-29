import React, { Component } from "react";

const rootStyle = {
  padding: "10px",
  height: "100vh"
};

class Layout extends Component {
  render() {
    return <div style={rootStyle}>{this.props.children}</div>;
  }
}

export default Layout;
