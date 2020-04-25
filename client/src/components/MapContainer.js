import React, { Component } from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "../App.css";
import usstates from '../assets/gz_2010_us_040_00_5m.json';
import stateData from '../assets/nytimesstate.json';
import MapLegend from "./MapLegend";
import Tables from "./Tables";
import $ from "jquery";


const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.82,-98.57];
const zoomLevel = 4;



//console.log(usstates);
let todayDate = "2020-04-23";

let totalCases = 0;
let totalDeaths = 0;

let todayArray = [];
for(let i = 0; i < stateData.length; i++) {
	if(stateData[i].date === todayDate) {
    todayArray.push(stateData[i]);
    totalCases += stateData[i].cases;
    totalDeaths += stateData[i].deaths;
	}
}


let casesArray = [];
let deathsArray = [];
for(let i = 0; i < todayArray.length; i++) {
	casesArray.push({state: todayArray[i].state, data: todayArray[i].cases})
	deathsArray.push({state: todayArray[i].state, data: todayArray[i].deaths})
};

// let dataDisplayed = "cases";

const mapColors = [
    ["#034e7b", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#f1eef6"],
    ['#005824', '#238b45', '#41ae76', '#66c2a4', '#99d8c9', '#ccece6', '#edf8fb'],
    ["#b10026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffffb2"],
    ['#990000', '#d7301f', '#ef6548', '#fc8d59', '#fdbb84', '#fdd49e', '#fef0d9']
];

const thresholdData = [
    [200000, 10000, 5000, 1000, 500, 100],
    [2000, 1000, 500, 250, 100, 50]
];

let allMarkersMap = {};
let currentID = 0;


//console.log(todayArray);

class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayed: "cases",
            colors: mapColors[0],
            limits: thresholdData[0],
            total: totalCases,
            displayList: casesArray
        };

        // ES6 React.Component doesn't auto bind methods to itself
        // Need to bind them manually in constructor
        this.changeView = this.changeView.bind(this);
        this.geoJSONStyle = this.geoJSONStyle.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
        //this.highlightFeature.bind(this)

    }
    

    geoJSONStyle(feature) {
        let covidCases = 0;
        let covidDeaths = 0;
        let displayData;
    
        for(let i = 0; i < todayArray.length; i++) {
            if(parseInt(todayArray[i].fips) === parseInt(feature.properties.STATE)) {
                covidCases = todayArray[i].cases;
                covidDeaths = todayArray[i].deaths;
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
    

    
      onEachFeature(feature: Object, layer: Object) {
        // console.log("onEachFeature");
        // console.log(feature.properties);
        // console.log(this.state.displayed)
        let dataToDisplay;

        for(let i = 0; i < todayArray.length; i++) {
            if(todayArray[i].state == feature.properties.NAME) {
                if(this.state.displayed === "cases") {
                    dataToDisplay = todayArray[i].cases;
                } else if (this.state.displayed === "deaths") {
                    dataToDisplay = todayArray[i].deaths;
                }
            }
        }


        const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
			'<b>' + feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
        let marker = layer.bindPopup(popupContent);
        
        // console.log(marker);
        allMarkersMap[currentID] = marker;
        currentID += 1;

        layer.on({
            mouseover: this.highlightFeature.bind(this),
            mouseout: this.resetHighlight.bind(this),
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

        // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //     layer.bringToFront();
        // }

        // console.log("layer.feature is");
        // console.log(layer.feature);
        // info.update(layer.feature.properties);
    }

    resetHighlight(e) {
        this.refs.geojson.leafletElement.resetStyle(e.target);
    }

    zoomToFeature(e) {
        // map.fitBounds(e.target.getBounds());
    }

    changeView(e) {
        // console.log("test function");
        // console.log(e.target.value);
        // console.log(this);

        let tempColor, tempLimit;

        if(e.target.value === "cases") {
            tempColor = mapColors[0];
            tempLimit = thresholdData[0];
        } else {
            tempColor = mapColors[1];
            tempLimit = thresholdData[1];
        }

        // console.log("tempColor = " + tempColor);

        this.setState({
            displayed: e.target.value,
            colors: tempColor,
            limits: tempLimit
        }, function() {
            // console.log(this.state);
            

            // convert values of the allMarkersMap object to an array
            let markers = Object.values(allMarkersMap);
            // console.log("********* in testFunction");
            // console.log(markers);
    
            for(let i = 0; i < markers.length; i++) {
    
                let dataToDisplay;
    
                for(let j = 0; j < todayArray.length; j++) {
                    // console.log(todayArray[j].state);
                    // console.log(markers[i].feature.properties.NAME);
                    if(todayArray[j].state == markers[i].feature.properties.NAME) {
                        if(this.state.displayed === "cases") {
                            dataToDisplay = todayArray[j].cases;
                        } else if (this.state.displayed === "deaths") {
                            dataToDisplay = todayArray[j].deaths;
                        }
                    }
                }
    
                // console.log(`this.state.displayed = ${this.state.displayed}`);
                // console.log("dataToDisplay is " + dataToDisplay);
    
   
                let mark = markers[i].getPopup();
                // console.log(markers[i].feature);
                const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
                mark.setContent(popupContent);
            }
        });
    }

    displayCases = () => {
        if(this.state.displayed == "deaths") {

            $("#cases-btn").toggleClass("table-btn");
            $("#cases-btn").toggleClass("table-btn-outline");
            $("#deaths-btn").toggleClass("table-btn");
            $("#deaths-btn").toggleClass("table-btn-outline");

            this.setState({
                displayed: "cases",
                colors: mapColors[0],
                limits: thresholdData[0],
                total: totalCases,
                displayList: casesArray
            }, function() {            
                // convert values of the allMarkersMap object to an array
                let markers = Object.values(allMarkersMap);
        
                for(let i = 0; i < markers.length; i++) {
                    let dataToDisplay;
        
                    for(let j = 0; j < todayArray.length; j++) {
                        // console.log(todayArray[j].state);
                        // console.log(markers[i].feature.properties.NAME);
                        if(todayArray[j].state == markers[i].feature.properties.NAME) {
                            if(this.state.displayed === "cases") {
                                dataToDisplay = todayArray[j].cases;
                            } else if (this.state.displayed === "deaths") {
                                dataToDisplay = todayArray[j].deaths;
                            }
                        }
                    }
        
                    // console.log(`this.state.displayed = ${this.state.displayed}`);
                    // console.log("dataToDisplay is " + dataToDisplay);
        
    
                    let mark = markers[i].getPopup();
                    // console.log(markers[i].feature);
                    const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                    '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
                    mark.setContent(popupContent);
                }

                // if (display === "Deaths"){
                //     // $("#cases-btn").toggleClass("table-btn");
                //     // $("#cases-btn").toggleClass("table-btn-outline");
                //     // $("#deaths-btn").toggleClass("table-btn");
                //     // $("#deaths-btn").toggleClass("table-btn-outline");
                //     // setDisplay("Cases");
                //     // setTotal(props.cases);
                //     // setDisplayData(props.casesArr);
                // }
            });
        }
    }
      
    displayDeaths = () => {
        console.log("hit displayDeaths");
        if(this.state.displayed == "cases") {
            console.log("entered the if statement");

            $("#cases-btn").toggleClass("table-btn");
            $("#cases-btn").toggleClass("table-btn-outline");
            $("#deaths-btn").toggleClass("table-btn");
            $("#deaths-btn").toggleClass("table-btn-outline");

            this.setState({
                displayed: "deaths",
                colors: mapColors[2],
                limits: thresholdData[1],
                total: totalDeaths,
                displayList: deathsArray
            }, function() {            
                // convert values of the allMarkersMap object to an array
                let markers = Object.values(allMarkersMap);
        
                for(let i = 0; i < markers.length; i++) {
                    let dataToDisplay;
        
                    for(let j = 0; j < todayArray.length; j++) {
                        // console.log(todayArray[j].state);
                        // console.log(markers[i].feature.properties.NAME);
                        if(todayArray[j].state == markers[i].feature.properties.NAME) {
                            if(this.state.displayed === "cases") {
                                dataToDisplay = todayArray[j].cases;
                            } else if (this.state.displayed === "deaths") {
                                dataToDisplay = todayArray[j].deaths;
                            }
                        }
                    }
        
                    // console.log(`this.state.displayed = ${this.state.displayed}`);
                    // console.log("dataToDisplay is " + dataToDisplay);
        
    
                    let mark = markers[i].getPopup();
                    // console.log(markers[i].feature);
                    const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                    '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
                    mark.setContent(popupContent);
                }
            });
        }
    
        // if (display === "Cases"){
        //   $("#deaths-btn").toggleClass("table-btn");
        //   $("#deaths-btn").toggleClass("table-btn-outline");
        //   $("#cases-btn").toggleClass("table-btn");
        //   $("#cases-btn").toggleClass("table-btn-outline");
        //   setDisplay("Deaths");
        //   setTotal(props.deaths);
        //   setDisplayData(props.deathsArr);
        // }
    }


    
    render() {
        return (
            <div id="map-stuff" className="row">
                <div className="col-8">
                    <Map
                        center={mapCenter}
                        zoom={zoomLevel}
                    >
                        <TileLayer
                            attribution={stamenTonerAttr}
                            url={stamenTonerTiles}
                        />
                        <GeoJSON
                        data={usstates}
                        style={this.geoJSONStyle}
                        onEachFeature={this.onEachFeature}
                        onMouseOut={() => this.resetHighlight}
                        onMouseOver={() => this.highlightFeature}
                        ref="geojson"
                        />
                        {/* <MapInfo /> */}
                        <MapLegend colors={this.state.colors} limits={this.state.limits}/>
                    </Map>
                </div>

                <div className="col-4 px-2">
                    <div className="card">
                        <div className="d-flex my-2">
                            <div className="input-group" id="table-btn-container">
                            <div className="input-group-prepend">
                                <button onClick={this.displayCases} id="cases-btn" className="btn table-btn">Cases</button>
                            </div>
                            <div className="input-group-append">
                                <button onClick={this.displayDeaths} id="deaths-btn" className="btn table-btn-outline">Deaths</button>
                            </div>
                            </div>
                        </div>
                    <Tables
                    displayed = {this.state.displayed}
                    total = {this.state.total}
                    displayList = {this.state.displayList}
                    cases = {totalCases}
                    deaths = {totalDeaths}
                    casesArr = {casesArray}
                    deathsArr = {deathsArray}
                    />
                    </div>
                </div>  
            </div>
          );
        }
      }
      
export default MapContainer;