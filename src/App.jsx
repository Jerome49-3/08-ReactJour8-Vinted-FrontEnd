// import 'dotenv/config'
import './assets/css/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass);
import { useState } from 'react';


//pages
import Home from './pages/Home';
import Offer from './pages/Offer';
import SignUp from './pages/SignUp';
import SealIt from './pages/SealIt';
import OfferDetails from './pages/OfferDetails';


//components

import Header from './components/Header';
import Hero from './components/Hero';
import SignIn from './components/SignIn';


function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Router>
        <Header show={show} setShow={setShow} />
        <Hero />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sealit" element={<SealIt />} />
        </Routes>
        {show && <SignIn show={show} setShow={setShow} />}
      </Router>
    </>
  )
}

export default App
