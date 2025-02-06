import decryptUser from "./decryptUser";
import Cookies from "js-cookie";

const saveToken = (token, setUser, setIsAdmin) => {
  // console.log("token in saveToken:", token);
  Cookies.set("accessTokenV", token);
  const newDecryptedUser = decryptUser(token);
  // console.log("newDecryptedUser in saveToken:", newDecryptedUser);
  if (newDecryptedUser) {
    setUser(newDecryptedUser);
    sessionStorage.setItem("vintaidUser", JSON.stringify(newDecryptedUser));
    if (newDecryptedUser.isAdmin !== false) {
      setIsAdmin(newDecryptedUser.isAdmin);
      sessionStorage.setItem(
        "vintaidTeam",
        JSON.stringify(newDecryptedUser.isAdmin)
      );
    }
  } else {
    throw new Error("Invalid decrypted user data");
  }
};

export default saveToken;
