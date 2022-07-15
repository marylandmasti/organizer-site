import React from "react";
import { useNavigate } from "react-router-dom";
import App from "../App";

const Auth = ({ authenticate }) => {
  const navigate = useNavigate();
  const onClick = () => {
    authenticate();
    navigate("");
    console.log(App.user);
  };
  return (
    <div>
      <button onClick={onClick}>Authenticate</button>
    </div>
  );
};

export default Auth;
