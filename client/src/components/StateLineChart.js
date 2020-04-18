import React from 'react';
import {Line} from "react-chartjs-2";

const StateLineChart = (props) => {
  return (
    <div id="line-chart-container">
      <div className="row">
        <div className="col-12">
        <Line
            height={80}
            data={{
              // labels: [`${props.stateName}`, "US median", "US average"],
              labels: ["3-27", "4-3", "4-10", "4-17"],
                datasets: [
                  {
                    label: "Cases",
                    fill: false,
                    data: [
                      props.mostRecentData.cases,
                      props.nationalAvgs.medianCases,
                      props.nationalAvgs.avgCases
                    ],
                    borderColor: "#3a57af",
                    // backgroundColor: "Red"
                    // backgroundColor: ["#820401", "#C02323", "#DE542C"]
                  }
                ]
            }}
            options={{
              
              title: {
                  display: true,
                  text: `Cases In ${props.stateName}`,
                  fontSize: 25
              },
              legend: {
                  display: false,
                  position: "right"
              },
              scales:{
                responsive: true,
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

export default StateLineChart;