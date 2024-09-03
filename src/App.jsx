// eslint-disable-next-line no-unused-vars
import * as dotenv from 'dotenv';
import './assets/css/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faEye, faEyeSlash, faMoon, faSun, faNewspaper, faXmark, faUserTie, faUser, faRotateRight } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faEye, faEyeSlash, faMoon, faSun, faNewspaper, faXmark, faUserTie, faUser, faRotateRight);
import { useState } from 'react';
import Cookies from 'js-cookie';

//Provider
import { UserProvider } from './context/UserProvider';

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
import PrivateRoute from './pages/PrivateRoute';
import Aside from './components/Aside';



function App() {
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showHero, setShowHero] = useState(false);
  const [showToggleNav, setShowToggleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState('password');
  const [dataShoppingCart, setDataShoppingCart] = useState(() => {
    const savedShop = Cookies.get('vintedShoppingCart');
    try {
      return JSON.parse(savedShop);
    } catch (error) {
      return [];
    }
  });

  return (
    <>
      <Router>
        <UserProvider>
          <Header show={show} setShow={setShow} search={search} setSearch={setSearch} />
          <Routes>
            <Route path="/login" element={<Login type={type} setType={setType} icon1="eye" icon2="eye-slash" />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard faNewspaper={faNewspaper} faXmark={faXmark} faUserTie={faUserTie} faUser={faUser} />} />
              <Route path="/payment" element={<Payment dataShoppingCart={dataShoppingCart} setDataShoppingCart={setDataShoppingCart} />} />
              <Route path='/users/:id' element={<User faUserTie={faUserTie} faNewspaper={faNewspaper} faXmark={faXmark} faUser={faUser} />} />
            </Route>
            <Route path="/publish" element={<Publish faRotateRight={faRotateRight} />} />
            <Route path="/" element={<Home search={search} />} />
            <Route path="/offers/:id" element={<Offer show={showHero} setDataShoppingCart={setDataShoppingCart} />} />
          </Routes>
          {show && <SignUp show={show} setShow={setShow} icon1="eye" icon2="eye-slash" type={type} setType={setType} />}
          {showToggleNav && <Aside showToggleNav={showToggleNav} />}
        </UserProvider>
      </Router>
    </>
  )
}

export default App