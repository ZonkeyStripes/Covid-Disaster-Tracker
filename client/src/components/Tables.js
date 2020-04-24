import React, {useState} from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

const Tables = (props) => {
  props.displayList.sort((a, b) => (a.data < b.data) ? 1 : (a.data === b.data) ? ((a.state > b.state) ? 1 : -1) : -1 );

  // const [myState, myDispatch] = useContext(Context);
  
  // const getClickedState = e => {
  //   myDispatch({
  //     type: "get_state_name",
  //     payload: {
  //       stateName: e.target.id,
  //       fromClick: true
  //     }
  //   })
  // }

  return (
      <div>
        <p className="text-center table-top-text">Total {props.displayed}</p>
        <h2 className="text-center">{props.total}</h2>
        {props.displayList.map(el => (
          <div className="state-sect p-2 d-flex">
            
            {el.data} <span className="text-muted"> - {el.state}</span>
            {/* <Link
              activeClass="active"
              className="ml-auto"
              to="chart-stuff"
              spy={true}
              smooth={true}
              offset={-100}
              duration= {1000}
            >
              <button id={el.state} className="btn-list-table ml-auto">More info</button>
            </Link> */}
          </div>
        ))}
      </div>
  )
}

export default Tables;