import React from 'react';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom'; // Note the correct import
import First from './First';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Todo from './Todo';
import './App.css';

const App = () => {
  //로컬 스토리지에서 토큰 가져오기
  const token = localStorage.getItem('jwt');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/signin">
          {token ? <Redirect to="/todo" /> : <SignIn />}
        </Route>      
        <Route path="/signup">
          {token ? <Redirect to="/todo" /> : <SignUp />}
        </Route> 
        <Route path="/todo">
          {token ? <Todo /> : <Redirect to="/signin" />}
        </Route>
        <Redirect from="/" to="/signin" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
