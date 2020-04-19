import React, {useState} from 'react';
import $ from "jquery";

const Tables = (props) => {
  const [display, setDisplay] = useState("cases");
  const [total, setTotal] = useState(props.total);
  const [displayData, setDisplayData] = useState(props.displayList);

  props.displayList.sort((a, b) => (a.data < b.data) ? 1 : (a.data === b.data) ? ((a.state > b.state) ? 1 : -1) : -1 );
 
  const displayCases = () => {
    if (display === "Deaths"){
      $("#cases-btn").toggleClass("table-btn");
      $("#cases-btn").toggleClass("table-btn-outline");
      $("#deaths-btn").toggleClass("table-btn");
      $("#deaths-btn").toggleClass("table-btn-outline");
      setDisplay("Cases");
      setTotal(props.cases);
      setDisplayData(props.casesArr);
    }
  }
  
  const displayDeaths = () => {
    if (display === "Cases"){
      $("#deaths-btn").toggleClass("table-btn");
      $("#deaths-btn").toggleClass("table-btn-outline");
      $("#cases-btn").toggleClass("table-btn");
      $("#cases-btn").toggleClass("table-btn-outline");
      setDisplay("Deaths");
      setTotal(props.deaths);
      setDisplayData(props.deathsArr);
    }
  }

  return (
    // <div className="card">
    //   <div className="d-flex my-2">
    //     <div className="input-group" id="table-btn-container">
    //       <div className="input-group-prepend">
    //         <button onClick={displayCases} id="cases-btn" className="btn table-btn">Cases</button>
    //       </div>
    //       <div className="input-group-append">
    //         <button onClick={displayDeaths} id="deaths-btn" className="btn table-btn-outline">Deaths</button>
    //       </div>
    //     </div>
    //   </div>
      <div className="table-responsive">
        <p className="text-center table-header">Total {props.displayed}</p>
        <h2 className="text-center">{props.total}</h2>
        {props.displayList.map(el => (
          <div className="state-sect p-2">
            {el.data} <span className="text-muted"> - {el.state}</span>
          </div>
        ))}
      </div>
    // </div>
  )
}

export default Tables;