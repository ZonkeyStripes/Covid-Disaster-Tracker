import React from 'react'
import {Bar} from "react-chartjs-2"

const CountyBarCharts = (props) => {
  console.log(props);
  let returnVal;

  if (props.stateName === "Guam" || props.stateName === "Virgin Islands" || props.stateName === "District of Columbia"){
    returnVal = <span className="d-none"></span>
  } else if (props.display === "cases") {
    returnVal = (
      <Bar
        data={{
          labels: [`${props.countyName} County`, `${props.stateAbbrev} median`, `${props.stateAbbrev} average`],
            datasets: [
              {
                label: "Cases",
                data: [
                  props.countyData[props.countyData.length-1].cases,
                  props.stateAvgs.medianCases,
                  props.stateAvgs.avgCases],
                backgroundColor: ["#00589c", "#1891c3", "#666"]
              }
            ]
        }}
        height={160}
        options={{
          title: {
            display: false,
            text: `${props.countyName} County Case Totals`,
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
          labels: [`${props.countyName} County`, `${props.stateAbbrev} median`, `${props.stateAbbrev} average`],
            datasets: [
            {
              data: [
              props.countyData[props.countyData.length-1].deaths,
              props.stateAvgs.medianDeaths,
              props.stateAvgs.avgDeaths
            ],
            backgroundColor: ["#00589c", "#1891c3", "#666"]
            }
          ]
        }}
        height={160}
        options={{
          title: {
            display: false,
            text: `${props.countyName} County Death Totals`,
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