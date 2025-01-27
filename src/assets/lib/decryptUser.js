import { jwtDecode } from "jwt-decode";

const decryptUser = (token) => {
  if (token && typeof token === "string") {
    console.log("token in decryptUser:", token);
    console.log("typeof token in decryptUser:", typeof token);
    try {
      const decoded = jwtDecode(token);
      console.log("decoded in decryptUser:", decoded);
      console.log("typeof decoded in decryptUser:", typeof decoded);
      return decoded;
    } catch (error) {
      console.error("Error decrypting user:", error);
      return null;
    }
  }
};
export default decryptUser;
