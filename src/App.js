import React, {useState} from 'react';
import './bootstrap.css';
import './style.css';
import CovidCharts from "./components/CovidCharts";
import statesData from "./us-state.json";
import stateNames from "./state-names.json";

function App() {
  const [selectedState, setSelectedState] = useState("Alaska")
  const [stateDataArr, setStateDataArr] = useState([statesData.filter(st => st.state === "Alaska")]);

  const handleStateChange = e => {
    setSelectedState(e.target.value);
    setStateDataArr([statesData.filter(st => st.state === e.target.value)])
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
          mostRecentData={stateDataArr[0][stateDataArr[0].length-1]}
          stateName={selectedState}
        />
      </div>
    </div>
  );
}

export default App;