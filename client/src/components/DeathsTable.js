import React from 'react'

const CasesDeaths = (props) => {

  props.data.sort((a, b) => (a.deaths < b.deaths) ? 1 : (a.deaths === b.deaths) ? ((a.state > b.state) ? 1 : -1) : -1 );
  
  return (
    <div className="card table-responsive">
      <p className="text-center table-header">Total Deaths</p>
      <h2 className="text-center">{props.deaths}</h2>
      {props.data.map(el => (
        <div className="state-sect p-2">
          {el.deaths} <span className="text-muted"> - {el.state}</span>
        </div>
      ))}
    </div>
  )
}

export default CasesDeaths;