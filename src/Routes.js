import * as React from 'react';
import {render} from 'react-dom';
import {Switch} from 'react-router'
import {BrowserRouter, Redirect ,Route, Routes} from 'react-router-dom'
import {Signin} from './Signin'
import {Container} from 'semantic-ui-react'; 
import {App} from './App'
import {Signin} from '.Signin'

const routes = <BrowserRouter>
    <Routes>
        <Route path = './' element = {App}/>        
        <Route path = './signin' element = {Signin}/>        
    </Routes>
    </BrowserRouter>

render (routes, document.getElementById('app'));

