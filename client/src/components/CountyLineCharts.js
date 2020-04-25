import React from 'react';
import {Line} from "react-chartjs-2";

const CountyLineCharts = ({display, countyName, countyData, stateAbbrev, stateAvgs}) => {
  let returnVal;
  let dateArr;
  let dateCasesArr;
  let dateDeathsArr;
  let avgCasesArr;
  let avgDeathsArr;
  let medianCasesArr;
  let medianDeathsArr;

  if (countyData.length < 7){
    returnVal = <h3 className="text-center">Unable to display chart due to lack of data</h3>
  } else {
    dateArr = [
      countyData[countyData.length-7].date,
      countyData[countyData.length-6].date,
      countyData[countyData.length-5].date,
      countyData[countyData.length-4].date,
      countyData[countyData.length-3].date,
      countyData[countyData.length-2].date,
      countyData[countyData.length-1].date
    ];
    dateCasesArr = [
      countyData[countyData.length-7].cases,
      countyData[countyData.length-6].cases,
      countyData[countyData.length-5].cases,
      countyData[countyData.length-4].cases,
      countyData[countyData.length-3].cases,
      countyData[countyData.length-2].cases,
      countyData[countyData.length-1].cases
    ];
    dateDeathsArr = [
      countyData[countyData.length-7].deaths,
      countyData[countyData.length-6].deaths,
      countyData[countyData.length-5].deaths,
      countyData[countyData.length-4].deaths,
      countyData[countyData.length-3].deaths,
      countyData[countyData.length-2].deaths,
      countyData[countyData.length-1].deaths
    ];
    avgCasesArr = stateAvgs.dateAvgs.cases.map(caseTotal => caseTotal);
    avgDeathsArr = stateAvgs.dateAvgs.deaths.map(deathTotal => deathTotal);
    medianCasesArr = stateAvgs.dateMedians.cases.map(caseTotal => caseTotal);
    medianDeathsArr = stateAvgs.dateMedians.deaths.map(deathTotal => deathTotal);
  }

  if (display === "cases" && countyData.length >= 7){
    returnVal = (
        <Line
            height={160}
            data={{
              labels: dateArr,
                datasets: [
                  {
                    label: countyName,
                    fill: false,
                    data: dateCasesArr,
                    borderColor: "#00589c"
                  },
                  {
                    label: `${stateAbbrev} Med.`,
                    fill: false,
                    data: medianCasesArr,
                    borderColor: "#1891c3"
                  },
                  {
                    label: `${stateAbbrev} Avg.`,
                    fill: false,
                    data: avgCasesArr,
                    borderColor: "#666"
                  }
                ]
            }}
            options={{
              title: {
                display: false,
                text: `${countyName} Cases Over Time`,
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
  } else if (display === "deaths" && countyData.length >= 7) {
    returnVal = (
      <Line
          height={160}
          data={{
            labels: dateArr,
              datasets: [
                {
                  label: countyName,
                  fill: false,
                  data: dateDeathsArr,
                  borderColor: "#00589c"
                },
                {
                  label: `${stateAbbrev} Med.`,
                  fill: false,
                  data: medianDeathsArr,
                  borderColor: "#1891c3"
                },
                {
                  label: `${stateAbbrev} Avg.`,
                  fill: false,
                  data: avgDeathsArr,
                  borderColor: "#666"
                }
              ]
            }}
            options={{
              title: {
                display: false,
                text: `${countyName} Deaths Over Time`,
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

export default CountyLineCharts;