import React from 'react'
import {Bar} from "react-chartjs-2"

const CovidCharts = (props) => {
  if (props.stateName === "Guam" || props.stateName === "Virgin Islands" || props.stateName === "District of Columbia"){
    return <span className="d-none"></span>
  } else {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <Bar
              data={{
                labels: [`${props.county} County`, `${props.stateName} median`, `${props.stateName} average`],
                  datasets: [
                    {
                      label: "Cases",
                      data: [
                        props.countyData[props.countyData.length-1].cases,
                        props.stateAvgs.medianCases,
                        Math.round(props.mostRecentData.cases / props.counties.length)],
                      backgroundColor: ["#820401", "#C02323", "#DE542C"]
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
                labels: [`${props.county} County`, `${props.stateName} median`, `${props.stateName} average`],
                  datasets: [
                    {
                      data: [
                        props.countyData[props.countyData.length-1].deaths,
                        props.stateAvgs.medianDeaths,
                        Math.round(props.mostRecentData.deaths / props.counties.length)
                    ],
                    // backgroundColor: ["#016FC4", "#1891C3", "#3AC0DA"]
                    backgroundColor: ["#820401", "#C02323", "#DE542C"]
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
}

export default CovidCharts;