// eslint-disable-next-line no-unused-vars
import * as dotenv from 'dotenv';
import './assets/css/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faEye, faEyeSlash, faMoon, faSun, faNewspaper, faXmark, faUserTie, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faEye, faEyeSlash, faMoon, faSun, faNewspaper, faXmark, faUserTie, faUser);
import { useState } from 'react';
import Cookies from 'js-cookie'


//pages
import Home from './pages/Home';
import Offer from './pages/Offer';
import Login from './pages/Login';
import Publish from './pages/Publish';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import User from './pages/User';

//components

import Header from './components/Header';
import SignUp from './components/SignUp';



function App() {
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showHero, setShowHero] = useState(false);
  const [token, setToken] = useState(Cookies.get('vintedAppConnect') || null);
  // const [account, setAccount] = useState(Cookies.get('vintedAppAcc') || null);
  const [isAdmin, setIsAdmin] = useState(Cookies.get('vintedAppAdm') || null);
  // console.log('token', token)
  const [search, setSearch] = useState("");
  const [type, setType] = useState('password');
  const [dataShoppingCart, setDataShoppingCart] = useState(() => {
    const savedShop = Cookies.get('vintedShoppingCart');
    try {
      return JSON.parse(savedShop);
    } catch (e) {
      console.error("Invalid JSON in cookie: ", e);
      return [];
    }
  });

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} show={show} setShow={setShow} search={search} setSearch={setSearch} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/login" element={<Login setToken={setToken} setIsAdmin={setIsAdmin} type={type} setType={setType} icon1="eye" icon2="eye-slash" />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/offers/:id" element={<Offer show={showHero} setDataShoppingCart={setDataShoppingCart} />} />
          <Route path="/payment" element={<Payment token={token} dataShoppingCart={dataShoppingCart} setDataShoppingCart={setDataShoppingCart} />} />
          <Route path="/dashboard" element={<Dashboard token={token} isAdmin={isAdmin} faNewspaper={faNewspaper} faXmark={faXmark} faUserTie={faUserTie} faUser={faUser} />} />
          <Route path='/users/:id' element={<User faUserTie={faUserTie} faNewspaper={faNewspaper} faXmark={faXmark} faUser={faUser} />} />
        </Routes>
        {show && <SignUp show={show} setShow={setShow} icon1="eye" icon2="eye-slash" setToken={setToken} type={type} setType={setType} />}
      </Router>
    </>
  )
}

export default App