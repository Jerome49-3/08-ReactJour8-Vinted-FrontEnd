/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import * as dotenv from "dotenv";
import "./assets/css/App.css";
//Provider
import { UserProvider } from "./context/UserProvider";
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
  faChevronCircleLeft,
  faChevronCircleRight,
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
  faCircleXmark,
  faChevronCircleLeft,
  faChevronCircleRight
);
import { useState } from "react";
import Cookies from "js-cookie";

//components
import SignUp from "./components/SignUp";
import ImgsModal from "./components/ImgsModal";
import Aside from "./components/Aside";
// import AppLayout from "./Layout/AppLayout";
import ErrorPage from "./errorPage/ErrorPage";
import Profile from "./components/Profile";
import DashboardUsers from "./components/DashboardUsers";
import DashboardMessages from "./components/DashboardMessages";
import DashboardOffers from "./components/DashboardOffers";
import DashboardSales from "./components/DashboardSales";
import Header from "./components/Header";
import Footer from "./components/Footer";
//Layout
import PrivateLayout from "./Layout/PrivateLayout";

//pages
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import MessagesContactId from "./pages/MessagesContactId";
import Payment from "./pages/Payment";
import Favorites from "./pages/Favorites";
import UserId from "./pages/UserId";
import MyOffers from "./pages/MyOffers";
import MyPurchases from "./pages/MyPurchases";
import Transactions from "./pages/Transactions";
import Publish from "./pages/Publish";
import Contact from "./pages/Contact";
import OfferIdUpdateAndDelete from "./pages/OfferIdUpdateAndDelete";
import Login from "./pages/Login";
import ConfirmEmail from "./pages/ConfirmEmail";
import ResetPsswd from "./pages/ResetPsswd";
import ForgotPsswd from "./pages/ForgotPsswd";
import Home from "./pages/Home";
import OfferID from "./pages/OfferID";

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  // console.log("showSignUp in app:", showSignUp);
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
  const [page, setPage] = useState(1);
  const [countDoc, setCountDoc] = useState(0);
  // console.log("priceMin in app:", priceMin);
  // console.log("typeof priceMin in app:", typeof priceMin);
  const [priceMax, setPriceMax] = useState("100000");
  // console.log("typeof priceMax in app:", typeof priceMax);
  const [search, setSearch] = useState("");
  // console.log("search in app:", search);
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");
  const [searchUsers, setSearchUsers] = useState("");
  const [numberCommand, setNumberCommand] = useState("");
  // console.log("numberCommand in app:", numberCommand);
  // const [searchOffer, setSearchOffer] = useState("");
  // const [searchMessage, setSearchMessage] = useState("");
  const [searchTransactions, setSearchTransactions] = useState("");
  // console.log("searchTransactions in app:", searchTransactions);
  const [dataShoppingCart, setDataShoppingCart] = useState(() => {
    const savedShop = Cookies.get("vintedShoppingCart");
    try {
      return JSON.parse(savedShop);
    } catch (error) {
      return [];
    }
  });
  //********** State price for publish, offerId and payment ***********/
  let [price, setPrice] = useState(0);
  // console.log("price in app:", price);
  //********** State quantity for publish, offerId and payment ***********/
  let [quantity, setQuantity] = useState(0);
  console.log("quantity in app:", quantity);
  //********** State dimensions div Hero ***********/
  const [dimDiv, setDimDiv] = useState({});
  //**********************************************************************/
  const [checked, setChecked] = useState(false);
  //**********************************************************************/
  return (
    <Router>
      <UserProvider>
        <main className="layout">
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
          <section className="sectionContent">
            <Routes>
              <Route
                path="/*"
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
                    page={page}
                    setPage={setPage}
                    faChevronCircleLeft={faChevronCircleLeft}
                    faChevronCircleRight={faChevronCircleRight}
                    countDoc={countDoc}
                    setCountDoc={setCountDoc}
                  />
                }
              />
              {/* <Route path="*" errorElement={<ErrorPage />} /> */}
              <Route
                path="login"
                element={
                  <Login
                    type={type}
                    setType={setType}
                    faEye={faEye}
                    faEyeSlash={faEyeSlash}
                    showSignUp={showSignUp}
                  />
                }
              />
              <Route
                path="confirmEmail"
                element={
                  <ConfirmEmail
                    emailSended={emailSended}
                    setEmailIsConfirmed={setEmailIsConfirmed}
                    setEmailSended={setEmailSended}
                  />
                }
              />
              <Route
                path="resendEmailPsswd"
                element={<ResetPsswd setEmailSended={setEmailSended} />}
              />
              <Route
                path="forgotPassword"
                element={
                  <ForgotPsswd
                    emailIsConfirmed={emailIsConfirmed}
                    type={type}
                    setType={setType}
                    faEye={faEye}
                    faEyeSlash={faEyeSlash}
                    type2={type2}
                    setType2={setType2}
                  />
                }
              />
              <Route
                index
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
                    page={page}
                    setPage={setPage}
                    faChevronCircleLeft={faChevronCircleLeft}
                    faChevronCircleRight={faChevronCircleRight}
                    countDoc={countDoc}
                    setCountDoc={setCountDoc}
                    setDimDiv={setDimDiv}
                  />
                }
              />
              <Route
                path="offers/:id"
                element={
                  <OfferID
                    setDataShoppingCart={setDataShoppingCart}
                    showImgsModal={showImgsModal}
                    setShowImgsModal={setShowImgsModal}
                    setSrcImgsModal={setSrcImgsModal}
                    faTrash={faTrash}
                    price={price}
                    setPrice={setPrice}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                }
              />
              <Route element={<PrivateLayout />}>
                <Route path="contact" element={<Contact />} />
                <Route
                  path="dashboard/*"
                  element={
                    <Dashboard
                      faNewspaper={faNewspaper}
                      faXmark={faXmark}
                      faUserTie={faUserTie}
                      faUser={faUser}
                      search={search}
                      searchUsers={searchUsers}
                      numberCommand={numberCommand}
                      setNumberCommand={setNumberCommand}
                      searchTransactions={searchTransactions}
                      setSearchTransactions={setSearchTransactions}
                      setSearchUsers={setSearchUsers}
                    />
                  }
                >
                  <Route
                    path="dashUsers/"
                    element={
                      <DashboardUsers
                        faNewspaper={faNewspaper}
                        faXmark={faXmark}
                        faUserTie={faUserTie}
                        faUser={faUser}
                        searchUsers={searchUsers}
                      />
                    }
                  />
                  <Route path="dashMessages/" element={<DashboardMessages />} />
                  <Route path="dashOffers/" element={<DashboardOffers />} />
                  <Route
                    path="dashSales/"
                    element={
                      <DashboardSales
                        numberCommand={numberCommand}
                        setNumberCommand={setNumberCommand}
                        searchTransactions={searchTransactions}
                        setSearchTransactions={setSearchTransactions}
                      />
                    }
                  />
                </Route>
                <Route path="chat" element={<Chat />} />
                <Route
                  path="profile/:id"
                  element={<Profile faTrash={faTrash} />}
                />
                <Route
                  path="messagesContactId/:id"
                  element={<MessagesContactId />}
                />
                <Route
                  path="payment"
                  element={
                    <Payment
                      dataShoppingCart={dataShoppingCart}
                      setDataShoppingCart={setDataShoppingCart}
                    />
                  }
                />
                <Route
                  path="favorites"
                  element={<Favorites faHeart={faHeart} farHeart={farHeart} />}
                />
                <Route
                  path="userId/:id"
                  element={
                    <UserId
                      faUserTie={faUserTie}
                      faNewspaper={faNewspaper}
                      faXmark={faXmark}
                      faUser={faUser}
                      faTrash={faTrash}
                      checked={checked}
                      setChecked={setChecked}
                    />
                  }
                />
                <Route path="transactions/:id" element={<Transactions />} />
                <Route
                  path="myOffers"
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
                  path="my-purchases"
                  element={
                    <MyPurchases
                      faHeart={faHeart}
                      farHeart={farHeart}
                      // showNoOffer={showNoOffer}
                      // setShowNoOffer={setShowNoOffer}
                    />
                  }
                />
                <Route
                  path="publish"
                  element={
                    <Publish
                      faRotateRight={faRotateRight}
                      faTrash={faTrash}
                      price={price}
                      setPrice={setPrice}
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  }
                />
                <Route
                  path="offerUpdate/:id"
                  element={<OfferIdUpdateAndDelete faTrash={faTrash} />}
                />
              </Route>
            </Routes>
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
                faCircleXmark={faCircleXmark}
              />
            )}
            {showSignUp && (
              <SignUp
                showSignUp={showSignUp}
                setShowSignUp={setShowSignUp}
                type={type}
                setType={setType}
                faEye={faEye}
                faEyeSlash={faEyeSlash}
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
          </section>
          <Footer />
        </main>
      </UserProvider>
    </Router>
  );
}

export default App;
