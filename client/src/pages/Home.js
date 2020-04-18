import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import "../App.css";
import usstates from '../assets/gz_2010_us_040_00_5m.geojson';
// import MapContainer from "../components/MapContainer";
import MapContainerTest from "../components/MapContainerTest";
import ChartContainer from "../components/ChartContainer";


const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.82,-98.57];
const zoomLevel = 4;

console.log(usstates);

class Home extends Component {

  render() {
      return (
        <div className="container">
            {/* <MapContainer /> */}
            <MapContainerTest />
            <ChartContainer />
        </div>
      );
    }
  }
  
  export default Home;