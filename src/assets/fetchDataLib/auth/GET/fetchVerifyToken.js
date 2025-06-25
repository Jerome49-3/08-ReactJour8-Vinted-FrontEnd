const fetchVerifyToken = async (
  axios,
  setToken,
  saveToken,
  setUser,
  setIsAdmin,
  setImgBoxUser,
  setIsLoading
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}/user/refreshToken`
    );
    // console.log("response in /user/refreshToken:", response);
    if (response?.data?.token) {
      setToken(response?.data?.token);
      saveToken(response?.data?.token, setUser, setIsAdmin, setImgBoxUser);
      setIsLoading(false);
      const newRefreshToken = response?.data?.token;
      return newRefreshToken;
    }
  } catch (errorVerifToken) {
    console.error("error in fetchVerifyToken:", errorVerifToken);
  }
};
export default fetchVerifyToken;
