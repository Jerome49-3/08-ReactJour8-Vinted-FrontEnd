// eslint-disable-next-line no-unused-vars
import * as dotenv from "dotenv";
import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faEye,
  faEyeSlash,
  faMoon,
  faSun,
  faNewspaper,
  faXmark,
  faUserTie,
  faUser,
  faRotateRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
library.add(
  faMagnifyingGlass,
  faEye,
  faHeart,
  faEyeSlash,
  faMoon,
  faSun,
  faNewspaper,
  faXmark,
  faUserTie,
  faUser,
  faRotateRight,
  farHeart
);
import { useState } from "react";
import Cookies from "js-cookie";

//Provider
import { UserProvider } from "./context/UserProvider";

//pages
import Home from "./pages/Home";
import OfferID from "./pages/OfferID";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Transactions from "./pages/Transactions";
import MyOffers from "./pages/MyOffers";
import MyPurchases from "./pages/MyPurchases";
import ConfirmEmail from "./pages/ConfirmEmail";
import PrivateRoute from "./pages/PrivateRoute";
import Favorites from "./pages/Favorites";
import Chat from "./pages/Chat";

//components
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Aside from "./components/Aside";
import ImgsModal from "./components/ImgsModal";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

function App() {
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showHero, setShowHero] = useState(false);
  const [showToggleNav, setShowToggleNav] = useState(false);
  const [showImgsModal, setShowImgsModal] = useState(false);
  const [srcImgsModal, setSrcImgsModal] = useState(null);
  // console.log("srcImgsModal in app:", srcImgsModal);
  const [showNoOffer, setShowNoOffer] = useState(false);

  // console.log('showToggleNav in app:', showToggleNav);
  const [priceMin, setPriceMin] = useState(0);
  // console.log('priceMin in app:', priceMin);
  const [priceMax, setPriceMax] = useState(0);
  // console.log('priceMax in app:', priceMax);
  const [search, setSearch] = useState("");
  console.log("search in app:", search);
  const [type, setType] = useState("password");
  const [dataShoppingCart, setDataShoppingCart] = useState(() => {
    const savedShop = Cookies.get("vintedShoppingCart");
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
          <Header
            show={show}
            setShow={setShow}
            search={search}
            setSearch={setSearch}
            showToggleNav={showToggleNav}
            setShowToggleNav={setShowToggleNav}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
          />
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  type={type}
                  setType={setType}
                  icon1="eye"
                  icon2="eye-slash"
                />
              }
            />
            <Route element={<PrivateRoute />}>
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    faNewspaper={faNewspaper}
                    faXmark={faXmark}
                    faUserTie={faUserTie}
                    faUser={faUser}
                  />
                }
              />
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route
                path="/payment"
                element={
                  <Payment
                    dataShoppingCart={dataShoppingCart}
                    setDataShoppingCart={setDataShoppingCart}
                  />
                }
              />
              <Route
                path="/favorites"
                element={<Favorites faHeart={faHeart} farHeart={farHeart} />}
              />
              <Route
                path="/users/:id"
                element={
                  <User
                    faUserTie={faUserTie}
                    faNewspaper={faNewspaper}
                    faXmark={faXmark}
                    faUser={faUser}
                  />
                }
              />
              <Route path="/transactions/:id" element={<Transactions />} />
              <Route
                path="/myOffers"
                element={
                  <MyOffers
                    faHeart={faHeart}
                    farHeart={farHeart}
                    showNoOffer={showNoOffer}
                    setShowNoOffer={setShowNoOffer}
                  />
                }
              />
              <Route
                path="/my-purchases"
                element={
                  <MyPurchases
                    faHeart={faHeart}
                    farHeart={farHeart}
                    showNoOffer={showNoOffer}
                    setShowNoOffer={setShowNoOffer}
                  />
                }
              />
            </Route>
            <Route path="/confirmemail" element={<ConfirmEmail />} />
            <Route
              path="/publish"
              element={<Publish faRotateRight={faRotateRight} />}
            />
            <Route
              path="/offers/:id"
              element={
                <OfferID
                  show={showHero}
                  setDataShoppingCart={setDataShoppingCart}
                  showImgsModal={showImgsModal}
                  setShowImgsModal={setShowImgsModal}
                  setSrcImgsModal={setSrcImgsModal}
                />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  search={search}
                  faHeart={faHeart}
                  farHeart={farHeart}
                  showToggleNav={showToggleNav}
                  setShowToggleNav={setShowToggleNav}
                />
              }
            />
          </Routes>
          <Footer />
          {show && (
            <SignUp
              show={show}
              setShow={setShow}
              icon1="eye"
              icon2="eye-slash"
              type={type}
              setType={setType}
            />
          )}
          {showImgsModal && (
            <ImgsModal
              showImgsModal={showImgsModal}
              setShowImgsModal={setShowImgsModal}
              srcImgsModal={srcImgsModal}
            />
          )}
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
