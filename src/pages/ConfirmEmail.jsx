import { useState } from "react";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";

//components
import Input from "../components/Input";

//lib
import saveToken from "../assets/lib/saveToken";
import InputCode from "../components/InputCode";
import LoadedInputSubmit from "../components/LoadedInputSubmit";

const ConfirmEmail = ({ emailSended, setEmailIsConfirmed }) => {
  // console.log(
  //   "emailSended in /confirmEmail::",
  //   "\n",
  //   emailSended,
  //   "setEmailIsConfirmed in /confirmEmail:",
  //   setEmailIsConfirmed
  // );

  const [code, setCode] = useState([null, null, null, null, null, null]);
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
  // Submit le code
  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", JSON.stringify(code));
    formData.append("emailSended", emailSended);
    setIsSended(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_URL_CONFIRMEMAIL,
        formData
      );
      console.log("response in /confirmEmail:", response);
      if (response?.data) {
        if (response?.data?.success) {
          setEmailIsConfirmed(true);
          setIsSended(false);
          alert(response?.data?.message);
          navigate("/forgotPassword", {
            state: { tokenId: response?.data?.stateTk },
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
      }
    } catch (error) {
      console.log("error:", error);
      console.log("Array.isArray(error):", Array.isArray(error));
      setErrorMessage(error?.message);
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
          {emailSended === true ? (
            <Input type="hidden" value="true" />
          ) : (
            <Input type="hidden" value="false" />
          )}
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
