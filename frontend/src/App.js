import React from 'react';
import HomePage from './pages/HomePage';
import AadhaarDownloadPage from './pages/AadhaarDownloadPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/adh" element={< AadhaarDownloadPage />} />
        <Route exact path="/" element={< HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
