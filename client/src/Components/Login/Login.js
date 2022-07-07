import React from "react";
import Axios from "axios";

const Login = (props) => {
  const [cred, setCred] = React.useState({
    username: "",
    password: "",
  });
  const [auth, setAuth] = React.useState(false);

  function handleChange(e) {
    const newCred = { ...cred };
    newCred[e.target.id] = e.target.value;
    setCred(newCred);
  }

  function handleLogin(e) {
    e.preventDefault();
    try {
      Axios.post("/login", {
        username: cred.username,
        password: cred.password,
      }).then((res) => {
        setAuth(res.data.result);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          onChange={(e) => handleChange(e)}
          id="username"
          value={cred.username}
          placeholder="username"
          type="text"
        ></input>
        <input
          onChange={(e) => handleChange(e)}
          id="password"
          value={cred.password}
          placeholder="password"
          type="text"
        ></input>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
