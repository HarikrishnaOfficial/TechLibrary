import React, { useState, useEffect } from 'react';
import "../Styles/Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();
  function handleRegisterNavigation() {
    navigate("/register");
  }

  const onButtonClick = () => {
    let emailFound = false;
    let passwordCorrect = false;

    users.some((user) => {
      if (user.email === email) {
        emailFound = true;
        if (user.password === password) {
          passwordCorrect = true;
          localStorage.setItem('loggedStatus', JSON.stringify(true));
          alert("Login Successful");
          navigate("/home");
          return true;
        }
      }
      return false;
    });

    if (!emailFound) {
      setEmailError("Email Not Found");
      setPasswordError('');
    } else if (!passwordCorrect) {
      setPasswordError("Wrong Password");
      setEmailError('');
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{passwordError}</label>
        <p className="navigation" onClick={handleRegisterNavigation}>Register Here</p>
      </div>
      <div className="inputContainer">
        <input className="inputButton" type="button" onClick={onButtonClick} value="Log in" />
      </div>
    </div>
  );
}

export default Login;
