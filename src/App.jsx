import * as dotenv from 'dotenv';
import './assets/css/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faEye, faEyeSlash);
import { useState } from 'react';
import Cookies from 'js-cookie'


//pages
import Home from './pages/Home';
import Offer from './pages/Offer';
import Login from './pages/Login';
import Publish from './pages/Publish';
import Payment from './pages/Payment';

//components

import Header from './components/Header';
import SignUp from './components/SignUp';



function App() {
  const [show, setShow] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [token, setToken] = useState(Cookies.get('vintedAppConnect') || null);
  const [isAdmin, setIsAdmin] = useState(Cookies.get('vintedAppAdmin') || null);
  // console.log('token', token)
  const [search, setSearch] = useState("");
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
        <Header token={token} setToken={setToken} show={show} setShow={setShow} search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/offers/:id" element={<Offer show={showHero} setDataShoppingCart={setDataShoppingCart} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment token={token} dataShoppingCart={dataShoppingCart} setDataShoppingCart={setDataShoppingCart} />} />
        </Routes>
        {show && <SignUp show={show} setShow={setShow} icon1="eye" icon2="eye-slash" setToken={setToken} />}
      </Router>
    </>
  )
}

export default App
