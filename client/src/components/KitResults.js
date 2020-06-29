import React, { Component } from "react";
import FlipMove from 'react-flip-move';
import "../App.css";

class KitResults extends Component {

  constructor(props) {
    super(props);
    console.log(props)
  }

  sendData = (e) => {
    let disasterType = e.target.value;
    let itemArray = [];
    switch(disasterType) {
      case "Biological":
        itemArray.push("Masks (Cloth or disposable)");
        itemArray.push("Sanitizer");
        itemArray.push("Thermometer");
        itemArray.push("Pulse Oximeter");
        break;
      case "Coastal Storm":
        itemArray.push("Rain gear");
        itemArray.push("Important documents - waterproof container");
        itemArray.push("Cooking fuel");
        break;
      case "Dam/Levee Break":
        itemArray.push("Evacuation plan");
        break;
      case "Earthquake":
        itemArray.push("Evacuation plan");
        itemArray.push("Cash");
        break;
      case "Fire":
        itemArray.push("Evacuation plan");
        itemArray.push("Important documents - fireproof container");
        break;
      case "Flood":
        itemArray.push("Rain gear");
        itemArray.push("Important documents - waterproof container");
        itemArray.push("Evacuation plan");
        break;
      case "Severe Storm(s)":
        itemArray.push("Rain gear");
        itemArray.push("Important documents - waterproof container");
        itemArray.push("Cooking fuel");
        break;
      case "Tornado":
        itemArray.push("Protective clothing (including gloves");
        break;
      default:
    }
    this.props.parentCallback(itemArray);
}

  pickIcon() {

  }

  render() {

    return (
    <div >
        {this.props.DisasterDeclarationsSummaries.map(result => 
          <div className="mt-4"> 
            <FlipMove duration={1500} easing="ease-in-out">
            <h3 style={{textAlign:'center', textSizeAdjust: '15px', color: 'black'}}>{result.title}</h3>
            <p style={{textAlign:'center', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'black'}}>Declared Disaster: {result.incidentType}</p>
            <p style={{textAlign:'center', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'black'}}>Declared Year: {result.fyDeclared}</p>
            <p style={{textAlign:'center', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'black'}}>Declared County: {result.declaredCountyArea}</p>
            <p style={{textAlign:'center', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'black'}}>Declared State: {result.state}</p>
            <div className="whatever">
              <button className="btn btn-secondary" value={result.incidentType} onClick={this.sendData} style={{ margin: '5px', backgroundcolor: '#333', border: '1px solid #f6f6f6', borderradius: '40px', outline: 'none' }}>Add {result.incidentType} Items to Kit</button>
            </div>
            </FlipMove>
          </div>
        )}
      </div>
    );
  }
}

export default KitResults;