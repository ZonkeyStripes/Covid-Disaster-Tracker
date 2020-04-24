import React from 'react'
import {Bar} from "react-chartjs-2"

const StateBarCharts = (props) => {
  console.log(props);
  let returnVal;
  if (props.display === "cases"){
    returnVal = (
        <Bar
          data={{
            labels: [`${props.stateAbbrev}`, "US Median", "US Average"],
              datasets: [
                {
                  label: "Cases",
                  data: [
                    props.mostRecentData.cases,
                    props.nationalAvgs.medianCases,
                    props.nationalAvgs.avgCases
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
            labels: [`${props.stateAbbrev}`, "US Median", "US Average"],
              datasets: [
                {
                  label: "Deaths",
                  data: [
                    props.mostRecentData.deaths,
                    props.nationalAvgs.medianDeaths,
                    props.nationalAvgs.avgDeaths
                  ],
                  backgroundColor: ["#00589c", "#1891c3", "#666"]
                }
              ]
          }}
          height={160}
          options={{
            title: {
              display: false,
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