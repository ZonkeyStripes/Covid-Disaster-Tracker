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
          <h3 style={{textAlign:'center', textSizeAdjust: '15px', color: 'white'}}>{result.title}</h3>
          <p style={{textAlign:'center', backgroundColor: 'green', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'white'}}>Declared Disaster: {result.incidentType}</p>
          <p style={{textAlign:'center', backgroundColor: 'green', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'white'}}>Declared Year: {result.fyDeclared}</p>
          <p style={{textAlign:'center', backgroundColor: 'green', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'white'}}>Declared County: {result.declaredCountyArea}</p>
          <p style={{textAlign:'center', backgroundColor: 'green', margin: 'auto', marginLeft: '10px', marginRight: '10px', color: 'white'}}>Declared State: {result.state}</p>
          </FlipMove>
        </div>
      )}
    </div>
  );
}

export default KitResults;

{/* <CardGroup>
<Card border="secondary" style={{ width: '18rem', textAlign: 'center', fontWeight: 'bolder',  borderBottom: '1px solid #999' }}>
  <Card.Header>Search For Disasters</Card.Header>
  <Card.Body>
   <Card.Text>
        {result.incidentType}
        {result.fyDeclared}
        {result.declaredCountyArea}
        {result.state}
   </Card.Text>

  </Card.Body>
</Card>
<Card border="secondary" style={{ width: '18rem', textAlign: 'center', fontWeight: 'bolder',  borderBottom: '1px solid #999' }}>
                    <Card.Header> Disaster Essentials </Card.Header>
                    <Card.Body>
                        <Card.Title style={{ weight: 'bold', color: 'rgb(67, 153, 67)' }}>Do You Have What You Need?</Card.Title>
                        <Card.Text>
                                <KitResults DisasterDeclarationsSummaries ={this.state.data}/>
                        </Card.Text>
                    </Card.Body>
                </Card>

</CardGroup> */}
// return (
//     <ul className="list-group">
//       {props.DisasterDeclarationsSummaries.map(result => (
//         <li className="list-group-item" key= {result.title}>
//             <h1>{result.title}</h1>
//           <p>key= {result.incidentType}</p>
//           <p>key= {result.fyDeclared}</p>
//           <p>key= {result.declaredCountyArea}</p>
//           <p>key= {result.state}</p>
//         </li>
//       ))}
//     </ul>
//   );