// import 'dotenv/config'
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
import SignUp from './pages/SignUp';
import SealIt from './pages/SealIt';
import OfferDetails from './pages/OfferDetails';


//components

import Header from './components/Header';
import SignIn from './components/SignIn';


function App() {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(Cookies.get('vintedApp') || null)

  return (
    <>
      <Router>
        <Header show={show} setShow={setShow} token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/signup" element={<SignUp icon1="eye" icon2="eye-slash" setToken={setToken} />} />
          <Route path="/login" element={<SignIn setToken={setToken} />} />
          <Route path="/sealit" element={<SealIt />} />
        </Routes>
        {show && <SignIn show={show} setShow={setShow} />}
      </Router>
    </>
  )
}

export default App
