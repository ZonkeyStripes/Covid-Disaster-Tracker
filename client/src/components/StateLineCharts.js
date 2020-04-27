import React from 'react';
import {Line} from "react-chartjs-2";

const StateLineCharts = ({nationalAvgs, stateData, range, display, stateName, stateAbbrev}) => {

  let datesArr = [];
  let dateCasesArr = [];
  let dateDeathsArr = [];
  let ntlMedCases;
  let ntlMedDeaths;
  let ntlAvgCases;
  let ntlAvgDeaths;
  
  if (range === "4 Weeks"){
    ntlMedCases = nationalAvgs.dateMedians.fourWeekRange.cases;
    ntlMedDeaths = nationalAvgs.dateMedians.fourWeekRange.deaths;
    ntlAvgCases = nationalAvgs.dateAvgs.fourWeekRange.cases;
    ntlAvgDeaths = nationalAvgs.dateAvgs.fourWeekRange.deaths;

    datesArr.push(stateData[stateData.length-29].date);
    datesArr.push(stateData[stateData.length-22].date);
    datesArr.push(stateData[stateData.length-15].date);
    datesArr.push(stateData[stateData.length-8].date);
    datesArr.push(stateData[stateData.length-1].date);

    dateCasesArr.push(stateData[stateData.length-29].cases);
    dateCasesArr.push(stateData[stateData.length-22].cases);
    dateCasesArr.push(stateData[stateData.length-15].cases);
    dateCasesArr.push(stateData[stateData.length-8].cases);
    dateCasesArr.push(stateData[stateData.length-1].cases);

    dateDeathsArr.push(stateData[stateData.length-29].deaths);
    dateDeathsArr.push(stateData[stateData.length-22].deaths);
    dateDeathsArr.push(stateData[stateData.length-15].deaths);
    dateDeathsArr.push(stateData[stateData.length-8].deaths);
    dateDeathsArr.push(stateData[stateData.length-1].deaths);

  } else if (range === "2 Weeks"){
    ntlMedCases = nationalAvgs.dateMedians.twoWeekRange.cases;
    ntlMedDeaths = nationalAvgs.dateMedians.twoWeekRange.deaths;
    ntlAvgCases = nationalAvgs.dateAvgs.twoWeekRange.cases;
    ntlAvgDeaths = nationalAvgs.dateAvgs.twoWeekRange.deaths;

    datesArr.push(stateData[stateData.length-15].date);
    datesArr.push(stateData[stateData.length-13].date);
    datesArr.push(stateData[stateData.length-11].date);
    datesArr.push(stateData[stateData.length-9].date);
    datesArr.push(stateData[stateData.length-7].date);
    datesArr.push(stateData[stateData.length-5].date);
    datesArr.push(stateData[stateData.length-3].date);
    datesArr.push(stateData[stateData.length-1].date);

    dateCasesArr.push(stateData[stateData.length-15].cases);
    dateCasesArr.push(stateData[stateData.length-13].cases);
    dateCasesArr.push(stateData[stateData.length-11].cases);
    dateCasesArr.push(stateData[stateData.length-9].cases);
    dateCasesArr.push(stateData[stateData.length-7].cases);
    dateCasesArr.push(stateData[stateData.length-5].cases);
    dateCasesArr.push(stateData[stateData.length-3].cases);
    dateCasesArr.push(stateData[stateData.length-1].cases);

    dateDeathsArr.push(stateData[stateData.length-15].deaths);
    dateDeathsArr.push(stateData[stateData.length-13].deaths);
    dateDeathsArr.push(stateData[stateData.length-11].deaths);
    dateDeathsArr.push(stateData[stateData.length-9].deaths);
    dateDeathsArr.push(stateData[stateData.length-7].deaths);
    dateDeathsArr.push(stateData[stateData.length-5].deaths);
    dateDeathsArr.push(stateData[stateData.length-3].deaths);
    dateDeathsArr.push(stateData[stateData.length-1].deaths);
  } else if (range === "1 Week"){
    ntlMedCases = nationalAvgs.dateMedians.oneWeekRange.cases;
    ntlMedDeaths = nationalAvgs.dateMedians.oneWeekRange.deaths;
    ntlAvgCases = nationalAvgs.dateAvgs.oneWeekRange.cases;
    ntlAvgDeaths = nationalAvgs.dateAvgs.oneWeekRange.deaths;

    datesArr.push(stateData[stateData.length-8].date);
    datesArr.push(stateData[stateData.length-7].date);
    datesArr.push(stateData[stateData.length-6].date);
    datesArr.push(stateData[stateData.length-5].date);
    datesArr.push(stateData[stateData.length-4].date);
    datesArr.push(stateData[stateData.length-3].date);
    datesArr.push(stateData[stateData.length-2].date);
    datesArr.push(stateData[stateData.length-1].date);

    dateCasesArr.push(stateData[stateData.length-8].cases);
    dateCasesArr.push(stateData[stateData.length-7].cases);
    dateCasesArr.push(stateData[stateData.length-6].cases);
    dateCasesArr.push(stateData[stateData.length-5].cases);
    dateCasesArr.push(stateData[stateData.length-4].cases);
    dateCasesArr.push(stateData[stateData.length-3].cases);
    dateCasesArr.push(stateData[stateData.length-2].cases);
    dateCasesArr.push(stateData[stateData.length-1].cases);

    dateDeathsArr.push(stateData[stateData.length-8].deaths);
    dateDeathsArr.push(stateData[stateData.length-7].deaths);
    dateDeathsArr.push(stateData[stateData.length-6].deaths);
    dateDeathsArr.push(stateData[stateData.length-5].deaths);
    dateDeathsArr.push(stateData[stateData.length-4].deaths);
    dateDeathsArr.push(stateData[stateData.length-3].deaths);
    dateDeathsArr.push(stateData[stateData.length-2].deaths);
    dateDeathsArr.push(stateData[stateData.length-1].deaths);
  }

  let returnVal;
  if (display === "cases"){
    returnVal = (
        <Line
          height={160}
          data={{
            labels: datesArr,
              datasets: [
                {
                  label: stateAbbrev,
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
                text: `${stateName} Cases Over Time`,
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
                  label: stateAbbrev,
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
                text: `${stateName} Deaths Over Time`,
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