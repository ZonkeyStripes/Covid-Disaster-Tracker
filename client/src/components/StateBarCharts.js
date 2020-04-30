import React from 'react'
import {Bar} from "react-chartjs-2"

const StateBarCharts = (props) => {

  let chartLabels;
  let chartLabel;
  let chartData;
  let stateBarTitle;

  if (props.display === "cases" && props.viewBy === "Totals"){
    chartLabels = [`${props.stateAbbrev}`, "US Median", "US Average"];
    chartLabel = "Cases";
    chartData = [props.mostRecentData.cases, props.nationalAvgs.medianCases, props.nationalAvgs.avgCases];
    stateBarTitle = `${props.stateName} Case Totals`;

  } else if (props.display === "deaths" && props.viewBy === "Totals") {
    chartLabels = [`${props.stateAbbrev}`, "US Median", "US Average"];
    chartLabel = "Deaths";
    chartData = [props.mostRecentData.deaths, props.nationalAvgs.medianDeaths, props.nationalAvgs.avgDeaths];
    stateBarTitle = `${props.stateName} Death Totals`;

  } else if (props.display === "cases" && props.viewBy === "Per Thousand Residents"){
    chartLabels = [`${props.stateAbbrev}`, "US"];
    chartLabel = "Cases Per 1000 Residents";
    chartData = props.perData.map(item => item.toFixed(1));
    stateBarTitle = `${props.stateName} Cases Per 1000 Residents`;

  } else if (props.display === "deaths" && props.viewBy === "Per Hundred Thousand Residents"){
    chartLabels = [`${props.stateAbbrev}`, "US"];
    chartLabel = "Deaths Per 100,000 Residents";
    chartData = props.perData.map(item => item.toFixed(1));
    stateBarTitle = `${props.stateName} Deaths Per 100,000 Residents`;
  }

  return (
    <Bar
      data={{
        labels: chartLabels,
          datasets: [
            {
              label: chartLabel,
              data: chartData,
              backgroundColor: ["#00589c", "#1891c3", "#666"]
            }
          ]
      }}
      height={160}
      options={{
        title: {
          display: false,
          text: stateBarTitle,
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

export default StateBarCharts;