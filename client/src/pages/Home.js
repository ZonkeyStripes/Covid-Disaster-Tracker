import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import "../App.css";
import MapContainer from "../components/MapContainer";
import ChartContainer from "../components/ChartContainer";


class Home extends Component {

  render() {
      return (
        <div>
            <MapContainer />
            <ChartContainer />
        </div>
      );
    }
  }
  
  export default Home;