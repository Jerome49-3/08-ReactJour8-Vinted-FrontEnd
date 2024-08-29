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
          // console.log('admData: in userProvider:', admData);
          const adm = JSON.parse(admData);
          // console.log('adm: in userProvider:', adm);
          // console.log('typeof adm: in userProvider:', typeof adm);
          setIsAdmin(adm);
        }
      } catch (error) {
        setErrorMessage(error.message)
        console.log('error', error);
        navigate('/login');
      }
    }
    loadUser();
  }, [isAdmin, token, user])

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
        // console.log('userData.isAdmin:', userData.isAdmin);
        Cookies.set('vintedAppAdm', JSON.stringify(userData.isAdmin), { expires: 15 });
        setIsAdmin(userData.isAdmin);
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.log('error', error);
    }
  }

  const clearUser = () => {
    try {
      Cookies.expire('VintedUser');
      Cookies.expire('vintedAppConnect');
      Cookies.expire('vintedAppAdm');
      setUser(null);
      setToken(null);
      setIsAdmin(null);
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