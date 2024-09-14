import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./features/login/Login";
import { Home } from "./features/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" index={true} element={<Login />}></Route>
        <Route path="home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
