import React, { Component } from "react";
import "../App.css";
import MapContainer from "../components/MapContainer";
import ChartContainer from "../components/ChartContainer";

class Home extends Component {

  render() {
      return (
        <div>
          <div className="container">
            <MapContainer />
          </div>
          <ChartContainer />
        </div>
      );
    }
  }
  
  export default Home;