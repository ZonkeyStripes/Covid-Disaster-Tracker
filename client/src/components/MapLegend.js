import React, { Component } from "react";
import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";

class MapLegend extends MapControl {
  constructor(props, context) {
    super(props);
    console.log("props in MapLegend = ");
    console.log(props);

    var div = L.DomUtil.create('div', 'info legend'),
    //grades = [0, 10, 50, 100, 200, 500, 1000],
    labels = [];

    let grades = props.limits;

    // loop through our density intervals and generate a label with a colored square for each interval
    // for (var i = 0; i < grades.length; i++) {
    //     this.panelDiv.innerHTML +=
    //     '<i style="background:' + this.getColor(grades[i] + 1) + '"></i> ' +
    //     grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    // }

    props.leaflet.map.addOneTimeEventListener("mousemove", ev => {
    //   this.panelDiv.innerHTML = `<h2><span>Lat: ${ev.latlng.lat.toFixed(
    //     4
    //   )}</span>&nbsp;<br><span>Lng: ${ev.latlng.lng.toFixed(4)}</span></h2>`;
        for(let i = 0; i < grades.length; i++) {
            this.panelDiv.innerHTML += '<i style="background:' + this.getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '&ndash;0');
        }


      // console.log(this.panelDiv.innerHTML);
    });
  }

  createLeafletElement(opts) {
    const MapLegend = L.Control.extend({
      onAdd: map => {
        this.panelDiv = L.DomUtil.create("div", "info legend");
        return this.panelDiv;
      }
    });
    return new MapLegend({ position: "bottomright" });
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }

  getColor(d) {
    return d > this.props.limits[0] ? this.props.colors[0] :
           d > this.props.limits[1]  ? this.props.colors[1] :
           d > this.props.limits[2]  ? this.props.colors[2] :
           d > this.props.limits[3]  ? this.props.colors[3] :
           d > this.props.limits[4]   ? this.props.colors[4] :
           d > this.props.limits[5]   ? this.props.colors[5] :
           this.props.colors[6];

    // return '#ccece6';
}

}

export default withLeaflet(MapLegend);