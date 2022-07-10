import React from "react";
import Axios from "axios";
import { useAuth } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  //   const [credentials, setCredentials] = React.useState({
  //     username: "",
  //     password: "",
  //   });
  //   const [auth, setAuth] = React.useState(false);

  //   function handleChange(e) {
  //     const newCredentials = { ...credentials };
  //     newCredentials[e.target.id] = e.target.value;
  //     setCredentials(newCredentials);
  //   }

  //   function handleLogin(e) {
  //     e.preventDefault();
  //     try {
  //       Axios.post("/login", {
  //         username: credentials.username,
  //         password: credentials.password,
  //       }).then((res) => {
  //         setAuth(res.data.result);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  const [user, setUser] = React.useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.login(user);
    navigate("/");
  };

  return (
    // <div>
    //   <form onSubmit={(e) => handleLogin(e)}>
    //     <input
    //       onChange={(e) => handleChange(e)}
    //       id="username"
    //       value={credentials.username}
    //       placeholder="username"
    //       type="text"
    //     ></input>
    //     <input
    //       onChange={(e) => handleChange(e)}
    //       id="password"
    //       value={credentials.password}
    //       placeholder="password"
    //       type="text"
    //     ></input>
    //     <button>Login</button>
    //   </form>
    // </div>
    <div>
      <form onSubmit={handleLogin()}>
        <input onChange={(e) => setUser(e.target.value)} type="text"></input>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
