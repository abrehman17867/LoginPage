import React from 'react';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckInternet from './components/CheckInternet';

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/check-internet" element={<CheckInternet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
