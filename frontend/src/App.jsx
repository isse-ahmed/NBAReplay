import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/navbar/navbar.jsx";
import MainContent from "./components/maincontent/maincontent.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content-wrapper">
        <MainContent />
      </div>
    </div>
  );
}

export default App;
