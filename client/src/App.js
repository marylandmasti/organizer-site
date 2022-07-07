import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Announcements from "./Components/Announcements/Announcements";
import AddDeleteParticipant from "./Components/RegisteredParticipants/AddDeleteParticipant.js";
import Nav from "./Components/Navigation/Nav";
import Login from "./Components/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Announcements />} />
          <Route
            path="registeredparticipants"
            element={<AddDeleteParticipant />}
          />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
