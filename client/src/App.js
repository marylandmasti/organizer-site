import React, {useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Announcements from "./Components/Announcements/Announcements";
import AddDeleteParticipant from "./Components/RegisteredParticipants/AddDeleteParticipant.js";
import Nav from "./Components/Navigation/Nav";
import Auth from "./Components/Auth";

function App() {
<<<<<<< HEAD
  const [user, setUser] = useState(null);
=======
  const [user, setUser] = React.useState(null);
  console.log("hi", process.env.PASSWORD);
>>>>>>> c2d8ac2911287d0f2adb4dd4d4390b297af004d9

  return (
    <BrowserRouter>
      <Routes>
        {console.log(user)}
        <Route path="/" element={<Nav />}>
          {user && <Route index element={<Announcements />} />}
          {!user && (
            <Route
              path="login"
              element={<Auth authenticate={() => setUser(true)} />}
            />
          )}
          {user && (
            <Route
              path="registeredparticipants"
              element={<AddDeleteParticipant />}
            />
          )}
          <Route path="/" element={<Navigate to={user ? "/" : "/login"} />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
