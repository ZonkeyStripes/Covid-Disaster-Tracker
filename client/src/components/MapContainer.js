import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON, MapControl } from "react-leaflet";
import { Icon } from "leaflet";
import "../App.css";
import usstates from '../assets/gz_2010_us_040_00_5m.json';
import stateData from '../assets/nytimesstate.json';
import L from 'leaflet';
import MapInfo from "./MapInfo";
import MapLegend from "./MapLegend";
import DataTable from "./DataTable";


const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.82,-98.57];
const zoomLevel = 4;



//console.log(usstates);
let todayDate = "2020-04-08";

let todayArray = [];
for(let i = 0; i < stateData.length; i++) {
	if(stateData[i].date === todayDate) {
		todayArray.push(stateData[i]);
	}
}

// let dataDisplayed = "cases";

const mapColors = [
    ["#034e7b", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#f1eef6"],
    ['#005824', '#238b45', '#41ae76', '#66c2a4', '#99d8c9', '#ccece6', '#edf8fb'],
    ['#990000', '#d7301f', '#ef6548', '#fc8d59', '#fdbb84', '#fdd49e', '#fef0d9']
]

let mapClr = mapColors[0];

const thresholdData = [
    [100000, 5000, 2000, 1000, 500, 100],
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
            limits: thresholdData[0]
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
                if(this.state.displayed == "cases") {
                    dataToDisplay = todayArray[i].cases;
                } else if (this.state.displayed == "deaths") {
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
        // console.log("mouseout");
        let layer = e.target;

        // layer.setStyle({
        //     weight: 1,
        //     color: '#666',
        //     dashArray: '',
        //     fillOpacity: 0.7
        // });
        this.refs.geojson.leafletElement.resetStyle(e.target);
        // layer.resetStyle();
        // info.update();
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

    
    render() {
        return (
            <div>
              <div>
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
                    <MapInfo />
                    <MapLegend colors={this.state.colors} limits={this.state.limits}/>
                </Map>
            </div>
                
                <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" value="cases" defaultChecked onClick={this.changeView}/>
                    <label className="custom-control-label" htmlFor="customRadio1">Cases</label>
                </div>
                <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" value="deaths" onClick={this.changeView}/>
                    <label className="custom-control-label" htmlFor="customRadio2">Deaths</label>
                </div>
                <DataTable data={todayArray}/>
            </div>
          );
        }
      }
      

    // class Legend extends MapControl {
    //     componentDidMount() {
    //         var div = L.DomUtil.create('div', 'info legend'),
    //         grades = [0, 10, 50, 100, 200, 500, 1000],
    //         labels = [];

    //         // loop through our density intervals and generate a label with a colored square for each interval
    //         for (var i = 0; i < grades.length; i++) {
	// 	    div.innerHTML +=
	// 		'<i style="background:' + this.getColor(grades[i] + 1) + '"></i> ' +
    //         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    //        }
           
    //         const legend = L.control({ position: "bottomright" });
     
    //         const { map } = this.props.leaflet;
    //         legend.addTo(map);

    //        return div;
    //     }

        // getColor(d) {
        //     return d > 1000 ? mapClr[0] :
        //            d > 500  ? mapClr[1] :
        //            d > 200  ? mapClr[2] :
        //            d > 100  ? mapClr[3] :
        //            d > 50   ? mapClr[4] :
        //            d > 10   ? mapClr[5] :
        //                mapClr[6];
        // }

        // has to be here to avoid error
    //     createLeafletElement () {}
    // }


export default MapContainer;