import { createContext, useState, useEffect } from "react";
import Cookies from "cookies-js";
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(Cookies.get('VintedUser') || null);
  const [token, setToken] = useState(Cookies.get('vintedAppConnect') || null);
  const [isAdmin, setIsAdmin] = useState(Cookies.get('vintedAppAdm') || null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = Cookies.get('VintedUser');
        const tokenData = Cookies.get('vintedAppConnect');
        let admData = Cookies.get('vintedAppAdm');
        if (userData) {
          setUser(userData);
        }
        if (tokenData) {
          setToken(tokenData);
        }
        if (admData) {
          console.log('admData: in userProvider:', admData);
          console.log('typeof admData: in userProvider:', typeof admData);
          if (admData !== 'false')
            admData = true;
          else {
            admData = false;
          }
          setIsAdmin(admData);
        }
        else {
          navigate('/login');
        }
      } catch (error) {
        setErrorMessage(error.message)
        console.log('error', error);
      }
    }
    loadUser();
  }, [])

  const saveUser = (user) => {
    try {
      const dataDecrypt = CryptoJS.AES.decrypt(user, import.meta.env.VITE_REACT_APP_SRV_KEY_SECRET);
      // console.log('dataDecrypt in saveUser on userProvider', dataDecrypt);
      const originData = dataDecrypt.toString(CryptoJS.enc.Utf8);
      // console.log('originData in saveUser on userProvider', originData);
      const userData = JSON.parse(originData);
      // console.log('userData in saveUser on userProvider', userData);
      if (user) {
        setUser(userData);
        Cookies.set('VintedUser', JSON.stringify(user), { expires: 15 });
      }
      if (userData.token !== undefined) {
        Cookies.set('vintedAppConnect', userData.token, { expires: 15 });
        setToken(userData.token);
      }
      if (userData.isAdmin !== false) {
        Cookies.set('vintedAppAdm', userData.isAdmin, { expires: 15 });
        setIsAdmin(userData.isAdmin);
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.log('error', error);
    }
  }

  const clearUser = () => {
    try {
      Cookies.remove('VintedUser');
      Cookies.remove('vintedAppConnect');

      setUser(null);
      setToken(null);
    } catch (error) {
      setErrorMessage(error.message)
      console.log('error', error);
    }
  }

  return (
    <UserContext.Provider value={{ user, token, isAdmin, errorMessage, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}