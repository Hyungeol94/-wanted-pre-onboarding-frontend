import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Note the correct import
import First from './First';
import Signin from './Signin';
import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
