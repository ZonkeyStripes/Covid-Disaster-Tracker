import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import "../App.css";
import MapContainer from "../components/MapContainer";
import MapContainerTest from "../components/MapContainerTest";
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