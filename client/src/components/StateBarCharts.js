import React from 'react'
import {Bar} from "react-chartjs-2"

const StateBarCharts = (props) => {
  console.log(props);
  let returnVal;
  if (props.display === "cases"){
    returnVal = (
        <Bar
          data={{
            labels: [`${props.stateName}`, "US median", "US average"],
              datasets: [
                {
                  label: "Cases",
                  data: [
                    props.mostRecentData.cases,
                    props.nationalAvgs.medianCases,
                    props.nationalAvgs.avgCases
                  ],
                  // backgroundColor: ["#3a57af", "#1891C3", "#3AC0DA"]
                  backgroundColor: ["#003f5c", "#bc5090", "#ffa600"]
                }
              ]
          }}
          options={{
            title: {
              display: true,
              text: `${props.stateName} Case Totals`,
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
            labels: [`${props.stateName}`, "US median", "US average"],
              datasets: [
                {
                  label: "Deaths",
                  data: [
                    props.mostRecentData.deaths,
                    props.nationalAvgs.medianDeaths,
                    props.nationalAvgs.avgDeaths
                  ],
                  backgroundColor: ["#003f5c", "#bc5090", "#ffa600"]
                }
              ]
          }}
          options={{
            title: {
              display: true,
              text: `${props.stateName} Death Totals`,
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

export default StateBarCharts;