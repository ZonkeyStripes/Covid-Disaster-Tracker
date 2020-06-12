import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON, MapControl } from "react-leaflet";
import { Icon } from "leaflet";
import $ from "jquery";
import "../App.css";
import uscounties from '../assets/gz_2010_us_050_00_5m.json';
// import countyData from '../assets/nytimescounties.json';
import MapLegend from "./MapLegend";
import * as Constants from "../constants";
import Axios from "axios";


const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.82,-98.57];
let zoomLevel = 4;


const mapColors = [
    ["#034e7b", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#f1eef6"],
    ["#b10026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffffb2"],
    ["#b10026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffffb2"],
    ['#990000', '#d7301f', '#ef6548', '#fc8d59', '#fdbb84', '#fdd49e', '#fef0d9']
]

const thresholdData = [
    [10000, 500, 200, 100, 50, 10],
    [200, 100, 50, 25, 10, 5]
];

let allMarkersMap = {};
let currentID = 0;



class DashboardMap extends Component {

    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            displayed: "cases",
            colors: mapColors[0],
            limits: thresholdData[0],
            effective_date: props.date,
            countyData: []
        };

        // ES6 React.Component doesn't auto bind methods to itself
        // Need to bind them manually in constructor
        this.changeView = this.changeView.bind(this);
        this.geoJSONStyle = this.geoJSONStyle.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
    }
    
    componentDidMount() {

        Axios.get("/api/county_latest_date/")
        .then(dateResult => {
            console.log(dateResult);
            let latestDate = dateResult.data[0].date;
            console.log(latestDate);

            Axios.get("/api/county_data/" + latestDate)
            .then(countyD => {

                this.setState({
                    effective_date: this.props.date,
                    countyData: countyD.data
                },
                this.setPopUps);
            })
        })
    }

    setPopUps() {
        // convert values of the allMarkersMap object to an array
        let markers = Object.values(allMarkersMap);

        // iterate through the markers array
        for(let i = 0; i < markers.length; i++) {

            let dataToDisplay;

            // get the fips code, convert to integer
            let geo_id = markers[i].feature.properties.GEO_ID;
            geo_id = geo_id.substring(geo_id.length - 5);
            // console.log(geo_id);
            geo_id = parseInt(geo_id);

            // iterate through the countyData stored in state, match to geo_id fips code
            for(let j = 0; j < this.state.countyData.length; j++) {
                if(parseInt(this.state.countyData[j].fips) == geo_id) {
                    if(this.state.displayed === "cases") {
                        console.log(this.state.countyData[j].cases);
                        dataToDisplay = this.state.countyData[j].cases;
                    } else if (this.state.displayed === "deaths") {
                        dataToDisplay = this.state.countyData[j].deaths;
                    }
                }
            }

            let mark = markers[i].getPopup();
            // console.log(markers[i].feature);

            let popupContent;

            // look into why this is sometimes undefined
            if(dataToDisplay) {
                popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` ${this.state.displayed}`;
            } else {
                popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
            }

            // set the marker with the popupContent;
            mark.setContent(popupContent);
        }
    }

    geoJSONStyle(feature) {
        let covidCases = 0;
        let covidDeaths = 0;
        let displayData;

        // figure out how to deal with irregularities in NYC data
        // if(feature.properties.STATE == 36 && (

        let geo_id = feature.properties.GEO_ID;
        geo_id = geo_id.substring(geo_id.length - 5);
        //console.log(geo_id);
        geo_id = parseInt(geo_id);



        for(let i = 0; i < this.state.countyData.length; i++) {
            if(parseInt(this.state.countyData[i].fips) === geo_id) {
                covidCases = this.state.countyData[i].cases;
                covidDeaths = this.state.countyData[i].deaths;
            }
        }

        // console.log("cases" + covidCases);
        // console.log("deaths" +covidDeaths);
 
        if(this.state.displayed === "cases") {
            // console.log("made it to cases");
            //thresholds = thresholdData[0];
            // mapClr = mapColors[0];
            displayData = covidCases;
        } else {
            // console.log("made it to deaths");
            // thresholds = thresholdData[1];
            // mapClr = mapColors[1];
            displayData = covidDeaths;
        }
        // console.log("***")
        // console.log(thresholds);
 
        // console.log(feature.properties);

        let colorResult;

        if (displayData > this.state.limits[0]) {
            colorResult = this.state.colors[0];
        } else if (displayData > this.state.limits[1]) {
            colorResult = this.state.colors[1];
        } else if (displayData > this.state.limits[2]) {
            colorResult = this.state.colors[2];
        } else if (displayData > this.state.limits[3]) {
            colorResult = this.state.colors[3];
        } else if (displayData > this.state.limits[4]) {
            colorResult = this.state.colors[4];
        } else if (displayData > this.state.limits[5]) {
            colorResult = this.state.colors[5];
        } else {
            colorResult = this.state.colors[6];
        }

        // console.log(colorResult);

        return {
          color: '#1f2021',
          weight: 1,
          fillOpacity: 0.8,
          fillColor: colorResult,
        }
    }
    

    
      onEachFeature(feature, layer) {
        // console.log("onEachFeature");
        // console.log(feature.properties);
        // console.log(this.state.displayed)
        let dataToDisplay;
    
        let geo_id = feature.properties.GEO_ID;
        geo_id = geo_id.substring(geo_id.length - 5);
        geo_id = parseInt(geo_id);

        for(let j = 0; j < this.state.countyData.length; j++) {
            // console.log(countyArray[j].state);
            // console.log(markers[i].feature.properties.NAME);
            if(parseInt(this.state.countyData[j].fips) == geo_id) {
                if(this.state.displayed === "cases") {
                    dataToDisplay = this.state.countyData[j].cases;
                } else if (this.state.displayed === "deaths") {
                    dataToDisplay = this.state.countyData[j].deaths;
                }
            }
        }

        let popupContent;

        // look into why this is sometimes undefined
        if(dataToDisplay) {
            popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
            '<b>' + feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` ${this.state.displayed}`;
        } else {
            popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
            '<b>' + feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
        }


        // const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
		// 	'<b>' + feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
        
        
        let marker = layer.bindPopup(popupContent);
        
        // console.log(marker);
        allMarkersMap[currentID] = marker;
        currentID += 1;

        layer.on({
            mouseover: this.highlightFeature.bind(this),
            mouseout: this.resetHighlight.bind(this),
            click: this.zoomToFeature.bind(this)
        });
      }

    // mouseover a specific state
    highlightFeature(e) {
        // console.log("mouseover");
        // console.log(e);

        let layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    }

    resetHighlight(e) {
        let layer = e.target;

        this.refs.geojson.leafletElement.resetStyle(e.target);
        // layer.resetStyle();
        // info.update();
    }

    zoomToFeature(e) {
        // const map = this.refs.map.leafletElement;
        // map.fitBounds(e.target.getBounds());
    }

    // toggle between cases and deaths views
    changeView(e) {

        let tempColor, tempLimit;

        if(e.target.value === "cases") {
            tempColor = mapColors[0];
            tempLimit = thresholdData[0];
        } else {
            tempColor = mapColors[1];
            tempLimit = thresholdData[1];
        }

        if (e.target.className = "map-btn-outline"){
          $("#map-deaths-btn").toggleClass("map-btn-outline");
          $("#map-deaths-btn").toggleClass("map-btn");
          $("#map-cases-btn").toggleClass("map-btn-outline");
          $("#map-cases-btn").toggleClass("map-btn");
        }

        console.log("tempColor = " + tempColor);

        this.setState({
            displayed: e.target.value,
            colors: tempColor,
            limits: tempLimit
        }, function() {
            console.log(this.state);
            

            // convert values of the allMarkersMap object to an array
            let markers = Object.values(allMarkersMap);
    
            for(let i = 0; i < markers.length; i++) {
    
                let dataToDisplay;
    
                let geo_id = markers[i].feature.properties.GEO_ID;
                geo_id = geo_id.substring(geo_id.length - 5);
                // console.log(geo_id);
                geo_id = parseInt(geo_id);

                for(let j = 0; j < this.state.countyData.length; j++) {
                    // console.log(countyArray[j].state);
                    // console.log(markers[i].feature.properties.NAME);
                    if(parseInt(this.state.countyData[j].fips) == geo_id) {
                        if(this.state.displayed === "cases") {
                            console.log(this.state.countyData[j].cases);
                            dataToDisplay = this.state.countyData[j].cases;
                        } else if (this.state.displayed === "deaths") {
                            dataToDisplay = this.state.countyData[j].deaths;
                        }
                    }
                }
    
                let mark = markers[i].getPopup();
                // console.log(markers[i].feature);

                let popupContent;

                // look into why this is sometimes undefined
                if(dataToDisplay) {
                    popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                    '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` ${this.state.displayed}`;
                } else {
                    popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                    '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
                }

                mark.setContent(popupContent);
            }
        });
    }

    
    render() {
        return (
            <div>
                <div id="map-btn-container">
                  <button onClick={this.changeView} value="cases" className="map-btn" id="map-cases-btn">Cases</button>
                  <button onClick={this.changeView} value="deaths" className="map-btn-outline" id="map-deaths-btn">Deaths</button>
                </div>
                <Map
                    center={mapCenter}
                    zoom={zoomLevel}
                    ref="map"
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                    <GeoJSON
                      data={uscounties}
                      style={this.geoJSONStyle}
                      onEachFeature={this.onEachFeature}
                      onMouseOut={() => this.resetHighlight}
                      onMouseOver={() => this.highlightFeature}
                      ref="geojson"
                    />
                    <MapLegend colors={this.state.colors} limits={this.state.limits}/>
                </Map>
            </div>
          );
        }
      }
      
export default DashboardMap;