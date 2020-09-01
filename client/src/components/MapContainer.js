import React, { Component } from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "../App.css";
import usstates from '../assets/gz_2010_us_040_00_5m.json';
import stateData from '../assets/nytimesstate.json';
import MapLegend from "./MapLegend";
import Tables from "./Tables";
import $ from "jquery";
import Axios from "axios";
import stateAbbr from "../utils/stateAbbr";
import * as Constants from "../constants";


const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.82,-98.57];
const zoomLevel = 4;


const mapColors = [
    ["#034e7b", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#f1eef6"],
    ['#005824', '#238b45', '#41ae76', '#66c2a4', '#99d8c9', '#ccece6', '#edf8fb'],
    ["#b10026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffffb2"],
    ['#990000', '#d7301f', '#ef6548', '#fc8d59', '#fdbb84', '#fdd49e', '#fef0d9']
];

const thresholdData = [
    [250000, 50000, 25000, 10000, 5000, 500],
    [5000, 2000, 1000, 500, 250, 100]
];

let allMarkersMap = {};
let currentID = 0;

//console.log(todayArray);

class MapContainer extends Component {

    constructor(props) {
        super(props);

        let todayDate = Constants.LASTUPDATED;

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
        
        console.log(todayArray);

        let casesArray = [];
        let deathsArray = [];
        for(let i = 0; i < todayArray.length; i++) {
          casesArray.push({state: todayArray[i].state, data: todayArray[i].cases})
          deathsArray.push({state: todayArray[i].state, data: todayArray[i].deaths})
        };


        this.state = {
            displayed: "cases",
            mapOpen: true,
            tableOpen: true,
            colors: mapColors[0],
            limits: thresholdData[0],
            total: totalCases,
            displayList: casesArray,
            todayDate: Constants.LASTUPDATED,
            todayArray: todayArray,
            totalCases: totalCases,
            totalDeaths: totalDeaths,
            casesArray: casesArray,
            deathsArray: deathsArray
        };

        // ES6 React.Component doesn't auto bind methods to itself
        // Need to bind them manually in constructor
        this.geoJSONStyle = this.geoJSONStyle.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
        this.componentDidMount = this.componentDidMount(this);
        //this.highlightFeature.bind(this)

    }
    
    componentDidMount() {

      Axios.get("https://api.covidtracking.com/v1/states/current.json")
      .then(res => {
        console.log(res);
        let newTodayArray = [];

        let totalCases = 0;
        let totalDeaths = 0;

        res.data.forEach(state => {
          let newObj = {};
          // console.log(state);
          newObj.cases = state.positive;
          newObj.deaths = state.death;
          newObj.fips = state.fips;
          newObj.state = stateAbbr.convertRegion(state.state, 1);
          newObj.date = this.state.todayDate;
          newTodayArray.push(newObj);
          totalCases += state.positive;
          totalDeaths += state.death;
        })
        console.log(newTodayArray);

        let casesArray = [];
        let deathsArray = [];
        for(let i = 0; i < newTodayArray.length; i++) {
          casesArray.push({state: newTodayArray[i].state, data: newTodayArray[i].cases})
          deathsArray.push({state: newTodayArray[i].state, data: newTodayArray[i].deaths})
        };

        this.setState({
          todayArray: newTodayArray,
          casesArray: casesArray,
          deathsArray: deathsArray,
          totalCases: totalCases,
          totalDeaths: totalDeaths
        }, function() { 
          console.log(this.state.todayArray);
          this.setState({ state: this.state });
        });
      })
      .catch((err) => {
        console.log(err);
      })
    }


    componentDidUpdate() {
      if(this.state.displayed === "cases" && 
      this.state.total !== this.state.totalCases) {
        // console.log("total isn't matching correctly");
        this.setState({ 
          total: this.state.totalCases,
          displayList: this.state.casesArray
         }, () => {
          let markers = Object.values(allMarkersMap);
        
          for(let i = 0; i < markers.length; i++) {
            let dataToDisplay;

            for(let j = 0; j < this.state.todayArray.length; j++) {
                // console.log(todayArray[j].state);
                // console.log(markers[i].feature.properties.NAME);
                if(this.state.todayArray[j].state == markers[i].feature.properties.NAME) {
                    if(this.state.displayed === "cases") {
                        dataToDisplay = this.state.todayArray[j].cases;
                    } else if (this.state.displayed === "deaths") {
                        dataToDisplay = this.state.todayArray[j].deaths;
                    }
                }
            }

            // console.log(`this.state.displayed = ${this.state.displayed}`);
            // console.log("dataToDisplay is " + dataToDisplay);


            let mark = markers[i].getPopup();
            // console.log(markers[i].feature);
            if(dataToDisplay) {
              const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
              '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` ${this.state.displayed}`;
              mark.setContent(popupContent);
            }
        }
      })
      console.log(this.state.todayArray);
    }
  }

    geoJSONStyle(feature) {
        let covidCases = 0;
        let covidDeaths = 0;
        let displayData;
    
        for(let i = 0; i < this.state.todayArray.length; i++) {
            if(parseInt(this.state.todayArray[i].fips) === parseInt(feature.properties.STATE)) {
                covidCases = this.state.todayArray[i].cases;
                covidDeaths = this.state.todayArray[i].deaths;
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
        //console.log("onEachFeature");
        // console.log(feature.properties);
        // console.log(this.state.displayed)
        let dataToDisplay;

        for(let i = 0; i < this.state.todayArray.length; i++) {
            if(this.state.todayArray[i].state === feature.properties.NAME) {
                if(this.state.displayed === "cases") {
                    dataToDisplay = this.state.todayArray[i].cases;
                } else if (this.state.displayed === "deaths") {
                    dataToDisplay = this.state.todayArray[i].deaths;
                }
            }
        }

      // console.log(dataToDisplay);
      if(dataToDisplay) {
        const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
        '<b>' + feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` ${this.state.displayed}`;
          let marker = layer.bindPopup(popupContent);

                  // console.log(marker);
        allMarkersMap[currentID] = marker;
        currentID += 1;
      }

        


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
    }

    resetHighlight(e) {
        this.refs.geojson.leafletElement.resetStyle(e.target);
    }

    zoomToFeature(e) {
        // map.fitBounds(e.target.getBounds());
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
                total: this.state.totalCases,
                displayList: this.state.casesArray
            }, function() {            
                // convert values of the allMarkersMap object to an array
                let markers = Object.values(allMarkersMap);
        
                for(let i = 0; i < markers.length; i++) {
                    let dataToDisplay;
        
                    for(let j = 0; j < this.state.todayArray.length; j++) {
                        // console.log(todayArray[j].state);
                        // console.log(markers[i].feature.properties.NAME);
                        if(this.state.todayArray[j].state == markers[i].feature.properties.NAME) {
                            if(this.state.displayed === "cases") {
                                dataToDisplay = this.state.todayArray[j].cases;
                            } else if (this.state.displayed === "deaths") {
                                dataToDisplay = this.state.todayArray[j].deaths;
                            }
                        }
                    }
        
                    // console.log(`this.state.displayed = ${this.state.displayed}`);
                    // console.log("dataToDisplay is " + dataToDisplay);
        
    
                    let mark = markers[i].getPopup();
                    // console.log(markers[i].feature);

                    if(dataToDisplay) {
                      const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                      '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` ${this.state.displayed}`;
                      mark.setContent(popupContent);
                    }

                    
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
                total: this.state.totalDeaths,
                displayList: this.state.deathsArray
            }, function() {            
                // convert values of the allMarkersMap object to an array
                let markers = Object.values(allMarkersMap);
        
                for(let i = 0; i < markers.length; i++) {
                    let dataToDisplay;
        
                    for(let j = 0; j < this.state.todayArray.length; j++) {
                        // console.log(todayArray[j].state);
                        // console.log(markers[i].feature.properties.NAME);
                        if(this.state.todayArray[j].state == markers[i].feature.properties.NAME) {
                            if(this.state.displayed === "cases") {
                                dataToDisplay = this.state.todayArray[j].cases;
                            } else if (this.state.displayed === "deaths") {
                                dataToDisplay = this.state.todayArray[j].deaths;
                            }
                        }
                    }
        
                    // console.log(`this.state.displayed = ${this.state.displayed}`);
                    // console.log("dataToDisplay is " + dataToDisplay);
        
    
                    let mark = markers[i].getPopup();
                    // console.log(markers[i].feature);
                    if(dataToDisplay) {
                      const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
                      '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` ${this.state.displayed}`;
                      mark.setContent(popupContent);
                    }

                    
                }
            });
        }
    }

    toggleMapDisplay = () => {
      if (this.state.mapOpen){
        $("#map-container").hide();
        $("#map-collapse-icon").css("transform", "rotate(90deg)");
        $("#map-header").css("padding-top", "5px");
        $(".map-title-sect").css("padding-left", "5px");
        $(".map-title-sect").css("border", "1px solid rgba(0, 0, 0, .125");
        $(".map-title-sect").css("border-radius", "0.25rem");
        this.setState({
          mapOpen: false
        });
      } else {
        $("#map-collapse-icon").css("transform", "rotate(0deg)");
        $("#map-header").css("padding-top", "0");
        $(".map-title-sect").css("padding-left", "0");
        $(".map-title-sect").css("border", "none");
        $("#map-container").show();
        this.setState({
          mapOpen: true
        });
      }
    }

    toggleTableDisplay = () => {
      if (this.state.tableOpen){
        $("#table-collapse-icon").css("transform", "rotate(90deg)");
        $(".table-responsive").css("overflow-y", "hidden");
        $(".table-responsive").css("max-height", "0px");
        $("#cases-btn").hide();
        $("#deaths-btn").hide();
        $("#table-header").css("visibility", "initial");
        $("#table-header").css("margin-right", "0");
        $("#table-header").css("margin-left", "0");
        $("#table-header").css("padding-top", "5px");
        this.setState({
          tableOpen: false
        });
      } else {
        $("#table-collapse-icon").css("transform", "rotate(0deg)");
        $(".table-responsive").css("overflow-y", "scroll");
        $(".table-responsive").css("max-height", "460px");
        $("#cases-btn").show();
        $("#deaths-btn").show();
        $("#table-header").css("visibility", "hidden");
        $("#table-header").css("padding", "0");
        this.setState({
          tableOpen: true
        });
      }
    }
    
    render() {
        return (
            <div id="map-stuff" className="row">
              <div className="col-md-8">
                <div className="map-title-sect">
                  <h5 id="map-header">COVID-19 Severity By State</h5>
                  <i onClick={this.toggleMapDisplay} id="map-collapse-icon" className="fas fa-chevron-down chart-toggle-icon"/>
                </div>
                <div id="map-container">
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
              </div>

              <div className="col-md-4">
                <div className="card table-container">
                  <div className="chart-title-sect">
                    <h5 id="table-header">Nationwide totals</h5>
                    <i onClick={this.toggleTableDisplay} id="table-collapse-icon" className="fas fa-chevron-down chart-toggle-icon"/>
                  </div>
                  <div className="d-flex table-content">
                    <div className="input-group" id="table-btn-container">
                    <div className="input-group-prepend">
                      <button onClick={this.displayCases} id="cases-btn" className="btn table-btn">Cases</button>
                    </div>
                    <div className="input-group-append">
                      <button onClick={this.displayDeaths} id="deaths-btn" className="btn table-btn-outline">Deaths</button>
                    </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <Tables
                      displayed = {this.state.displayed}
                      total = {this.state.total}
                      displayList = {this.state.displayList}
                      cases = {this.state.totalCases}
                      deaths = {this.state.totalDeaths}
                      casesArr = {this.state.casesArray}
                      deathsArr = {this.state.deathsArray}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
      
export default MapContainer;