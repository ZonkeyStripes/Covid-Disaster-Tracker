import React from 'react';

const Tables = (props) => {
  props.displayList.sort((a, b) => (a.data < b.data) ? 1 : (a.data === b.data) ? ((a.state > b.state) ? 1 : -1) : -1 );

  return (
      <div>
        <p className="text-center table-top-text mt-2">Total {props.displayed}</p>
        <h2 className="text-center">{props.total}</h2>
        {props.displayList.map((el, index) => (
          <div key={index} className="state-sect p-2 d-flex">
          {el.data} <span className="text-muted"> - {el.state}</span>
          </div>
        ))}
      </div>
  )
}

export default Tables;