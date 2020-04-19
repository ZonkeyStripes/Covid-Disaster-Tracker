import React from 'react';
import {Pie} from "react-chartjs-2";

const CountyPieChartT = (props) => {
  // if (props.stateName === "Delaware"){
  //   return <h3>No county data available</h3>
  // }
  console.log(props);
  let cbcn = props.stateAvgs.casesByCountyWithNames;
  let dbcn = props.stateAvgs.deathsByCountyWithNames;
  
  let mostCountyCases = cbcn.slice(0,5);
  let mostCountyDeaths = dbcn.slice(0,5);
  
  let restOfCases = 0;
  let restOfDeaths = 0;
  for (let i = 4; i < cbcn.length; i++){
    restOfCases += cbcn[i].cases;
    restOfDeaths += dbcn[i].deaths;
  }

  if (props.display === "cases"){
    return (
        <Pie
        height={300}
        data = {{
            labels: [props.countyName, `Rest of ${props.stateAbbrev}`],
            datasets: [{
              data: [
                props.countyData[props.countyData.length-1].cases, 
                props.mostRecentData.cases - props.countyData[props.countyData.length-1].cases
              ],
              backgroundColor: [
              '#003f5c',
              '#58508d'
              ],
              hoverBackgroundColor: [
              '#3a57af',
              '#1891C3'
              ]
            }]
          }}
          options={{
            title: {
              display: true,
              text: `${props.countyName} County compared to the rest of ${props.stateAbbrev}`,
              position: "top",
              fontSize: 15
            },
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        />
    )
  } else {
    return (
        <Pie
        height={300}
        data = {{
            labels: [props.countyName, `Rest of ${props.stateAbbrev}`],
            datasets: [{
              data: [
                props.countyData[props.countyData.length-1].deaths, 
                props.mostRecentData.deaths - props.countyData[props.countyData.length-1].deaths
              ],
              backgroundColor: [
              '#003f5c',
              '#58508d'
              ],
              // hoverBackgroundColor: [
              // '#3a57af',
              // '#1891C3'
              // ]
            }]
          }}
          options={{
            title: {
              display: true,
              text: `${props.countyName} County compared to the rest of ${props.stateAbbrev}`,
              position: "top",
              fontSize: 15
            },
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        />
    )
  }
}

export default CountyPieChartT;