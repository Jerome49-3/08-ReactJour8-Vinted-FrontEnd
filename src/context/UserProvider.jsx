/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-else-if */
/* eslint-disable react-hooks/exhaustive-deps */
import * as dotenv from "dotenv";
import { createContext, useEffect, useState, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import axiosRetry from "axios-retry";
import saveToken from "../assets/lib/saveToken";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("accessTokenV") || null);
  // console.log("token in UserProvider:", token);
  const [user, setUser] = useState(
    sessionStorage.getItem("vintaidUser") || null
  );
  const [avatar, setAvatar] = useState(null);
  const [imgBoxUser, setImgBoxUser] = useState(
    sessionStorage.getItem("vintaidImgBoxUser") || null
  );
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
  const [isLoading, setIsLoading] = useState(null);
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

  useEffect(() => {
    if (token) {
      // console.log("token in useEffect on UserProvider:", token);
      const verifyToken = async () => {
        try {
          const response = await axios.post(
            `http://localhost:3000/user/verifyToken`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "multipart/form-data",
              },
            }
          );
          console.log("response in /user/verifyToken:", response);
          console.log(
            "typeof response in /user/verifyToken:",
            typeof response.status
          );
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
          }
        } catch (error) {
          const getToken = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3000/user/refreshToken`
              );
              console.log("response in /user/refreshToken:", response);
              if (response?.data?.token) {
                setToken(response?.data?.token);
                saveToken(
                  response?.data?.token,
                  setUser,
                  setIsAdmin,
                  setImgBoxUser
                );
                setIsLoading(false);
              } else {
                console.log("response?.status:", response?.status);
              }
            } catch (error) {
              console.log(error?.response?.data?.message || error?.message);
              console.log("error?.response?.status:", error?.response?.status);
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
        config.headers.Authorization = token ? `Bearer ${token}` : null;
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
        axios,
        fav,
        setFav,
        isLoading,
        setIsLoading,
        avatar,
        setAvatar,
        imgBoxUser,
        setImgBoxUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
