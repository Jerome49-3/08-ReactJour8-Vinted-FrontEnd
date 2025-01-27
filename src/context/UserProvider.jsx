import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import saveToken from "../assets/lib/saveToken";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("accessTokenV") || null);
  console.log("token in UserProvider:", token);
  const [user, setUser] = useState(null);
  console.log("user in UserProvider:", user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMounted, setIsMounted] = useState(true);
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
    if (isMounted && token && user) {
      try {
        saveToken(token, setToken, setUser, setIsAdmin);
        setIsMounted(false);
      } catch (error) {
        console.log("error in useEffect on UserProvider:", error);
      }
    }
  }, [token, user, isMounted]);

  const logout = () => {
    try {
      setToken(null);
      setUser(null);
      setIsAdmin(false);
      Cookies.remove("accessTokenV");
      Cookies.remove("refreshTokenV");
      Cookies.remove("vintaidUser");
      Cookies.remove("vintaidTeam");
      localStorage.removeItem("favCard");
    } catch (error) {
      console.log("Error in logout:", error);
      setErrorMessage("Error during logout");
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
        errorMessage,
        setErrorMessage,
        axios,
        fav,
        setFav,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
