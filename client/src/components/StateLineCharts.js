import React from 'react';
import {Line} from "react-chartjs-2";

const StateLineCharts = (props) => {
  console.log(props);
  let datesArr = [];
  let dateCasesArr = [];
  let dateDeathsArr = [];
  let ntlMedCases;
  let ntlMedDeaths;
  let ntlAvgCases;
  let ntlAvgDeaths;
  
  if (props.range === "4 Weeks"){
    ntlMedCases = props.nationalAvgs.dateMedians.fourWeekRange.cases;
    ntlMedDeaths = props.nationalAvgs.dateMedians.fourWeekRange.deaths;
    ntlAvgCases = props.nationalAvgs.dateAvgs.fourWeekRange.cases;
    ntlAvgDeaths = props.nationalAvgs.dateAvgs.fourWeekRange.deaths;

    datesArr.push(props.stateData[props.stateData.length-29].date);
    datesArr.push(props.stateData[props.stateData.length-22].date);
    datesArr.push(props.stateData[props.stateData.length-15].date);
    datesArr.push(props.stateData[props.stateData.length-8].date);
    datesArr.push(props.stateData[props.stateData.length-1].date);

    dateCasesArr.push(props.stateData[props.stateData.length-29].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-22].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-15].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-8].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-1].cases);

    dateDeathsArr.push(props.stateData[props.stateData.length-29].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-22].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-15].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-8].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-1].deaths);

  } else if (props.range === "1 Week"){
    ntlMedCases = props.nationalAvgs.dateMedians.oneWeekRange.cases;
    ntlMedDeaths = props.nationalAvgs.dateMedians.oneWeekRange.deaths;
    ntlAvgCases = props.nationalAvgs.dateAvgs.oneWeekRange.cases;
    ntlAvgDeaths = props.nationalAvgs.dateAvgs.oneWeekRange.deaths;

    datesArr.push(props.stateData[props.stateData.length-8].date);
    datesArr.push(props.stateData[props.stateData.length-7].date);
    datesArr.push(props.stateData[props.stateData.length-6].date);
    datesArr.push(props.stateData[props.stateData.length-5].date);
    datesArr.push(props.stateData[props.stateData.length-4].date);
    datesArr.push(props.stateData[props.stateData.length-3].date);
    datesArr.push(props.stateData[props.stateData.length-2].date);
    datesArr.push(props.stateData[props.stateData.length-1].date);

    dateCasesArr.push(props.stateData[props.stateData.length-8].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-7].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-6].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-5].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-4].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-3].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-2].cases);
    dateCasesArr.push(props.stateData[props.stateData.length-1].cases);

    dateDeathsArr.push(props.stateData[props.stateData.length-8].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-7].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-6].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-5].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-4].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-3].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-2].deaths);
    dateDeathsArr.push(props.stateData[props.stateData.length-1].deaths);
  }

  let returnVal;
  if (props.display === "cases"){
    returnVal = (
        <Line
          height={160}
          data={{
            labels: datesArr,
              datasets: [
                {
                  label: props.stateAbbrev,
                  fill: false,
                  data: dateCasesArr,
                  borderColor: "#00589c"
                },
                {
                  label: "US Med.",
                  fill: false,
                  data: ntlMedCases,
                  borderColor: "#1891c3"
                },
                {
                  label: "US Avg.",
                  fill: false,
                  data: ntlAvgCases,
                  borderColor: "#666"
                }
              ]
          }}
            options={{
              title: {
                display: false,
                text: `${props.stateName} Cases Over Time`,
                fontSize: 25
              },
              legend: {
                display: true,
                position: "top"
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
    )
  } else {
    returnVal = (
      <Line
          height={160}
          data={{
            labels: datesArr,
              datasets: [
                {
                  label: props.stateAbbrev,
                  fill: false,
                  data: dateDeathsArr,
                  borderColor: "#00589c"
                },
                {
                  label: "US Med.",
                  fill: false,
                  data: ntlMedDeaths,
                  borderColor: "#1891c3"
                },
                {
                  label: "US Avg.",
                  fill: false,
                  data: ntlAvgDeaths,
                  borderColor: "#666"
                }
              ]
            }}
            options={{
              title: {
                display: false,
                text: `${props.stateName} Deaths Over Time`,
                fontSize: 25
              },
              legend: {
                display: true,
                position: "top"
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
    )
  }

  return returnVal;
}

export default StateLineCharts;