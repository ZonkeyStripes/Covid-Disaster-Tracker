import React from "react";

function KitResults (props) {
    console.log(props)
  return (
   <div>
      {props.DisasterDeclarationsSummaries.map(result => (
        <div>
            <h1>{result.title}</h1>
          <p>key= {result.incidentType}</p>
          <p>key= {result.fyDeclared}</p>
          <p>key= {result.declaredCountyArea}</p>
          <p>key= {result.state}</p>
        </div>
      ))}
    </div>
  );
}

export default KitResults;

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