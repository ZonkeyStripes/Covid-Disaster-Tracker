import React, {useState} from 'react';
import './bootstrap.css';
import './style.css';
import CovidCharts from "./components/CovidCharts";
import statesData from "./us-state.json";
import stateNames from "./state-names.json";

function App() {
  const [selectedState, setSelectedState] = useState("Alaska")
  const [stateDataArr, setStateDataArr] = useState(statesData.filter(st => st.state === "Alaska"));
  
  const getUSaverage = () => {
    let flState = null;
    let totalCases = 0;
    let totalDeaths = 0;
    let casesByState =[];
    let deathsByState =[];

    for (let i = 0; i < stateNames.length; i++){
      flState = statesData.filter(st => st.state === stateNames[i]);
      totalCases += flState[flState.length-1].cases;
      totalDeaths += flState[flState.length-1].deaths;
      casesByState.push(flState[flState.length-1].cases);
      deathsByState.push(flState[flState.length-1].deaths);
      flState = null;
    }

    return {
      avgCases: Math.round(totalCases / 53),
      avgDeaths: Math.round(totalDeaths / 53),
      medianCases: casesByState[26],
      medianDeaths: deathsByState[26]
    };
  };

  const handleStateChange = e => {
    setSelectedState(e.target.value);
    setStateDataArr(statesData.filter(st => st.state === e.target.value))
    console.log(stateDataArr);
  }

  return (
    <div className="App">
      <div className="container">
        <form>
            <label htmlFor="state">State</label>
            <select onChange={handleStateChange} class="form-control" id="stateSelect">
              {stateNames.map(name => (
                <option>{name}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary mt-2">Get state data</button>
        </form>
        <CovidCharts
          stateName={selectedState}
          mostRecentData={stateDataArr[stateDataArr.length-1]}
          averages = {getUSaverage()}
        />
      </div>
    </div>
  );
}

export default App;