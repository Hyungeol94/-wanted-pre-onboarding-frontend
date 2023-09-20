import React, {useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Note the correct import
import First from './First';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Todo from './Todo';
import './App.css';

const App = () => {
  //로컬 스토리지에서 토큰 가져오기
  const token = localStorage.getItem('jwt');
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  // const navigate = useNavigate();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/signin"
              element = {token ? <Navigate to='/todo'/>: <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
        />
        <Route path="/signup"
              element = {token ? <Navigate to='/todo'/> : <SignUp/>}
        />            
        <Route path="/todo"
              element = {token ? <Todo /> : <Navigate to='/signin'/>}
        />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
