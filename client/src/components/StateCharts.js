import React from 'react'
import {Bar} from "react-chartjs-2"

const CovidCharts = (props) => {
    return (
      <div>
      <div className="row">
        <div className="col-6">
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
                    backgroundColor: ["#3a57af", "#1891C3", "#3AC0DA"]
                  }
                ]
            }}
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
              labels: [`${props.stateName}`, "US median", "US average"],
                datasets: [
                  {
                    label: "Deaths",
                    data: [
                      props.mostRecentData.deaths,
                      props.nationalAvgs.medianDeaths,
                      props.nationalAvgs.avgDeaths
                    ],
                    backgroundColor: ["#3a57af", "#1891C3", "#3AC0DA"]
                  }
                ]
            }}
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
      </div>
    )
}

export default CovidCharts;