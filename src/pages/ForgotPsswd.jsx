/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Input from "../components/Input";
import { useUser } from "../assets/lib/userFunc";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import saveToken from "../assets/lib/saveToken";
import LoadedInputSubmit from "../components/LoadedInputSubmit";

const ForgotPsswd = ({ emailIsConfirmed }) => {
  const [password, setPassword] = useState(null);
  // console.log("password in ForgotPsswd:", password);
  const [confirmPassword, setConfirmPassword] = useState(null);
  // console.log("confirmPassword in ForgotPsswd:", confirmPassword);
  const { state } = useLocation();
  // console.log("state in ForgotPsswd:", state);
  const { tokenId } = state;
  // console.log("tokenId in ForgotPsswd:", tokenId);

  const {
    axios,
    setToken,
    setImgBoxUser,
    setUser,
    setIsAdmin,
    isSended,
    setIsSended,
    tokenFgtP,
    setTokenFgtP,
  } = useUser();
  // console.log("tokenFgtP in ForgotPsswd before useEffect:", tokenFgtP);
  useEffect(() => {
    if (tokenId) {
      setTokenFgtP(tokenId);
      // console.log("tokenFgtP in ForgotPsswd:", tokenFgtP);
      sessionStorage.setItem("tokenFgtP", tokenFgtP);
    }
  }, [tokenId, tokenFgtP]);
  // console.log("tokenFgtP in ForgotPsswd after useEffect:", tokenFgtP);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //handleFormForgot
  const handleFormForgot = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    try {
      const response = await axios.post(
        `http://localhost:3000/user/forgotPsswd`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokenFgtP}`,
          },
        }
      );
      setIsSended(true);
      // console.log("response in /forgotPsswd:", response);
      if (response?.data?.success && response?.data?.token) {
        setToken(response?.data?.token);
        saveToken(response?.data?.token, setUser, setIsAdmin, setImgBoxUser);
        alert(response?.data?.success);
        setIsSended(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return emailIsConfirmed ? (
    <div className="boxForgotPsswd">
      <div className="wrapper">
        <form className="boxFormForgot" onSubmit={handleFormForgot}>
          <Input
            type="password"
            setState={setPassword}
            value={password}
            placeholder="Password"
          />
          <Input
            type="password"
            setState={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm password"
          />
          <LoadedInputSubmit
            isSended={isSended}
            setIsSended={setIsSended}
            value="Send new password"
          />
          {errorMessage && <p className="red">{errorMessage}</p>}
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ForgotPsswd;
