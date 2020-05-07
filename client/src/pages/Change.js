import React, { Component } from "react";
import "../App.css";
import DeltaMap from "../components/DeltaMap";


class Change extends Component {

  render() {
      return (
        <div className="container">
            <DeltaMap />
        </div>
      );
    }
  }
  
  export default Change;