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

let dataDisplayed = "cases";

const mapColors = [
    ['#005824', '#238b45', '#41ae76', '#66c2a4', '#99d8c9', '#ccece6', '#edf8fb'],
    ['#990000', '#d7301f', '#ef6548', '#fc8d59', '#fdbb84', '#fdd49e', '#fef0d9']
]

let mapClr = mapColors[0];

const thresholdData = [
    [100000, 5000, 2000, 1000, 500, 100],
    [2000, 1000, 500, 250, 100, 50]
];

let thresholds = thresholdData[0];

console.log(todayArray);

class MapContainer extends Component {

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
 
        if(dataDisplayed === "cases") {
            // console.log("made it to cases");
            thresholds = thresholdData[0];
            mapClr = mapColors[0];
            displayData = covidCases;
        } else {
            // console.log("made it to deaths");
            thresholds = thresholdData[1];
            mapClr = mapColors[1];
            displayData = covidDeaths;
        }
        // console.log("***")
        // console.log(thresholds);
 
        // console.log(feature.properties);

        let colorResult;

        if (displayData > thresholds[0]) {
            colorResult = mapClr[0];
        } else if (displayData > thresholds[1]) {
            colorResult = mapClr[1];
        } else if (displayData > thresholds[2]) {
            colorResult = mapClr[2];
        } else if (displayData > thresholds[3]) {
            colorResult = mapClr[3];
        } else if (displayData > thresholds[4]) {
            colorResult = mapClr[4];
        } else if (displayData > thresholds[5]) {
            colorResult = mapClr[5];
        } else {
            colorResult = mapClr[6];
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
        // console.log("onEachFeature -------- feature properties")
        // console.log(feature.properties);
        let dataToDisplay;

        for(let i = 0; i < todayArray.length; i++) {
            if(todayArray[i].state == feature.properties.NAME) {
                if(dataDisplayed == "cases") {
                    dataToDisplay = todayArray[i].cases;
                } else if (dataDisplayed == "deaths") {
                    dataToDisplay = todayArray[i].deaths;
                }
            }
        }

        const popupContent = `<h4>COVID-19 ${dataDisplayed} data</h4>` +
			'<b>' + feature.properties.NAME + '</b><br />' + dataToDisplay + ` ${dataDisplayed}`;
        layer.bindPopup(popupContent);
        // layer.on({
        //     mouseover: this.highlightFeature,
        //     mouseout: this.resetHighlight,
        //     click: this.zoomToFeature
        // });
      }

    // mouseover a specific state
    highlightFeature(e) {
        console.log("mouseover");
        console.log(e);

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
        console.log("mouseout");
        let layer = e.target;

        layer.setStyle({
            weight: 1,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        // geojson.resetStyle(e.target);
        // info.update();
    }

    zoomToFeature(e) {
        // map.fitBounds(e.target.getBounds());
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
                    />
                    <MapInfo />
                    <MapLegend colors={mapClr} limits={thresholds}/>
                </Map>
            </div>
                
                <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" value="cases" defaultChecked />
                    <label className="custom-control-label" htmlFor="customRadio1">Cases</label>
                </div>
                <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" value="deaths" />
                    <label className="custom-control-label" htmlFor="customRadio2">Deaths</label>
                </div>
                <DataTable data={todayArray}/>
            </div>
          );
        }
      }
      

    class Legend extends MapControl {
        componentDidMount() {
            var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10, 50, 100, 200, 500, 1000],
            labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
		    div.innerHTML +=
			'<i style="background:' + this.getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
           }
           
            const legend = L.control({ position: "bottomright" });
     
            const { map } = this.props.leaflet;
            legend.addTo(map);

           return div;
        }

        getColor(d) {
            return d > 1000 ? mapClr[0] :
                   d > 500  ? mapClr[1] :
                   d > 200  ? mapClr[2] :
                   d > 100  ? mapClr[3] :
                   d > 50   ? mapClr[4] :
                   d > 10   ? mapClr[5] :
                       mapClr[6];
        }

        // has to be here to avoid error
        createLeafletElement () {}
    }


export default MapContainer;