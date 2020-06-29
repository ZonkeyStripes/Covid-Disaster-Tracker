import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON, MapControl } from "react-leaflet";
import { Icon } from "leaflet";
import "../App.css";
import uscounties from '../assets/gz_2010_us_050_00_5m.json';
// import countyData from '../assets/nytimescounties.json';
import countyLatLong from '../assets/county_latlong.json';
import statefips from "../assets/statefips.json";
import L from 'leaflet';
import MapInfo from "./MapInfo";
import MapLegend from "./MapLegend";
import newId from '../utils/newid';




const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.82,-98.57];
let zoomLevel = 5;

// console.log(countyData);
// let todayDate = "2020-04-26";

// let countyArray = [];
// for(let i = 0; i < countyData.length; i++) {
// 	if(countyData[i].date === todayDate) {
// 		countyArray.push(countyData[i]);
// 	}
// }

// console.log(countyArray);

const mapColors = [
    ["#034e7b", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#f1eef6"],
    ["#b10026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffffb2"],
    ['#005824', '#238b45', '#41ae76', '#66c2a4', '#99d8c9', '#ccece6', '#edf8fb'],
    ['#990000', '#d7301f', '#ef6548', '#fc8d59', '#fdbb84', '#fdd49e', '#fef0d9']
]

const thresholdData = [
    [10000, 500, 200, 100, 50, 10],
    [200, 100, 50, 25, 10, 5]
];

// let allMarkersMap = {};
// let currentID = 0;



class DisasterMap extends Component {

    constructor(props) {

        super(props);
        this.state = {
            fips: props.fips,
            displayed: "cases",
            colors: mapColors[0],
            limits: thresholdData[0],
            mapCenter: [39.82,-98.57],
            mapZoom: 7,
            disasterList: []
        };

        // ES6 React.Component doesn't auto bind methods to itself
        // Need to bind them manually in constructor
        this.geoJSONStyle = this.geoJSONStyle.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);

    }


    componentDidMount() {
        console.log("Component did mount");
        console.log(this.props);

        this.id = newId();

        let mapCtr = [];
        let zoom = 7;

        // if we have a fips code for county, get the Lat and Long for that county
        if(this.props.fips) {
            for(let index = 0; index < countyLatLong.length; index++) {
                if(countyLatLong[index].FIPS == this.props.fips) {
                    console.log("found " + countyLatLong[index].COUNTYNAME + "county");
                    mapCtr.push(countyLatLong[index].LAT);
                    mapCtr.push(countyLatLong[index].LON);
                }
            }
        } else if (this.props.lat) {
            // else if we have a lat and long passed in (from a state), use that
            console.log(this.props.lat);
            mapCtr.push(this.props.lat);
            mapCtr.push(this.props.long);
            zoom = 5;
        } else {
            // otherwise use the geographic center of the US
            mapCtr = [39.82,-98.57];
            zoom = 4;
        }


        console.log(mapCtr);

        this.setState({mapCenter: mapCtr, mapZoom: zoom, disasterList: this.props.disasters});

    }

    geoJSONStyle(feature) {

        // console.log("feature.properties looks like:");
        // console.log(feature.properties);

        let colorResult = this.state.colors[6];

        if(this.props.USstate) {
            let geo_id = feature.properties.GEO_ID;
            geo_id = geo_id.substring(geo_id.length - 5);
            let state_fips = geo_id.substring(0, 2)
            
            let stateName = "";
            statefips.forEach(sta => {
                if(sta.FIPS == state_fips) {
                    stateName = sta.Name;
                }
            })

            if(stateName == this.props.USstate) {
                colorResult = this.state.colors[3];
            }
        }





        // if(stateName = this.state.)

        // if (displayData > this.state.limits[0]) {
        //     colorResult = this.state.colors[0];
        // } else if (displayData > this.state.limits[1]) {
        //     colorResult = this.state.colors[1];
        // } else if (displayData > this.state.limits[2]) {
        //     colorResult = this.state.colors[2];
        // } else if (displayData > this.state.limits[3]) {
        //     colorResult = this.state.colors[3];
        // } else if (displayData > this.state.limits[4]) {
        //     colorResult = this.state.colors[4];
        // } else if (displayData > this.state.limits[5]) {
        //     colorResult = this.state.colors[5];
        // } else {
        //     colorResult = this.state.colors[6];
        // }

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
        // let dataToDisplay;
    
        // let geo_id = feature.properties.GEO_ID;
        // geo_id = geo_id.substring(geo_id.length - 5);
        // geo_id = parseInt(geo_id);

        // // console.log("this.state.fips = " + this.state.fips);

        // for(let j = 0; j < countyArray.length; j++) {
        //     // console.log(countyArray[j].state);
        //     // console.log(markers[i].feature.properties.NAME);
        //     if(parseInt(countyArray[j].fips) == geo_id) {
        //         if(this.state.displayed === "cases") {
        //             dataToDisplay = countyArray[j].cases;
        //         } else if (this.state.displayed === "deaths") {
        //             dataToDisplay = countyArray[j].deaths;
        //         }
        //     }

            // if(countyArray[j].fips == this.state.fips) {
            //     console.log("Found the county!!")
            //     console.log(countyArray[j]);
            //     console.log(this);
            //     let sizeMap = this.refs.map.leafletElement;
            //     // sizeMap.fitBounds()
            //     //this.fitBounds(this.getBounds());
            // }

        // }

        // const popupContent = `<h4>COVID-19 ${this.state.displayed} data</h4>` +
		// 	'<b>' + feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${this.state.displayed}`;
        // let marker = layer.bindPopup(popupContent);
        
        // // console.log(marker);
        // allMarkersMap[currentID] = marker;
        // currentID += 1;

        layer.on({
            mouseover: this.highlightFeature.bind(this),
            mouseout: this.resetHighlight.bind(this),
            click: this.zoomToFeature.bind(this)
        });
      }

    // mouseover a specific state - highlight it
    highlightFeature(e) {
        let layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    }

    // remove highlight on mouseout
    resetHighlight(e) {
        let layer = e.target;

        this.refs.geojson.leafletElement.resetStyle(e.target);
    }

    zoomToFeature(e) {
        const map = this.refs.map.leafletElement;
        map.fitBounds(e.target.getBounds());
    }

    
    render() {
        
        let test = "";

        // if there are disasters passed in as props, put markers on the map for them
        if(this.props.disasters) {

            let markers = [];

            this.props.disasters.forEach(el => {
                let str = el.declaredCountyArea;
                let i = str.indexOf('(');
                let tempArr = [];
                str = str.substring(0, i - 1);
                // console.log(str);

                let stateStr = el.state;
                countyLatLong.forEach(county => {
                    if(county.STATE == stateStr && county.COUNTYNAME == str){
                        // console.log("MATCH");
                        tempArr.push(county.LAT);
                        tempArr.push(county.LON);
                        tempArr.push(el.declaredCountyArea);
                        tempArr.push(el.declarationDate.substring(0,10));
                        tempArr.push(el.incidentType);
                        tempArr.push(el.title);
                        markers.push(tempArr);
                    }
                })
                // console.log(markers);
            })

            test = markers.map((marker, index) => (<Marker key={index} position={[marker[0], marker[1]]}>
                <Popup>
                    <strong>{marker[4]}: {marker[2]}</strong>
                    <br/>
                    {marker[5]}
                    <br />
                    {marker[3]}
                </Popup>
            </Marker>))
        }


        return (
            <div>
                <div>

                    <Map
                        center={this.state.mapCenter}
                        zoom={this.state.mapZoom}
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
                        {test}
                        {/* <MapInfo /> */}
                        {/* <MapLegend colors={this.state.colors} limits={this.state.limits}/> */}
                    </Map>
                </div>
            </div>
          );
        }
      }
      
export default DisasterMap;