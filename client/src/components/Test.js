import React, {useContext} from 'react';
import {Context} from "../utils/stateContext";
// import ChartContainer from "../components/ChartContainer";
import ChartContainerTest from "../components/ChartContainerTest";

const Test = () => {
  let returnVal;

  const [myState, myDispatch] = useContext(Context);
  // let x = myState[myState.length-1].stateName;
  let x = myState[myState.length-1];

  return (
    <ChartContainerTest
      // rdStateName = {myState[myState.length-1].stateName}
      rdStateName = {x}
    />
  )
}

export default Test;