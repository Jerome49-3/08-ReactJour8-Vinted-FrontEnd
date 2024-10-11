// import CryptoJS from "crypto-js";
import { useContext } from "react";
import { UserContext } from "../UserProvider";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  return useContext(UserContext);
};

export const decryptUser = (token) => {
  try {
    // return JSON.parse(
    //   CryptoJS.AES.decrypt(
    //     token,
    //     import.meta.env.VITE_REACT_APP_SRV_KEY_SECRET
    //   ).toString(CryptoJS.enc.Utf8)
    // );
    const decoded = jwtDecode(token);
    console.log("decoded in userFunc:", decoded);
    return decoded;
  } catch (error) {
    console.error("Error decrypting user:", error);
    return null;
  }
};
