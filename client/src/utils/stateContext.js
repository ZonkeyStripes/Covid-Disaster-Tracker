import React, {createContext, useReducer} from 'react';

const reducer = (state, action) => {
  if (action.type === "get_state_name"){
    return [...state, {
      stateName: action.payload.stateName,
      fromButton: action.payload.fromButton
    }];
  } else {
    return state;
  }
};

const Context = createContext();
const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, [
    {stateName: "Alabama", fromButton: false}
  ]);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  )
}

export {Context, Provider};