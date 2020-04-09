import React from 'react'
import {Bar, Line} from "react-chartjs-2"

const CovidCharts = (props) => {
  console.log(props)
    return (
      <div className="row">
        <div className="col-6">
          <Bar
            data={{
              // labels: [`${props.stateName} cases`, "US average"],
              labels: [`${props.stateName} cases`, "US median"],
                datasets: [
                  {
                    label: "Cases",
                    // data: [props.mostRecentData.cases, props.averages.avgCases],
                    data: [props.mostRecentData.cases, props.averages.medianCases],
                    backgroundColor: ["blue", "red"]
                  }
                ]
            }}
            // height={90}
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
        </div>
        <div className="col-6">
          <Bar
            data={{
              // labels: [`${props.stateName} deaths`, "US average"],
              labels: [`${props.stateName} deaths`, "US median"],
                datasets: [
                  {
                    // label: "Cases",
                    data: [props.mostRecentData.deaths, props.averages.medianDeaths],
                    backgroundColor: ["blue", "red"]
                  }
                ]
            }}
            // height={90}
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
      </div>
    )
}

export default CovidCharts;