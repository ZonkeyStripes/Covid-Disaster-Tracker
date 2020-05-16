import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import FlipMove from 'react-flip-move';

function KitResults (props) {
    console.log(props)
  return (
   <div >
      {props.DisasterDeclarationsSummaries.map(result => 
        <div> 
          <FlipMove duration={1500} easing="ease-in-out">
          <h3 style={{textAlign:'center', textSizeAdjust: '15px', color: 'black'}}>{result.title}</h3>
          <p style={{textAlign:'center', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'black'}}>Declared Disaster: {result.incidentType}</p>
          <p style={{textAlign:'center', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'black'}}>Declared Year: {result.fyDeclared}</p>
          <p style={{textAlign:'center', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'black'}}>Declared County: {result.declaredCountyArea}</p>
          <p style={{textAlign:'center', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'black'}}>Declared State: {result.state}</p>
          </FlipMove>
        </div>
      )}
    </div>
  );
}

export default KitResults;