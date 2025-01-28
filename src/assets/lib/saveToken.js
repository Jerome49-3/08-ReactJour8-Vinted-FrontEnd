import Cookies from "js-cookie";
import decryptUser from "./decryptUser";

const saveToken = (token, setToken, setUser, setIsAdmin) => {
  token = Cookies.get("accessTokenV") || null;
  console.log("token in saveToken:", token);
  setToken(token);
  const newDecryptedUser = decryptUser(token);
  console.log("newDecryptedUser in saveToken:", newDecryptedUser);
  if (newDecryptedUser) {
    setUser(newDecryptedUser);
    Cookies.set("vintaidUser", JSON.stringify(newDecryptedUser));
    if (newDecryptedUser.isAdmin !== false) {
      setIsAdmin(newDecryptedUser.isAdmin);
      Cookies.set("vintaidTeam", JSON.stringify(newDecryptedUser.isAdmin));
    }
  } else {
    throw new Error("Invalid decrypted user data");
  }
};

export default saveToken;
