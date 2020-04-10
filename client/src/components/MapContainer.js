import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import "../App.css";
import usstates from '../assets/gz_2010_us_040_00_5m.json';
import stateData from '../assets/nytimesstate.json';


const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.82,-98.57];
const zoomLevel = 4;



//console.log(usstates);
let todayDate = "2020-04-08";

let todayArray = [];
for(let i = 0; i < stateData.length; i++) {
	if(stateData[i].date == todayDate) {
		todayArray.push(stateData[i]);
	}
}
console.log(todayArray);

class MapContainer extends Component {



    geoJSONStyle() {
        return {
          color: '#1f2021',
          weight: 1,
          fillOpacity: 0.5,
          fillColor: "#66c2a4",
        }
    }
    
    // setColor() {
    //     // console.log("*** setting colors");
    //     // console.log(data);
    //     let stateData = parseInt(data);
    //     let thresholds;
    
    
    //     // console.log(dataDisplayed);
    
    //     if(dataDisplayed == "cases") {
    //         // console.log("made it to cases");
    //         thresholds = thresholdData[0];
    //         mapClr = mapColors[0];
    //     } else {
    //         // console.log("made it to deaths");
    //         thresholds = thresholdData[1];
    //         mapClr = mapColors[1];
    //     }
    
    
    
    //     if (stateData > thresholds[0]) {
    //         return mapClr[0];
    //     } else if (stateData > thresholds[1]) {
    //         return mapClr[1];
    //     } else if (stateData > thresholds[2]) {
    //         return mapClr[2];
    //     } else if (stateData > thresholds[3]) {
    //         return mapClr[3];
    //     } else if (stateData > thresholds[4]) {
    //         return mapClr[4];
    //     } else if (stateData > thresholds[5]) {
    //         return mapClr[5];
    //     } else {
    //         return mapClr[6];
    //     }
    // }

    
      onEachFeature(feature: Object, layer: Object) {
        const popupContent = ` <Popup><p>Customizable Popups <br />with feature information.</p><pre>Borough: <br />${feature.properties.name}</pre></Popup>`;
        layer.bindPopup(popupContent);
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
                    />
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
            </div>
          );
        }
      }
      
export default MapContainer;