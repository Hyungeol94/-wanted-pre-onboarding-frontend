import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Note the correct import
import First from './First';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Todo from './Todo';
import './App.css';

const App = () => {
  //로컬 스토리지에서 토큰 가져오기
  //const token = localStorage.getItem('jwt');
  const [isSignedIn, setIsSignedInd] = useState(false);
  const [token, setToken] = useState('');
  
  const getToken = () => {
    // Retrieve the token from wherever it's stored (e.g., localStorage)
    const storedToken = localStorage.getItem('jwt');
    return storedToken || '';
  };

  // Effect to run when isSignedIn changes
  useEffect(() => {
    if (isSignedIn) {
      // When the user is signed in, get the new token
      const newToken = getToken();
      setToken(newToken);
    }
  }, [isSignedIn]);

  // const navigate = useNavigate();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/signin"
              element = {token ? <Navigate replace to='/todo'/>: <SignIn isSignedIn= {isSignedIn} setIsSignedInd = {setIsSignedInd}/>}
        />
        <Route path="/signup"
              element = {token ? <Navigate replace to='/todo'/> : <SignUp/>}
        />            
        <Route path="/todo"
              element = {token ? <Todo /> : <Navigate to='/signin'/>}
              //element = {token ? <Navigate to='/signin'/> : <Todo /> }
        />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
