import React from 'react'
import {Bar} from "react-chartjs-2"

const StateBarCharts = ({display, stateAbbrev, mostRecentData, nationalAvgs, stateName}) => {
  let returnVal;
  if (display === "cases"){
    returnVal = (
        <Bar
          data={{
            labels: [`${stateAbbrev}`, "US Median", "US Average"],
              datasets: [
                {
                  label: "Cases",
                  data: [
                    mostRecentData.cases,
                    nationalAvgs.medianCases,
                    nationalAvgs.avgCases
                  ],
                  // backgroundColor: ["#3a57af", "pink", "#273a76"]
                  // backgroundColor: ["#3a57af", "#003f5c", "#6a6a6a"]
                  backgroundColor: ["#00589c", "#1891c3", "#666"]

                  // backgroundColor: ["#003f5c", "#bc5090", "#ffa600"]
                }
              ]
          }}
          height={160}
          options={{
            title: {
              display: false,
              text: `${stateName} Case Totals`,
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
            labels: [`${stateAbbrev}`, "US Median", "US Average"],
              datasets: [
                {
                  label: "Deaths",
                  data: [
                    mostRecentData.deaths,
                    nationalAvgs.medianDeaths,
                    nationalAvgs.avgDeaths
                  ],
                  backgroundColor: ["#00589c", "#1891c3", "#666"]
                }
              ]
          }}
          height={160}
          options={{
            title: {
              display: false,
              text: `${stateName} Death Totals`,
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