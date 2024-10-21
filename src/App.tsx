import React from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/home";
import Auth from "./Pages/auth";
import PatientProfile from "./Pages/patient-profile";
import PriorAuthForm from "./Pages/prior-auth-form";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/patient-profile/:email" element={<PatientProfile />} />
          {/* <Route path="/prior-auth-form/:id" element={<PriorAuthForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
