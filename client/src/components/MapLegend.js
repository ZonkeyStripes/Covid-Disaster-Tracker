import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";

class MapLegend extends MapControl {
  constructor(props, context) {
    super(props);

    this.state = {
      value: this.props.value
    };
  
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }

  componentDidUpdate(){
    // console.log("componentDidUpdate ran");
    // console.log(this.props.colors[0]);
    // console.log(this.getColor(1));
    this.panelDiv.innerHTML = '<i style="background:' + this.getColor(this.props.limits[0] + 1) + '"></i> ' +
    this.props.limits[0] + "+" + "<br>";

    for(let i = 0; i < this.props.limits.length; i++) {
      // console.log("i = " + i);
      // console.log("this.getColor(this.props.limits[i] + 1) = " + this.getColor(this.props.limits[i] + 1));
      this.panelDiv.innerHTML += '<i style="background:' + this.getColor(this.props.limits[i]) + '"></i> ' +
      this.props.limits[i] + (this.props.limits[i + 1] ? '&ndash;' + this.props.limits[i + 1] + '<br>' : '&ndash;0<br>');
    }

  }

  createLeafletElement(opts) {
    const MapLegend = L.Control.extend({
      onAdd: map => {
        this.panelDiv = L.DomUtil.create("div", "info legend");
        
        let grades = this.props.limits;

        this.panelDiv.innerHTML = '<i style="background:' + this.getColor(this.props.limits[0] + 1) + '"></i> ' +
        this.props.limits[0] + "+" + "<br>";
    
        for(let i = 0; i < this.props.limits.length; i++) {
          // console.log("i = " + i);
          // console.log("this.getColor(this.props.limits[i] + 1) = " + this.getColor(this.props.limits[i] + 1));
          this.panelDiv.innerHTML += '<i style="background:' + this.getColor(this.props.limits[i]) + '"></i> ' +
          this.props.limits[i] + (this.props.limits[i + 1] ? '&ndash;' + this.props.limits[i + 1] + '<br>' : '&ndash;0<br>');
        }
        
        return this.panelDiv;
      }
    });
    return new MapLegend({ position: "topright" });
  }

  getColor(d) {

    console.log("d = " + d);
    return d > this.props.limits[0] ? this.props.colors[0] :
           d > this.props.limits[1]  ? this.props.colors[1] :
           d > this.props.limits[2]  ? this.props.colors[2] :
           d > this.props.limits[3]  ? this.props.colors[3] :
           d > this.props.limits[4]   ? this.props.colors[4] :
           d > this.props.limits[5]   ? this.props.colors[5] :
           this.props.colors[6];
}

}

export default withLeaflet(MapLegend);