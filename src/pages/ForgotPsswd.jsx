/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import saveToken from "../assets/lib/saveToken";
//components
import LoadedInputSubmit from "../components/LoadedInputSubmit";
import EyePassword from "../components/EyePassword";
import Input from "../components/Input";

const ForgotPsswd = ({
  emailIsConfirmed,
  faEye,
  faEyeSlash,
  type,
  setType,
  type2,
  setType2,
}) => {
  const [password, setPassword] = useState(null);
  // console.log("password in ForgotPsswd:", password);
  const [confirmPassword, setConfirmPassword] = useState(null);
  // console.log("confirmPassword in ForgotPsswd:", confirmPassword);
  const { state } = useLocation();
  // console.log("state in ForgotPsswd:", state);
  const { tokenId } = state;
  console.log("tokenId in ForgotPsswd:", tokenId);

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
  console.log("tokenFgtP in ForgotPsswd before useEffect:", tokenFgtP);
  useEffect(() => {
    if (tokenId) {
      setTokenFgtP(tokenId);
      // console.log("tokenFgtP in ForgotPsswd:", tokenFgtP);
      sessionStorage.setItem("tokenFgtP", tokenFgtP);
    }
  }, [tokenId, tokenFgtP]);
  console.log("tokenFgtP in ForgotPsswd after useEffect:", tokenFgtP);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //handleFormForgot
  const handleFormForgot = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    console.log("tokenFgtP in ForgotPsswd in handleFormForgot:", tokenFgtP);
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
          <div className="boxPsswd">
            <Input
              value={password || ""}
              id="password"
              type={type}
              placeholder="Password"
              setState={setPassword}
              autocomplete="on"
            />
            <div className="boxIcons">
              <EyePassword
                faEye={faEye}
                faEyeSlash={faEyeSlash}
                type={type}
                setType={setType}
              />
            </div>
          </div>
          <div className="boxPsswd">
            <Input
              value={confirmPassword || ""}
              id="confirmPassword"
              type={type2}
              placeholder="Confirm password"
              setState={setConfirmPassword}
              autocomplete="on"
            />
            <div className="boxIcons">
              <EyePassword
                faEye={faEye}
                faEyeSlash={faEyeSlash}
                type={type2}
                setType={setType2}
              />
            </div>
          </div>
          <LoadedInputSubmit
            isSended={isSended}
            setIsSended={setIsSended}
            value="Send new password"
            type="submit"
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
