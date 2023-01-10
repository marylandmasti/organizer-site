import Axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import App from "../App";

const Auth = ({ authenticate }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    authenticate();
    navigate("");
  };

  const handleChange = (e) => {
    const newCredentials = { ...credentials };
    newCredentials[e.target.id] = e.target.value;
    setCredentials(newCredentials);
  };

  return (
    <div>
      <form>
        <input
          onChange={(e) => handleChange(e)}
          id="username"
          value={credentials.username}
          placeholder="username"
          type="text"
        ></input>
        <input
          onChange={(e) => handleChange(e)}
          id="password"
          value={credentials.password}
          placeholder="password"
          type="text"
        ></input>
        <button onClick={(e) => handleLogin(e)}>Authenticate</button>
      </form>
    </div>
  );
};

export default Auth;
