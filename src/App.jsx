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
import Publish from './pages/Publish';


//components

import Header from './components/Header';
import SignIn from './components/SignIn';


function App() {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(Cookies.get('vintedApp') || null);
  const [search, setSearch] = useState("");

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} show={show} setShow={setShow} search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<SignUp icon1="eye" icon2="eye-slash" setToken={setToken} />} />
          <Route path="/login" element={<SignIn setToken={setToken} />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
        {show && <SignIn show={show} setShow={setShow} />}
      </Router>
    </>
  )
}

export default App
