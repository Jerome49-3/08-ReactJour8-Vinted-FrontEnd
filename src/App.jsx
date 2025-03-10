/* eslint-disable no-unused-vars */
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
  faFilter,
  faTrash,
  faCircleXmark,
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
  farHeart,
  faFilter,
  faTrash,
  faCircleXmark
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
import Transactions from "./pages/Transactions";
import MyOffers from "./pages/MyOffers";
import MyPurchases from "./pages/MyPurchases";
import ConfirmEmail from "./pages/ConfirmEmail";
import PrivateRoute from "./pages/PrivateRoute";
import Favorites from "./pages/Favorites";
import Chat from "./pages/Chat";
import UserId from "./pages/UserId";
import Contact from "./pages/Contact";
import ForgotPsswd from "./pages/ForgotPsswd";
import ResendEmail from "./pages/ResendEmail";
import MessagesContactId from "./pages/MessagesContactId";
//components
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import ImgsModal from "./components/ImgsModal";
import Profile from "./components/Profile";
import Aside from "./components/Aside";
import Footer from "./components/Footer";

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  console.log("showSignUp in app:", showSignUp);
  const [showHero, setShowHero] = useState(false);
  const [showToggleNav, setShowToggleNav] = useState(false);
  // console.log('showToggleNav in app:', showToggleNav);
  const [showImgsModal, setShowImgsModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [srcImgsModal, setSrcImgsModal] = useState(null);
  const [emailSended, setEmailSended] = useState(false);
  const [emailIsConfirmed, setEmailIsConfirmed] = useState(false);
  // console.log("srcImgsModal in app:", srcImgsModal);
  const [showNoOffer, setShowNoOffer] = useState(false);
  const [priceMin, setPriceMin] = useState("0");
  // console.log("priceMin in app:", priceMin);
  // console.log("typeof priceMin in app:", typeof priceMin);
  const [priceMax, setPriceMax] = useState("100000");
  // console.log("typeof priceMax in app:", typeof priceMax);
  const [search, setSearch] = useState("");
  // console.log("search in app:", search);
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
            showSignUp={showSignUp}
            setShowSignUp={setShowSignUp}
            search={search}
            setSearch={setSearch}
            showToggleNav={showToggleNav}
            setShowToggleNav={setShowToggleNav}
            faFilter={faFilter}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
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
            <Route
              path="/confirmemail"
              element={
                <ConfirmEmail
                  emailSended={emailSended}
                  setEmailIsConfirmed={setEmailIsConfirmed}
                />
              }
            />
            <Route
              path="/resendEmail"
              element={<ResendEmail setEmailSended={setEmailSended} />}
            />
            <Route
              path="/forgotPassword"
              element={<ForgotPsswd emailIsConfirmed={emailIsConfirmed} />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    faNewspaper={faNewspaper}
                    faXmark={faXmark}
                    faUserTie={faUserTie}
                    faUser={faUser}
                    search={search}
                  />
                }
              />
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route
                path="/messagesContactId/:id"
                element={<MessagesContactId />}
              />
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
                path="/userId/:id"
                element={
                  <UserId
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
                    faTrash={faTrash}
                  />
                }
              />
              <Route
                path="/my-purchases"
                element={
                  <MyPurchases
                    faHeart={faHeart}
                    farHeart={farHeart}
                    // showNoOffer={showNoOffer}
                    // setShowNoOffer={setShowNoOffer}
                  />
                }
              />
            </Route>
            <Route
              path="/publish"
              element={
                <Publish faRotateRight={faRotateRight} faTrash={faTrash} />
              }
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
                  priceMin={priceMin}
                  priceMax={priceMax}
                  showFilter={showFilter}
                  setShowFilter={setShowFilter}
                />
              }
            />
          </Routes>
          <Footer />
          {showToggleNav && (
            <Aside
              search={search}
              showToggleNav={showToggleNav}
              setShowToggleNav={setShowToggleNav}
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
            />
          )}
          {showSignUp && (
            <SignUp
              showSignUp={showSignUp}
              setShowSignUp={setShowSignUp}
              icon1="eye"
              icon2="eye-slash"
              type={type}
              setType={setType}
              faCircleXmark={faCircleXmark}
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
