import React from 'react'
import {Bar, Line} from "react-chartjs-2"

const CovidCharts = (props) => {
  console.log(props)
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <Bar
              data={{
                labels: [`${props.county}`, "State median"],
                  datasets: [
                    {
                      label: "Cases",
                      // data: [props.countyData[props.countyData.length-1].cases, props.averages.medianCases],
                      data: [props.countyData[props.countyData.length-1].cases, 200],
                      backgroundColor: ["blue", "red"]
                    }
                  ]
              }}
              options={{
                title: {
                    display: true,
                    text: `COVID-19 Cases In ${props.county} County`,
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
                labels: [`${props.county}`, "State median"],
                  datasets: [
                    {
                      // data: [props.countyData[props.countyData.length-1].deaths, props.averages.medianDeaths],
                      data: [props.countyData[props.countyData.length-1].deaths, 7],
                      backgroundColor: ["blue", "red"]
                    }
                  ]
              }}
              options={{
                title: {
                    display: true,
                    text: `COVID-19 Deaths In ${props.county} County`,
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