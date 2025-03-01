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
          setIsSended(false);
          if (token) {
            saveToken(token, setUser, setIsAdmin);
          }
          alert(response?.data?.message);
          navigate(`/publish`);
        }
      }
    } catch (error) {
      console.log("error:", error);
      console.log("Array.isArray(error):", Array.isArray(error));
      setErrorMessage(error?.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleConfirmEmail}
        className="boxFormCenter boxFormInputCode"
      >
        {/* <div className="boxContainerInputCode">
          {code.map((inputCode, index) => {
            console.log("inputCode in ConfirmEmail:", inputCode);
            return (
              <label htmlFor="code" className="boxInputCode" key={index}>
                <input
                  id={`code-${index}`}
                  type="text"
                  value={code[index]}
                  onChange={(e) => handleChangeInputCode(e, index)}
                  className="classInputCode"
                  placeholder="0"
                  required
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              </label>
            );
          })}
        </div> */}
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
        />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
};

export default ConfirmEmail;
