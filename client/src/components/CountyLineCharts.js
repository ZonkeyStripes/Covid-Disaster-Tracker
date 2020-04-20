import React from 'react';
import {Line} from "react-chartjs-2";

const CountyLineCharts = (props) => {
  let returnVal;
  let dateArr;
  let dateCasesArr;
  let dateDeathsArr;
  let avgCasesArr;
  let avgDeathsArr;
  let medianCasesArr;
  let medianDeathsArr;

  if (props.countyData.length < 7){
    returnVal = <h3 className="text-center">Unable to display chart due to lack of data</h3>
  } else {
    dateArr = [
      props.countyData[props.countyData.length-7].date,
      props.countyData[props.countyData.length-6].date,
      props.countyData[props.countyData.length-5].date,
      props.countyData[props.countyData.length-4].date,
      props.countyData[props.countyData.length-3].date,
      props.countyData[props.countyData.length-2].date,
      props.countyData[props.countyData.length-1].date
    ];
    dateCasesArr = [
      props.countyData[props.countyData.length-7].cases,
      props.countyData[props.countyData.length-6].cases,
      props.countyData[props.countyData.length-5].cases,
      props.countyData[props.countyData.length-4].cases,
      props.countyData[props.countyData.length-3].cases,
      props.countyData[props.countyData.length-2].cases,
      props.countyData[props.countyData.length-1].cases
    ];
    dateDeathsArr = [
      props.countyData[props.countyData.length-7].deaths,
      props.countyData[props.countyData.length-6].deaths,
      props.countyData[props.countyData.length-5].deaths,
      props.countyData[props.countyData.length-4].deaths,
      props.countyData[props.countyData.length-3].deaths,
      props.countyData[props.countyData.length-2].deaths,
      props.countyData[props.countyData.length-1].deaths
    ];
    avgCasesArr = props.stateAvgs.dateAvgs.cases.map(caseTotal => caseTotal);
    avgDeathsArr = props.stateAvgs.dateAvgs.cases.map(deathTotal => deathTotal);
    medianCasesArr = props.stateAvgs.dateMedians.cases.map(caseTotal => caseTotal);
    medianDeathsArr = props.stateAvgs.dateMedians.deaths.map(deathTotal => deathTotal);
  }

  if (props.display === "cases" && props.countyData.length >= 7){
    returnVal = (
        <Line
            height={160}
            data={{
              labels: dateArr,
                datasets: [
                  {
                    label: props.countyName,
                    fill: false,
                    data: dateCasesArr,
                    borderColor: "#00589c"
                  },
                  {
                    label: `${props.stateAbbrev} Median`,
                    fill: false,
                    data: medianCasesArr,
                    borderColor: "#1891c3"
                  },
                  {
                    label: `${props.stateAbbrev} Average`,
                    fill: false,
                    data: avgCasesArr,
                    borderColor: "#666"
                  }
                ]
            }}
            options={{
              title: {
                  display: false,
                  text: `${props.countyName} Cases Over Time`,
                  fontSize: 25
              },
              legend: {
                  display: true,
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
    )
  } else if (props.display === "deaths" && props.countyData.length >= 7) {
    returnVal = (
      <Line
          height={160}
          data={{
            labels: dateArr,
              datasets: [
                {
                  label: props.countyName,
                  fill: false,
                  data: dateDeathsArr,
                  borderColor: "#00589c"
                },
                {
                  label: `${props.stateAbbrev} Median`,
                  fill: false,
                  data: medianDeathsArr,
                  borderColor: "#1891c3"
                },
                {
                  label: `${props.stateAbbrev} Average`,
                  fill: false,
                  data: avgDeathsArr,
                  borderColor: "#666"
                }
              ]
            }}
            options={{
              title: {
                display: false,
                text: `${props.countyName} Deaths Over Time`,
                fontSize: 25
              },
              legend: {
                display: true,
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
    )
  }

  return returnVal;
}

export default CountyLineCharts;