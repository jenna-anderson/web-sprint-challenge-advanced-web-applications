import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";

import "./styles.scss";

function App(props) {
  // const { push } = useHistory();

  const handleClick = () => {
    localStorage.removeItem("token");
    // push('/login');
  }
  
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href='#' onClick={handleClick}>logout</a>
        </header> 

        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/bubbles" component={BubblePage}></PrivateRoute>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.