import React, { useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./features/login/Login";
import { Home } from "./features/home/Home";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = useCallback((user) => {
    setUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <div className="App" style={{ height: "100vh" }}>
      <Routes>
        <Route
          path="login"
          index={true}
          element={<Login onLogin={handleLogin} />}
        ></Route>
        <Route
          path="home"
          element={<Home user={user} onLogout={handleLogout} />}
        ></Route>
        <Route path="*" element={<Navigate to={"/login"} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
