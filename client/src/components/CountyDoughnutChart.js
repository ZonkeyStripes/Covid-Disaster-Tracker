import React from 'react';
import {Doughnut} from "react-chartjs-2";

const CountyDoughnutChartT = (props) => {
  if (props.stateName === "Delaware"){
    return <h3>No county data available</h3>
  }
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

  console.log("Rest of cases: " + restOfCases);
  console.log("Rest of deaths: " + restOfDeaths);

  if (props.display === "cases"){
    return (
        <Doughnut
        height={300}
        data = {{
            labels: [mostCountyCases[0].county, mostCountyCases[1].county, mostCountyCases[2].county, mostCountyCases[3].county, `Rest of ${props.stateName}`],
            datasets: [{
              data: [mostCountyCases[0].cases, mostCountyCases[1].cases, mostCountyCases[2].cases, mostCountyCases[3].cases, restOfCases],
              backgroundColor: [
              '#003f5c',
              '#58508d',
              "#bc5090",
              "#ff6361",
              "#ffa600"
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
              text: `${props.stateName} counties with most cases`,
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
        <Doughnut
        height={300}
        data = {{
            labels: [mostCountyDeaths[0].county, mostCountyDeaths[1].county, mostCountyDeaths[2].county, mostCountyDeaths[3].county, `Rest of ${props.stateName}`],
            datasets: [{
              data: [mostCountyDeaths[0].deaths, mostCountyDeaths[1].deaths, mostCountyDeaths[2].deaths, mostCountyDeaths[3].deaths, restOfDeaths],
              backgroundColor: [
              '#003f5c',
              '#58508d',
              "#bc5090",
              "#ff6361",
              "#ffa600"
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
              text: `${props.stateName} counties with most deaths`,
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

export default CountyDoughnutChartT;