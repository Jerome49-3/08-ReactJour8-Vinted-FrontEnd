import { createContext, useState, useEffect } from "react";
import { decryptUser } from "./lib/userFunc";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  console.log("token in userProvider:", token);
  const [user, setUser] = useState(null);
  // console.log("user in userProvider:", user);
  const [isAdmin, setIsAdmin] = useState(false);
  // console.log("isAdmin in userProvider:", isAdmin);
  const [errorMessage, setErrorMessage] = useState("");
  // console.log("errorMessage in userProvider:", errorMessage);

  useEffect(() => {
    try {
      setToken(localStorage.getItem("userToken"));
      if (token) {
        const decryptedUser = decryptUser(token);
        // console.log(
        //   "decryptedUser in useEffect on userProvider:",
        //   decryptedUser
        // );
        if (decryptedUser) {
          setUser(decryptedUser);
          if (decryptedUser.isAdmin === true) {
            setIsAdmin(decryptedUser.isAdmin);
          }
        } else {
          localStorage.removeItem("userToken");
        }
      }
    } catch (error) {
      // console.log("error in useEffect in userProvider:", error);
    }
  }, [token]);

  const signup = async (username, email, password, newsletter) => {
    try {
      // const response = await axios.post(
      //   `https://site--vintedbackend--s4qnmrl7fg46.code.run/user/signup`,
      const response = await axios.post(`http://localhost:3000/user/signup`, {
        username,
        email,
        password,
        newsletter,
      });
      console.log("response in SignupService:", response);
      if (response.data) {
        console.log("response.data in SignupService:", response.data);
        return response.data;
      } else {
        throw new Error("no data in /signup");
      }
    } catch (error) {
      console.log("error in SignupService:", error.response.data.message);
      if (error) {
        return setErrorMessage(error.response.data.message);
      }
    }
  };

  const saveUser = async (token) => {
    try {
      localStorage.setItem("userToken", token);
      setToken(token);
      const decryptedUser = decryptUser(token);
      // console.log("decryptedUser in userProvider:", decryptedUser);
      setUser(decryptedUser);
      localStorage.setItem("isAdmin", decryptedUser.isAdmin);
      setIsAdmin(decryptedUser.isAdmin ? decryptedUser.isAdmin : false);
      // console.log("isAdmin in userProvider:", isAdmin);
    } catch (error) {
      setErrorMessage(error);
      setUser(null);
      localStorage.removeItem("userToken");
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setToken(null);
      setIsAdmin(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("isAdmin");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        saveUser,
        user,
        setUser,
        logout,
        isAdmin,
        setIsAdmin,
        errorMessage,
        setErrorMessage,
        signup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
