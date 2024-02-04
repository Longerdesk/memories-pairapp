import React, {useState} from 'react';
import Header from './Header'
import SignupHeader from './SignupHeader'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './css/SignUp.css';
import './css/common.css';
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Pair from './Pair'
import Days from './Days'
import Photo from './Photo'
import Account from './Account'
import Post from './Post'


function App() {
  return (
    <BrowserRouter >
      <div className='background'>
          <Routes>
            <Route path = '/' element={<Login />}></Route>
            <Route path = '/signup' element={<Signup />}></Route>
            <Route path = '/home' element={<Home />}></Route>
            <Route path = '/pair' element={<Pair />}></Route>
            <Route path = '/days' element={<Days />}></Route>
            <Route path = '/photo' element={<Photo />}></Route>
            <Route path = '/account' element={<Account />}></Route>
            <Route path = '/post' element = {<Post />}></Route>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App