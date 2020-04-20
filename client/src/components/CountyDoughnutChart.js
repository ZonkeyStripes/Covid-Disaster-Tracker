import React from 'react';
import {Doughnut} from "react-chartjs-2";

const CountyDoughnutChartT = (props) => {
  console.log(props);

  let casesTitle;
  let deathsTitle;

  let restOfCases = 0;
  let restOfDeaths = 0;

  let cbcn = props.stateAvgs.casesByCountyWithNames;
  let dbcn = props.stateAvgs.deathsByCountyWithNames;

  let mostCountyCases;
  let mostCountyDeaths;

  let mostCountyCasesNames;
  let mostCountyCasesTotals;

  let mostCountyDeathsNames;
  let mostCountyDeathsTotals;

  if (props.counties.length < 10){
    casesTitle = `${props.stateName} Case Totals By County`;
    deathsTitle = `${props.stateName} Death Totals By County`;
    mostCountyCasesNames = cbcn.map(county => county.county);
    mostCountyCasesTotals = cbcn.map(county => county.cases);
    mostCountyDeathsNames = dbcn.map(county => county.county);
    mostCountyDeathsTotals = dbcn.map(county => county.deaths);
  } else {
    casesTitle = `${props.stateAbbrev} Counties With Highest Case Totals`;
    deathsTitle = `${props.stateAbbrev} Counties With Highest Death Totals`;
    mostCountyCases = cbcn.slice(0,4);
    mostCountyDeaths = dbcn.slice(0,4);
    for (let i = 4; i < cbcn.length; i++){
      restOfCases += cbcn[i].cases;
      restOfDeaths += dbcn[i].deaths;
    }
    mostCountyCasesNames = mostCountyCases.map(county => county.county);
    mostCountyCasesTotals = mostCountyCases.map(county => county.cases);
    mostCountyCasesNames.push(`Rest of ${props.stateAbbrev}`);
    mostCountyCasesTotals.push(restOfCases);
    
    mostCountyDeathsNames = mostCountyDeaths.map(county => county.county);
    mostCountyDeathsTotals = mostCountyDeaths.map(county => county.deaths);
    mostCountyDeathsNames.push(`Rest of ${props.stateAbbrev}`);
    mostCountyDeathsTotals.push(restOfDeaths);
  }


  if (props.display === "cases"){
    return (
        <Doughnut
        height={300}
        data = {{
            labels: mostCountyCasesNames,
            datasets: [{
              data: mostCountyCasesTotals,
              backgroundColor: [
              '#003f5c',
              '#58508d',
              "#bc5090",
              "#ff6361",
              "#ffa600",
              "red",
              "purple",
              "grey",
              "teal"
              ],
              hoverBackgroundColor: [
              '#3a57af',
              '#1891C3'
              ]
            }]
          }}
          options={{
            false: {
              display: true,
              text: casesTitle,
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
            labels: mostCountyDeathsNames,
            datasets: [{
              data: mostCountyDeathsTotals,
              backgroundColor: [
                '#003f5c',
                '#58508d',
                "#bc5090",
                "#ff6361",
                "#ffa600",
                "red",
                "purple",
                "grey",
                "teal"
              ],
              hoverBackgroundColor: [
                '#3a57af',
                '#1891C3'
              ]
            }]
          }}
          options={{
            title: {
              display: false,
              text: deathsTitle,
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