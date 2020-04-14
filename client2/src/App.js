import React from 'react';
import './App.css';
import Login from "./container/container";
import { BrowserRouter as Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/container/container">
          <Login />
        </Route>
      </header>
    </div>
  );
}

export default App;
