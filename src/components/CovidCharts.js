import React from 'react'
import {Bar, Line} from "react-chartjs-2"

const CovidCharts = (props) => {
    return (
      <div>
        <Bar
          data={{
            labels: [`${props.stateName} cases`, "US average"],
              datasets: [
                {
                  // label: "Cases",
                  data: [props.mostRecentData.cases, 500],
                  backgroundColor: ["blue", "red"]
                }
              ]
          }}
          height={90}
          options={{
            title: {
                display: true,
                text: `COVID-19 Cases In ${props.stateName}`,
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
        <Bar
          data={{
            labels: [`${props.stateName} deaths`, "US average"],
              datasets: [
                {
                  // label: "Cases",
                  data: [props.mostRecentData.deaths, 20],
                  backgroundColor: ["blue", "red"]
                }
              ]
          }}
          height={90}
          options={{
            title: {
                display: true,
                text: `COVID-19 Deaths In ${props.stateName}`,
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
      </div>
    )
}

export default CovidCharts;