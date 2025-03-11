/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-else-if */
/* eslint-disable react-hooks/exhaustive-deps */
import * as dotenv from "dotenv";
import { createContext, useEffect, useState, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import axiosRetry from "axios-retry";
import saveToken from "../assets/lib/saveToken";
import { useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [showHero, setShowHero] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [infoUser, setInfoUser] = useState("");
  const [showTrash, setShowTrash] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  // console.log("showSearch in userProvider:", showSearch);
  let location = useLocation();
  // console.log("location.pathname in userProvider:", location.pathname);

  const [token, setToken] = useState(Cookies.get("accessTokenV") || null);
  // console.log("token in UserProvider:", token);
  const [user, setUser] = useState(
    sessionStorage.getItem("vintaidUser") || null
  );
  const [avatar, setAvatar] = useState(null);
  const [avatarOffer, setAvatarOffer] = useState(null);
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
  const [isLoading, setIsLoading] = useState(true);
  // console.log("user in UserProvider:", user);
  const navigate = useNavigate();
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
  const [tokenFgtP, setTokenFgtP] = useState(
    sessionStorage.getItem("tokenFgtP") || null
  );
  // console.log("tokenFgtP in userProvider:", tokenFgtP);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowSearch(true);
      setShowHero(true);
    } else {
      setShowSearch(false);
      setShowHero(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (token) {
      // console.log("token in useEffect on UserProvider:", token);
      const verifyToken = async () => {
        try {
          const response = await axios.post(
            `http://localhost:3000/user/verifyToken`,
            {}
          );
          // console.log("response in /user/verifyToken:", response);
          // console.log(
          //   "typeof response in /user/verifyToken:",
          //   typeof response.status
          // );
          if (
            response.status ===
              Number(import.meta.env.VITE_REACT_APP_RESPONSEVALID) &&
            response.data.message ===
              import.meta.env.VITE_REACT_APP_RESPONSEDATAVALID
          ) {
            // console.log(
            //   "import.meta.env.RESPONSEVALID in /user/verifyToken:",
            //   import.meta.env.VITE_REACT_APP_RESPONSEVALID
            // );
            // console.log(
            //   "import.meta.env.RESPONSEDATAVALID in /user/verifyToken:",
            //   import.meta.env.VITE_REACT_APP_RESPONSEDATAVALID
            // );
            // console.log("token in /verifyToken:", token);
            saveToken(token, setUser, setIsAdmin, setImgBoxUser);
          } else {
            const getToken = async () => {
              try {
                const response = await axios.get(
                  `http://localhost:3000/user/refreshToken`
                );
                // console.log("response in /user/refreshToken:", response);
                if (response?.data?.token) {
                  setToken(response?.data?.token);
                  saveToken(
                    response?.data?.token,
                    setUser,
                    setIsAdmin,
                    setImgBoxUser
                  );
                  setIsLoading(false);
                }
              } catch (error) {
                // console.log("error in /refreshToken:", error);

                // console.log(error?.response?.data?.message || error?.message);
                // console.log(
                //   "error?.response?.status:",
                //   error?.response?.status
                // );
                // console.log(
                //   "typeof error?.response?.status:",
                //   typeof error?.response?.status
                // );
                if (error?.response?.status === 401) {
                  navigate("/");
                }
              }
            };
            getToken();
          }
        } catch (error) {
          console.log("error:", error.response);
        }
      };
      verifyToken();
    } else {
      navigate("/");
    }
  }, [token, axios]);

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

  useLayoutEffect(() => {
    const configRequestGlobal = axios.interceptors.request.use(
      (config) => {
        // console.log("config in userProvider:", config);
        config.withCredentials = true;
        config.headers.Authorization = token
          ? `Bearer ${token}`
          : `Bearer ${tokenFgtP}`;
        // console.log("tokenFgtP in axios.interceptors.request:", tokenFgtP);

        config.headers["Content-Type"] =
          "multipart/form-data" || "application/json";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(configRequestGlobal);
    };
  }, [token, axios]);

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("response in logout", response);
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
        data,
        setData,
        showHero,
        avatarOffer,
        setAvatarOffer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
