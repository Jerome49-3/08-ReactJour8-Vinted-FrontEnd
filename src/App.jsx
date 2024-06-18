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
import Login from './pages/Login';
import Publish from './pages/Publish';


//components

import Header from './components/Header';
import SignUp from './components/SignUp';


function App() {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(Cookies.get('vintedApp') || null);
  console.log('token', token)
  const [search, setSearch] = useState("");

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} show={show} setShow={setShow} search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
        </Routes>
        {show && <SignUp show={show} setShow={setShow} icon1="eye" icon2="eye-slash" setToken={setToken} />}
      </Router>
    </>
  )
}

export default App
