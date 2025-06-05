import { useState } from "react";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate, useLocation } from "react-router-dom";

//lib
import saveToken from "../assets/lib/saveToken";
//components
import InputCode from "../components/InputCode";
import LoadedInputSubmit from "../components/LoadedInputSubmit";

const ConfirmEmail = ({
  emailSended,
  setEmailSended,
  setEmailIsConfirmed,
  userCreated,
}) => {
  // console.log(
  //   "emailSended in /confirmEmail::",
  //   "\n",
  //   emailSended,
  //   "setEmailIsConfirmed in /confirmEmail:",
  //   setEmailIsConfirmed
  // );
  // console.log("userCreated in /confirmEmail:", userCreated);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const {
    axios,
    token,
    setToken,
    setUser,
    setIsAdmin,
    errorMessage,
    setErrorMessage,
    isSended,
    setIsSended,
  } = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();
  // // console.log("state in ConfirmEmail:", state);
  const { tokenId } = state;
  console.log("tokenId in ConfirmEmail:", tokenId);
  // useEffect(() => {
  //   if (tokenId) {
  //     setTokenFgtP(tokenId);
  //     console.log("tokenFgtP in ForgotPsswd:", tokenFgtP);
  //     sessionStorage.setItem("tokenFgtP", tokenFgtP);
  //   }
  // }, [tokenId, tokenFgtP]);
  // Submit le code
  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", JSON.stringify(code));
    formData.append("emailSended", emailSended);
    setIsSended(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/user/confirmEmail/`,
        formData
      );
      // console.log("response in /confirmEmail:", response);
      if (response?.data?.success) {
        setEmailIsConfirmed(true);
        setEmailSended(false);
        setIsSended(false);
        alert(response?.data?.message);
        navigate("/forgotPassword", {
          state: { tokenId: tokenId },
        });
      }
      if (response?.data?.token) {
        setToken(response?.data?.token);
        if (token) {
          saveToken(token, setUser, setIsAdmin);
        }
        alert(response?.data?.message);
        setIsSended(false);
        navigate(`/publish`);
      }
    } catch (error) {
      console.log("error:", error);
      // console.log("Array.isArray(error):", Array.isArray(error));
      setErrorMessage(error?.response?.data?.message);
      setTimeout(() => {
        setIsSended(false);
      }, 3000);
    }
  };

  return (
    <div className="boxFormInputCode">
      <div className="wrapper">
        <form onSubmit={handleConfirmEmail}>
          <InputCode code={code} setCode={setCode} />
          <LoadedInputSubmit
            value="Send the code"
            classInput="submitInputCode"
            isSended={isSended}
            setIsSended={setIsSended}
            type="submit"
          />
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ConfirmEmail;
