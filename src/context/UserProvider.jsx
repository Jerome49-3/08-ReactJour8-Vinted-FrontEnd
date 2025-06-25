/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-else-if */
/* eslint-disable react-hooks/exhaustive-deps */

//******** env ******** //
import * as dotenv from "dotenv";

//******** react && react-dom ******** //
import { createContext, useEffect, useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//******** Cookies ******** //
import Cookies from "js-cookie";

//******** axios && axiosRetry ******** //
import axios from "axios";
import axiosRetry from "axios-retry";

//******** lib ******** //
import saveToken from "../assets/lib/saveToken";
import setDimensions from "../assets/lib/setDimensions";
import addRemoveListener from "../assets/lib/addRemoveListener";
import fetchVerifyToken from "../assets/fetchDataLib/auth/GET/fetchVerifyToken";

//******** context ******** //
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //******** showHero >img Banner on Home ******** //
  const [showHero, setShowHero] = useState(false);
  //******** isSended > state for input submit ******** //
  const [isSended, setIsSended] = useState(false);
  //******** isSendedTrash > state for btn trash ******** //
  const [isSendedTrash, setIsSendedTrash] = useState(false);
  //******** showSearch > state for input search ******** //
  const [showSearch, setShowSearch] = useState(false);
  // console.log("showSearch in userProvider:", showSearch);
  //******** infoUser > state for info user after update/delete ******** //
  const [infoUser, setInfoUser] = useState("");
  //******** showTrash > state for appear btn Trash ******** //
  const [showTrash, setShowTrash] = useState(false);
  //******** errorMessage > state for appear error's message ******** //
  const [errorMessage, setErrorMessage] = useState("");
  //******** dimWindows > state for set dimensions windows ******** //
  let [dimWindows, setDimWindows] = useState({});
  //******** useLocation > useLocation ******** //
  let location = useLocation();
  //******** items > items per page ******** //
  const items = 5;
  // console.log("location.pathname in userProvider:", location.pathname);
  //******** token > token ******** //
  const [token, setToken] = useState(Cookies.get("accessTokenV") || null);
  // console.log("token in UserProvider:", token);
  //******** user > user ******** //
  const [user, setUser] = useState(
    sessionStorage.getItem("vintaidUser") || null
  );
  //******** nbrCards > set Number of cards ******** //
  const [nbrCards, setNbrCards] = useState(0);
  //******** data > data ******** //
  const [data, setData] = useState(null);
  //******** avatar > state for set picture's user before update ******** //
  const [avatar, setAvatar] = useState(null);
  //******** avatarOffer > state for set picture's offer before update ******** //
  const [avatarOffer, setAvatarOffer] = useState(null);
  //******** connexion online or offline ******** //
  const [connexionNet, setConnexionNet] = useState({});
  //******** imgBoxUser > state for set picture's user in header ******** //
  const [imgBoxUser, setImgBoxUser] = useState(() => {
    const imgSessStorage = sessionStorage.getItem("vintaidImgBoxUser");
    if (imgSessStorage) {
      return imgSessStorage;
    } else {
      const imgDefault =
        "https://res.cloudinary.com/djk45mwhr/image/upload/fl_preserve_transparency/v1718626269/tjognak2go4rnl4dl1xl.jpg?_s=public-apps";
      return imgDefault;
    }
  });
  // console.log("imgBoxUser: in userProvider:", imgBoxUser);
  // console.log("typeof imgBoxUser: in userProvider:", typeof imgBoxUser);
  // const avatarSecureUrl = user?.account?.avatar?.secure_url;
  // const avatarUrl = user?.account?.avatar;
  // console.log("avatarSecureUrl: in userProvider:", avatarSecureUrl);
  // console.log(
  //   "typeof avatarSecureUrl: in userProvider:",
  //   typeof avatarSecureUrl
  // );
  // console.log("typeof avatarUrl: in userProvider:", typeof avatarUrl);
  //******** isLoading > state for appear loader before data is loaded ******** //
  const [isLoading, setIsLoading] = useState(true);
  // console.log("user in UserProvider:", user);
  const navigate = useNavigate();
  //******** isAdmin >isAdmin ******** //
  const [isAdmin, setIsAdmin] = useState(() => {
    const newAdmin = sessionStorage.getItem("vintaidTeam");
    if (newAdmin) {
      try {
        const admin = Boolean(newAdmin);
        // console.log("admin in isAdmin:", admin);
        return admin;
      } catch (error) {
        console.log("Erreur Boolean isAdmin:", error);
        return false;
      }
    }
  });
  //******** fav > state for save favorites ******** //
  const [fav, setFav] = useState(() => {
    const savedFav = localStorage.getItem("favCard");
    // console.log("savedFav in app:", savedFav);
    //if trythy
    if (savedFav) {
      try {
        const favStored = JSON.parse(savedFav);
        return favStored ? favStored : [];
      } catch (error) {
        //if null or undefined
        console.log("Erreur du parsing de savedFav:", error);
        return [];
      }
    }
    return [];
  });
  //****************************************************** //
  //******** tokenFgtP > state for reset password ******** //
  //****************************************************** //
  const [tokenFgtP, setTokenFgtP] = useState(
    sessionStorage.getItem("tokenFgtP") || null
  );
  // console.log("tokenFgtP in userProvider:", tokenFgtP);

  //****************************************** //
  //******* set showSearch && showHero ******* //
  //****************************************** //
  useEffect(() => {
    if (location.pathname === "/") {
      setShowSearch(true);
      setShowHero(true);
    } else {
      setShowSearch(false);
      setShowHero(false);
    }
  }, [location.pathname]);
  //****************************************** //
  //******** Listen connection *************** //
  //****************************************** //
  // useEffect(() => {
  //   window.addEventListener("offline", (event) => {
  //     console.log("The network connection has been lost:", event);
  //   });
  //   return () =>
  //     window.removeEventListener("resize", setDimensions(setDimWindows));
  // }, []);

  //****************************************** //
  //******** token verify and refresh ******** //
  //****************************************** //
  useEffect(() => {
    if (token) {
      console.log("token in useEffect on UserProvider:", token);
      const verifyToken = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_URL}/user/verifyToken`,
            {}
          );
          // console.log("response in /user/verifyToken:", response);
          if (
            response.status ===
              Number(import.meta.env.VITE_REACT_APP_RESPONSEVALID) &&
            response.data.message ===
              import.meta.env.VITE_REACT_APP_RESPONSEDATAVALID
          ) {
            console.log(
              "import.meta.env.RESPONSEVALID in /user/verifyToken:",
              import.meta.env.VITE_REACT_APP_RESPONSEVALID
            );
            console.log(
              "import.meta.env.RESPONSEDATAVALID in /user/verifyToken:",
              import.meta.env.VITE_REACT_APP_RESPONSEDATAVALID
            );
            // console.log("token in /verifyToken:", token);
            saveToken(token, setUser, setIsAdmin, setImgBoxUser);
          }
        } catch (error) {
          console.log("error:", error.response);
        }
      };
      verifyToken();
    } else {
      navigate("/login");
    }
  }, [token, axios]);

  //****************************************** //
  //********** listen event resize *********** //
  //****************************************** //
  useEffect(() => {
    return addRemoveListener("resize", () => setDimensions(setDimWindows));
  }, [location.pathname]);

  useEffect(() => {
    return addRemoveListener("load", () => setDimensions(setDimWindows));
  }, [location.pathname]);

  //****************************************** //
  //*************** axiosRetry *************** //
  //****************************************** //
  useLayoutEffect(() => {
    axiosRetry(axios, {
      retries: 3,
      retryDelay: (retryCount) => {
        return retryCount * 1000;
      },
      retryCondition: (error) => {
        return (
          error.response &&
          (error.response.status === 500 || error.response.status === 503)
        );
      },
    });
  }, []);

  //****************************************** //
  //***************** logout ***************** //
  //****************************************** //
  const logout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log("response in logout", response);
      if (response) {
        setToken(null);
        setUser(null);
        setIsAdmin(false);
        setImgBoxUser(null);
        sessionStorage.clear();
        Cookies.remove("accessTokenV");
        Cookies.remove("refreshTokenV");
      }
    } catch (error) {
      console.log("Error in logout:", error || "error in logout");
    }
  };
  //************************************************** //
  //************ axios.interceptors.request ********** //
  //************************************************** //
  useLayoutEffect(() => {
    if (
      location.pathname !== "/confirmEmail" ||
      location.pathname !== "/resendEmailPsswd" ||
      location.pathname !== "/forgotPassword"
    ) {
      const configRequestGlobal = axios.interceptors.request.use(
        (config) => {
          config.withCredentials = true;
          config.headers.Authorization = `Bearer ${token}`;
          config.headers["Content-Type"] =
            config.method === "post" || config.method === "put"
              ? "multipart/form-data"
              : "application/json";
          // console.group("log axios.interceptor:");
          // console.log("config in userProvider:", config);
          // console.log(
          //   "config.headersContent-Type in userProvider:",
          //   config.headers["Content-Type"]
          // );
          // console.groupEnd();
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      return () => {
        axios.interceptors.request.eject(configRequestGlobal);
      };
    }
  }, [token, tokenFgtP, location.pathname]);

  //*************************************************** //
  //************ axios.interceptors.response ********** //
  //*************************************************** //

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      console.log("error.config:", error.config);
      const originalRequest = error.config;
      originalRequest._retry = false;
      console.log("originalRequest:", originalRequest);

      console.log(
        "error.response in axios.interceptors.response:",
        error.response
      );
      console.log("originalRequest._retry before if:", originalRequest._retry);
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log("originalRequest._retry after if:", originalRequest._retry);
        try {
          const newRefreshToken = await fetchVerifyToken(
            axios,
            setToken,
            saveToken,
            setUser,
            setIsAdmin,
            setImgBoxUser,
            setIsLoading,
            navigate,
            error
          );
          error.config.headers["Authorization"] = `Bearer ${newRefreshToken}`;
          console.log(
            "error.config.headers.Authorization:",
            error.config.headers["Authorization"]
          );
          return axios(originalRequest);
        } catch (errorRefresh) {
          console.error("refreshToken failed:", errorRefresh);
          logout();
          return Promise.reject(errorRefresh);
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  //*************************************************** //
  //**************** return provider ****************** //
  //*************************************************** //

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        logout,
        isAdmin,
        setIsAdmin,
        isSended,
        setIsSended,
        axios,
        data,
        setData,
        fav,
        setFav,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        avatar,
        setAvatar,
        imgBoxUser,
        setImgBoxUser,
        showSearch,
        tokenFgtP,
        setTokenFgtP,
        infoUser,
        setInfoUser,
        showTrash,
        setShowTrash,
        location,
        showHero,
        avatarOffer,
        setAvatarOffer,
        isSendedTrash,
        setIsSendedTrash,
        items,
        nbrCards,
        setNbrCards,
        dimWindows,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
