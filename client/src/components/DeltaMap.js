import React, { Component } from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "../App.css";
import usstates from '../assets/gz_2010_us_040_00_5m.json';
//import stateData from '../assets/nytimesstate.json';
import MapLegend from "./MapLegend";
import DeltaTable from "./DeltaTable";
import $ from "jquery";
import previousDate from "../utils/previousDate";
import Axios from "axios";


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
    [2500, 500, 250, 100, 50, 5],
    [100, 50, 35, 25, 10, 5]
];

let allMarkersMap = {};
let currentID = 0;

//console.log(todayArray);

class DeltaMap extends Component {

    constructor(props) {
        super(props);

        let todayDate = "";
        let yesterdayDate = "";

        let totalNewCases = 0;
        let totalNewDeaths = 0;
        
        let todayArray = [];
        let yesterdayArray = [];
        let deltaObjectsArray = [];
        let casesArray = [];
        let deathsArray = [];

        // for(let i = 0; i < todayArray.length; i++) {
        //   casesArray.push({state: todayArray[i].state, data: todayArray[i].cases})
        //   deathsArray.push({state: todayArray[i].state, data: todayArray[i].deaths})
        // };


        this.state = {
            displayed: "cases",
            mapOpen: true,
            tableOpen: true,
            colors: mapColors[0],
            limits: thresholdData[0],
            total: totalNewCases,
            displayList: casesArray,
            todayDate: todayDate,
            prevDate: yesterdayDate,
            todayArray: todayArray,
            prevArray: yesterdayArray,
            totalCases: totalNewCases,
            totalDeaths: totalNewDeaths,
            casesArray: casesArray,
            deathsArray: deathsArray,
            deltaArray: deltaObjectsArray
        };

        // ES6 React.Component doesn't auto bind methods to itself
        // Need to bind them manually in constructor
        this.geoJSONStyle = this.geoJSONStyle.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
        this.componentDidMount = this.componentDidMount(this);
        this.setPopUps = this.setPopUps.bind(this);
        //this.highlightFeature.bind(this)

    }
    
    componentDidMount() {
      // get the latest date of data stored in the DB
      Axios.get("/api/state_latest_date/")
      .then(dateRes => {
        let latestDate = dateRes.data[0].date;
        console.log(latestDate);
        //calculate previous date
        let prevDate = previousDate.previousDate(latestDate);
        console.log(prevDate);

        // get data from latest day stored in DB
        Axios.get("/api/state_data/" + latestDate)
        .then(todayData => {
          let currentData = todayData.data;

          console.log(currentData);

          // get data from previous day stored in DB
          Axios.get("/api/state_data/" + prevDate)
          .then(prevData => {
            let previousData = prevData.data;

            // create array for the change in cases and deaths from day to day
            let deltaObjectsArray = [];

            for(let i = 0; i < currentData.length; i++) {
              for(let j = 0; j < previousData.length; j++) {
                  if(parseInt(currentData[i].fips) === parseInt(previousData[j].fips)) {
                      // console.log(currentData[i]);
                      // console.log(previousData[j]);
                      let newObj = {};
                      newObj.state = currentData[i].state;
                      newObj.fips = currentData[i].fips;
                      newObj.date1 = previousData[j].date;
                      newObj.date2 = currentData[i].date;
                      newObj.cases1 = previousData[j].cases;
                      newObj.deaths1 = previousData[j].deaths;
                      newObj.cases2 = currentData[i].cases;
                      newObj.deaths2 = currentData[i].deaths;
                      newObj.deltaCases = currentData[i].cases - previousData[j].cases;
                      newObj.deltaDeaths = currentData[i].deaths - previousData[j].deaths;
                      deltaObjectsArray.push(newObj);
                  }
              }
          }
  
          console.log(deltaObjectsArray);

          let casesArray = [];
          let deathsArray = [];
          
          // process data totals to setState with
          let totalCases = 0;
          let totalDeaths = 0;
          
          for(let i = 0; i < deltaObjectsArray.length; i++) {
            totalCases += deltaObjectsArray[i].deltaCases;
            totalDeaths += deltaObjectsArray[i].deltaDeaths;
          }

          for(let i = 0; i < currentData.length; i++) {
            casesArray.push({state: currentData[i].state, data: currentData[i].cases});
            deathsArray.push({state: currentData[i].state, data: currentData[i].deaths});
          };

          console.log(casesArray);
          console.log(deathsArray);

          this.setState({
            total: totalCases,
            displayList: casesArray,
            todayDate: latestDate,
            prevDate: prevDate,
            todayArray: currentData,
            prevArray: previousData,
            totalCases: totalCases,
            totalDeaths: totalDeaths,
            casesArray: casesArray,
            deathsArray: deathsArray,
            deltaArray: deltaObjectsArray
          },
          this.setPopUps)


          })
        })
      })
    }

    setPopUps() {
      // convert values of the allMarkersMap object to an array
      let markers = Object.values(allMarkersMap);

      for(let i = 0; i < markers.length; i++) {
          let dataToDisplay;

          for(let j = 0; j < this.state.deltaArray.length; j++) {
              // console.log(todayArray[j].state);
              // console.log(markers[i].feature.properties.NAME);
              if(this.state.deltaArray[j].state == markers[i].feature.properties.NAME) {
                  if(this.state.displayed === "cases") {
                      dataToDisplay = this.state.deltaArray[j].deltaCases;
                  } else if (this.state.displayed === "deaths") {
                      dataToDisplay = this.state.deltaArray[j].deltaDeaths;
                  }
              }
          }

          // console.log(`this.state.displayed = ${this.state.displayed}`);
          // console.log("dataToDisplay is " + dataToDisplay);


          let mark = markers[i].getPopup();
          // console.log(markers[i].feature);

          if(dataToDisplay) {
            const popupContent = `<h4>New COVID-19 ${this.state.displayed}</h4>` +
            '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` new ${this.state.displayed}`;
            mark.setContent(popupContent);
          }
      }
    }

    geoJSONStyle(feature) {
        let caseChange = 0;
        let deathChange = 0;
        let displayData;
    
        for(let i = 0; i < this.state.todayArray.length; i++) {
            if(parseInt(this.state.todayArray[i].fips) === parseInt(feature.properties.STATE)) {
                for(let j = 0; j < this.state.prevArray.length; j++) {
                    if(parseInt(this.state.prevArray[j].fips) === parseInt(feature.properties.STATE)) {
                        caseChange = this.state.todayArray[i].cases - this.state.prevArray[j].cases;
                        deathChange = this.state.todayArray[i].deaths - this.state.prevArray[j].deaths;
                    }
                }

            }
        }

        // console.log("case delta " + caseChange);
        // console.log("death delta " + deathChange);
 
        if(this.state.displayed === "cases") {
            // console.log("made it to cases");
            //thresholds = thresholdData[0];
            // mapClr = mapColors[0];
            displayData = caseChange;
        } else {
            // console.log("made it to deaths");
            // thresholds = thresholdData[1];
            // mapClr = mapColors[1];
            displayData = deathChange;
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
        console.log("onEachFeature");
        // console.log(feature.properties);
        // console.log(this.state.displayed)
        let dataToDisplay;

        console.log(this.state);
        console.log(this.state.todayArray);

        for(let i = 0; i < this.state.todayArray.length; i++) {
            if(parseInt(this.state.todayArray[i].fips) === parseInt(feature.properties.STATE)) {
                for(let j = 0; j < this.state.prevArray.length; j++) {
                    if(parseInt(this.state.prevArray[j].fips) === parseInt(feature.properties.STATE)) {
                        if(this.state.displayed === "cases") {
                            dataToDisplay = this.state.todayArray[i].cases - this.state.prevArray[j].cases;
                        } else if (this.state.displayed === "deaths") {
                            dataToDisplay = this.state.todayArray[i].deaths - this.state.prevArray[j].deaths;
                        }
                    }
                }
            }
        }



      console.log(dataToDisplay);
      // if(dataToDisplay) {
        const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
        '<b>' + feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
          let marker = layer.bindPopup(popupContent);

                  // console.log(marker);
        allMarkersMap[currentID] = marker;
        currentID += 1;
      // }

        


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

    // switch map display from deaths to cases
    displayCases = () => {
        if(this.state.displayed == "deaths") {

            // toggle which button is selected
            $("#cases-btn").toggleClass("table-btn");
            $("#cases-btn").toggleClass("table-btn-outline");
            $("#deaths-btn").toggleClass("table-btn");
            $("#deaths-btn").toggleClass("table-btn-outline");

            // sort deltaArray by cases
            let sortedArr = this.state.deltaArray.sort((a, b) => (a.deltaCases < b.deltaCases) ? 1 : (a.deltaCases === b.deltaCases) ? ((a.state > b.state) ? 1 : -1) : -1 );

            // set state
            this.setState({
                displayed: "cases",
                colors: mapColors[0],
                limits: thresholdData[0],
                total: this.state.totalCases,
                displayList: this.state.casesArray,
                deltaArray: sortedArr
            }, this.setPopUps
            
            // function() {            
            //     // convert values of the allMarkersMap object to an array
            //     let markers = Object.values(allMarkersMap);
        
            //     for(let i = 0; i < markers.length; i++) {
            //         let dataToDisplay;
        
            //         for(let j = 0; j < this.state.deltaArray.length; j++) {
            //             // console.log(todayArray[j].state);
            //             // console.log(markers[i].feature.properties.NAME);
            //             if(this.state.deltaArray[j].state == markers[i].feature.properties.NAME) {
            //                 if(this.state.displayed === "cases") {
            //                     dataToDisplay = this.state.deltaArray[j].deltaCases;
            //                 } else if (this.state.displayed === "deaths") {
            //                     dataToDisplay = this.state.deltaArray[j].deltaDeaths;
            //                 }
            //             }
            //         }
        
            //         // console.log(`this.state.displayed = ${this.state.displayed}`);
            //         // console.log("dataToDisplay is " + dataToDisplay);
        
    
            //         let mark = markers[i].getPopup();
            //         // console.log(markers[i].feature);

            //         if(dataToDisplay) {
            //           const popupContent = `<h4>New COVID-19 ${this.state.displayed}</h4>` +
            //           '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` new ${this.state.displayed}`;
            //           mark.setContent(popupContent);
            //         }
            //     }
          );
        }
    }
      
    // switch map display from cases to deaths
    displayDeaths = () => {
        console.log("hit displayDeaths");
        if(this.state.displayed == "cases") {
            console.log("entered the if statement");

            let sortedArr = this.state.deltaArray.sort((a, b) => (a.deltaDeaths < b.deltaDeaths) ? 1 : (a.deltaDeaths === b.deltaDeaths) ? ((a.state > b.state) ? 1 : -1) : -1 );  


            $("#cases-btn").toggleClass("table-btn");
            $("#cases-btn").toggleClass("table-btn-outline");
            $("#deaths-btn").toggleClass("table-btn");
            $("#deaths-btn").toggleClass("table-btn-outline");

            this.setState({
                displayed: "deaths",
                colors: mapColors[2],
                limits: thresholdData[1],
                total: this.state.totalDeaths,
                displayList: this.state.deathsArray,
                deltaArray: sortedArr
            }, function() {            
                // convert values of the allMarkersMap object to an array
                let markers = Object.values(allMarkersMap);
        
                for(let i = 0; i < markers.length; i++) {
                    let dataToDisplay;
        
                    for(let j = 0; j < this.state.deltaArray.length; j++) {
                        // console.log(todayArray[j].state);
                        // console.log(markers[i].feature.properties.NAME);
                        if(this.state.deltaArray[j].state == markers[i].feature.properties.NAME) {
                            if(this.state.displayed === "cases") {
                                dataToDisplay = this.state.deltaArray[j].deltaCases;
                            } else if (this.state.displayed === "deaths") {
                                dataToDisplay = this.state.deltaArray[j].deltaDeaths;
                            }
                        }
                    }
        
                    // console.log(`this.state.displayed = ${this.state.displayed}`);
                    // console.log("dataToDisplay is " + dataToDisplay);
        
    
                    let mark = markers[i].getPopup();
                    // console.log(markers[i].feature);
                    if(dataToDisplay) {
                      const popupContent = `<h4>New COVID-19 ${this.state.displayed}</h4>` +
                      '<b>' + markers[i].feature.properties.NAME + '</b><br />' + dataToDisplay.toLocaleString() + ` new ${this.state.displayed}`;
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

      console.log("render map");
        return (
            <div id="map-stuff" className="row">
              <div className="col-md-12">
                <div className="card delta-table-container">
                  <div className="chart-title-sect">
                    <h5 id="table-header">Table of COVID Growth</h5>
                    <i onClick={this.toggleTableDisplay} id="table-collapse-icon" class="fas fa-chevron-down chart-toggle-icon"/>
                  </div>
                  <h5>COVID-19 Spread By State</h5>
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
                    <DeltaTable
                      displayed = {this.state.displayed}
                      total = {this.state.total}
                      displayList = {this.state.displayList}
                      cases = {this.state.totalCases}
                      deaths = {this.state.totalDeaths}
                      casesArr = {this.state.casesArray}
                      deathsArr = {this.state.deathsArray}
                      fromDate = {this.state.prevDate}
                      toDate = {this.state.todayDate}
                      deltaArray = {this.state.deltaArray}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="map-title-sect">
                  <h5 id="map-header">COVID-19 Spread By State</h5>
                  <div>
                  <h5>New {this.state.displayed} from {this.state.prevDate} to {this.state.todayDate}</h5>
                  </div>
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
            </div>
          );
        }
      }
      
export default DeltaMap;