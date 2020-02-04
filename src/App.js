import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { AuthProvider } from "./hooks";

function App() {
  return ( 
    <AuthProvider strategy="finster">
       {/* <Dashboard></Dashboard> */}
      <Login></Login>
    </AuthProvider>
  );
}

export default App;
