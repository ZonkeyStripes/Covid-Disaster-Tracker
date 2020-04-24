import React, { Component } from "react";
import "../App.css";
import MapContainer from "../components/MapContainer";
import ChartContainer from "../components/ChartContainer";


class Home extends Component {

  render() {
      return (
        <div className="container">
            <MapContainer />
            <ChartContainer />
        </div>
      );
    }
  }
  
  export default Home;