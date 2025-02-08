import { createContext, useEffect, useState, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import axiosRetry from "axios-retry";
import saveToken from "../assets/lib/saveToken";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("accessTokenV") || null);
  // console.log("token in UserProvider:", token);
  const [user, setUser] = useState(
    sessionStorage.getItem("vintaidUser") || null
  );
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("user in UserProvider:", user);
  const [isAdmin, setIsAdmin] = useState(() => {
    const newAdmin = sessionStorage.getItem("vintaidTeam");
    if (newAdmin) {
      try {
        const admin = Boolean(newAdmin);
        console.log("admin in isAdmin:", admin);
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
      try {
        saveToken(token, setUser, setIsAdmin);
      } catch (error) {
        console.log("error after saveToken:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    console.log("token in useEffect on userProvider:", token);
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(
          `http://localhost:3000/user/refreshToken`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        // console.log("response in /user/refreshToken:", response);
        if (response?.data?.token) {
          setToken(response?.data?.token);
          saveToken(response?.data?.token, setUser, setIsAdmin);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error?.response?.data?.message || "update token failed");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setAvatar(user?.account?.avatar?.secure_url);
  }, [user]);

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
        config.headers.authorization = token
          ? `Bearer ${token}`
          : config.headers.authorization;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(configRequestGlobal);
    };
  }, [token]);

  const logout = () => {
    try {
      setToken(null);
      setUser(null);
      setIsAdmin(false);
      Cookies.remove("accessTokenV");
      Cookies.remove("refreshTokenV");
      sessionStorage.clear();
      localStorage.removeItem("favCard");
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
