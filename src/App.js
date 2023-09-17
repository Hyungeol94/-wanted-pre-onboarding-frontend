import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Note the correct import
import First from './First';
import Signin from './Signin';
import Signup from './Signup';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
