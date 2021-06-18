import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  username:"",
  password:""
}

const initialError = "";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState(initialError);

  const { push } = useHistory();

  const onChange = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (formValues.username === "" || formValues.password === "") {
      setError("Username or Password not valid.");
    }
    else{setError("")}

    axios.post('http://localhost:5000/api/login', formValues)
    .then(res=> {
      localStorage.setItem("token", res.data.payload);
      push("/bubbles")
    })
    .catch(err => {
      console.log(err);
      setError("Username or Password not valid.")
    })
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={onSubmit}>
          <label>Username:&nbsp;</label>
            <input 
              type="text"
              name="username"
              value={formValues.username}
              onChange={onChange}
              id="username"
            />
          <label>Password:&nbsp;</label>
            <input 
              type="password"
              name="password"
              value={formValues.password}
              onChange={onChange}
              id="password"
            />
            <button>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.