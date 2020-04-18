import React from 'react';
import {Line} from "react-chartjs-2";

const StateLineChart = (props) => {

  let firstDate = props.stateData[props.stateData.length-22].date;
  let secondDate = props.stateData[props.stateData.length-15].date;
  let thirdDate = props.stateData[props.stateData.length-8].date;
  let fourthDate = props.stateData[props.stateData.length-1].date;

  let stateFirstDateCases = props.stateData[props.stateData.length-22].cases;
  let stateSecondDateCases = props.stateData[props.stateData.length-15].cases;
  let stateThirdDateCases = props.stateData[props.stateData.length-8].cases;
  let stateFourthDateCases = props.stateData[props.stateData.length-1].cases;

  let stateFirstDateDeaths = props.stateData[props.stateData.length-22].deaths;
  let stateSecondDateDeaths = props.stateData[props.stateData.length-15].deaths;
  let stateThirdDateDeaths = props.stateData[props.stateData.length-8].deaths;
  let stateFourthDateDeaths = props.stateData[props.stateData.length-1].deaths;

  console.log(props);
  return (
    <div id="line-chart-container">
      <div className="row">
        <div className="col-6">
        <Line
            height={170}
            data={{
              labels: [firstDate, secondDate, thirdDate, fourthDate],
                datasets: [
                  {
                    label: props.stateName,
                    fill: false,
                    data: [
                      stateFirstDateCases,
                      stateSecondDateCases,
                      stateThirdDateCases,
                      stateFourthDateCases
                    ],
                    borderColor: "#3a57af"
                  },
                  {
                    label: "US Average",
                    fill: false,
                    data: [
                      props.nationalAvgs.dateAvgs.cases.one,
                      props.nationalAvgs.dateAvgs.cases.two,
                      props.nationalAvgs.dateAvgs.cases.three,
                      props.nationalAvgs.dateAvgs.cases.four
                    ],
                    borderColor: "#1891C3"
                  },
                  {
                    label: "US Median",
                    fill: false,
                    data: [
                      props.nationalAvgs.dateMedians.cases.one,
                      props.nationalAvgs.dateMedians.cases.two,
                      props.nationalAvgs.dateMedians.cases.three,
                      props.nationalAvgs.dateMedians.cases.four
                    ],
                    borderColor: "#3AC0DA"
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
                  display: true,
                  position: "bottom"
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
        <div className="col-6">
        <Line
            height={170}
            data={{
              labels: [firstDate, secondDate, thirdDate, fourthDate],
                datasets: [
                  {
                    label: props.stateName,
                    fill: false,
                    data: [
                      stateFirstDateDeaths,
                      stateSecondDateDeaths,
                      stateThirdDateDeaths,
                      stateFourthDateDeaths
                    ],
                    borderColor: "#3a57af"
                  },
                  {
                    label: "US average",
                    fill: false,
                    data: [
                      props.nationalAvgs.dateAvgs.deaths.one,
                      props.nationalAvgs.dateAvgs.deaths.two,
                      props.nationalAvgs.dateAvgs.deaths.three,
                      props.nationalAvgs.dateAvgs.deaths.four
                    ],
                    borderColor: "#1891C3"
                  },
                  {
                    label: "US Median",
                    fill: false,
                    data: [
                      props.nationalAvgs.dateMedians.deaths.one,
                      props.nationalAvgs.dateMedians.deaths.two,
                      props.nationalAvgs.dateMedians.deaths.three,
                      props.nationalAvgs.dateMedians.deaths.four
                    ],
                    borderColor: "#3AC0DA"
                  }
                ]
            }}
            options={{
              
              title: {
                  display: true,
                  text: `Deaths In ${props.stateName}`,
                  fontSize: 25
              },
              legend: {
                  display: true,
                  position: "bottom"
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