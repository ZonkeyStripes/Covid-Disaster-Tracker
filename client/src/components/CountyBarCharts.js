import React from 'react'
import {Bar} from "react-chartjs-2"

const CountyBarCharts = ({display, stateName, countyName, stateAbbrev, countyData, stateAvgs}) => {
  
  let returnVal;

  if (stateName === "Guam" || stateName === "Virgin Islands" || stateName === "District of Columbia"){
    returnVal = <span className="d-none"></span>
  } else if (display === "cases") {
    returnVal = (
      <Bar
        data={{
          labels: [`${countyName} County`, `${stateAbbrev} Median`, `${stateAbbrev} Average`],
            datasets: [
              {
                label: "Cases",
                data: [
                  countyData[countyData.length-1].cases,
                  stateAvgs.medianCases,
                  stateAvgs.avgCases],
                backgroundColor: ["#00589c", "#1891c3", "#666"]
              }
            ]
        }}
        height={160}
        options={{
          title: {
            display: false,
            text: `${countyName} County Case Totals`,
            fontSize: 25
          },
          legend: {
            display: false,
            position: "right"
          },
          scales:{
            yAxes:[{
              ticks:{
                beginAtZero: true,
                min: 0
              }
            }]
          }
        }}
      />
          
    )
  } else {
    returnVal = (
      <Bar
        data={{
          labels: [`${countyName} County`, `${stateAbbrev} Median`, `${stateAbbrev} Average`],
            datasets: [
            {
              data: [
              countyData[countyData.length-1].deaths,
              stateAvgs.medianDeaths,
              stateAvgs.avgDeaths
            ],
            backgroundColor: ["#00589c", "#1891c3", "#666"]
            }
          ]
        }}
        height={160}
        options={{
          title: {
            display: false,
            text: `${countyName} County Death Totals`,
            fontSize: 25
          },
          legend: {
            display: false,
            position: "right"
          },
          scales:{
            yAxes:[{
              ticks:{
                beginAtZero: true,
                min: 0
              }
            }]
          }
        }}
      />
    )
  }

  return returnVal;
}

export default CountyBarCharts;