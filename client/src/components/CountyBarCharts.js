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
          labels: [`${props.countyName} County`, `${props.stateName} median`, `${props.stateName} average`],
            datasets: [
              {
                label: "Cases",
                data: [
                  props.countyData[props.countyData.length-1].cases,
                  props.stateAvgs.medianCases,
                  Math.round(props.mostRecentData.cases / props.counties.length)],
                backgroundColor: ["#003f5c", "#bc5090", "#ffa600"]
              }
            ]
        }}
        options={{
          title: {
            display: true,
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
          labels: [`${props.countyName} County`, `${props.stateName} median`, `${props.stateName} average`],
            datasets: [
            {
              data: [
              props.countyData[props.countyData.length-1].deaths,
              props.stateAvgs.medianDeaths,
              Math.round(props.mostRecentData.deaths / props.counties.length)
            ],
            backgroundColor: ["#003f5c", "#bc5090", "#ffa600"]
            // backgroundColor: ["#820401", "#C02323", "#DE542C"]
            }
          ]
        }}
        options={{
          title: {
            display: true,
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