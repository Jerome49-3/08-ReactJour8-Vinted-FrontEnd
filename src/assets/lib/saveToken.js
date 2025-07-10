import decryptUser from "./decryptUser";
import Cookies from "js-cookie";

const saveToken = (token, setUser, setIsAdmin, setImgBoxUser) => {
  // console.log("token in saveToken:", token);
  Cookies.set("accessTokenV", token);
  const newDecryptedUser = decryptUser(token);
  console.log("newDecryptedUser in saveToken:", newDecryptedUser);
  if (newDecryptedUser) {
    setUser(newDecryptedUser);
    if (typeof newDecryptedUser?.account?.avatar === "string") {
      setImgBoxUser(newDecryptedUser?.account?.avatar);
    } else if (
      typeof newDecryptedUser?.account?.avatar?.secure_url === "string"
    ) {
      setImgBoxUser(newDecryptedUser?.account?.avatar?.secure_url);
    } else {
      setImgBoxUser(null);
    }
    sessionStorage.setItem(
      "vintaidImgBoxUser",
      newDecryptedUser?.account?.avatar?.secure_url ||
        newDecryptedUser?.account?.avatar
    );
    sessionStorage.setItem("vintaidUser", JSON.stringify(newDecryptedUser));
    if (newDecryptedUser.isAdmin !== false) {
      setIsAdmin(newDecryptedUser?.isAdmin);
      sessionStorage.setItem(
        "vintaidTeam",
        JSON.stringify(newDecryptedUser?.isAdmin)
      );
    }
  } else {
    throw new Error("Invalid decrypted user data");
  }
};

export default saveToken;
