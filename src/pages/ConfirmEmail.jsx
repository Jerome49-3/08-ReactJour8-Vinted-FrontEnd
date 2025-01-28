import { useState, useRef } from "react";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";

//components
import Input from "../components/Input";

//lib
import saveToken from "../assets/lib/saveToken";

const ConfirmEmail = () => {
  const [code, setCode] = useState([null, null, null, null, null, null]);
  const {
    errorMessage,
    setErrorMessage,
    axios,
    token,
    setToken,
    setUser,
    setIsAdmin,
  } = useUser();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  //OnChange Input Code
  const handleChangeInputCode = (e, index) => {
    console.log("e.target.value on handleChangeInputCode:", e.target.value);
    console.log("index on handleChangeInputCode:", index);
    const nbrInput = e.target.value;
    const newArrayInputCode = [...code];
    newArrayInputCode[index] = nbrInput;
    setCode(newArrayInputCode);
    console.log(
      "newArrayInputCode on handleChangeInputCode:",
      newArrayInputCode
    );
    if (nbrInput && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  // Submit le code
  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", JSON.stringify(code));
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_URL_CONFIRMEMAIL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      );
      console.log("response in /confirmEmail:", response);
      if (response.data.message) {
        const confirmEmailOk = import.meta.env
          .VITE_REACT_APP_URL_CONFIRM_CONFIRMEMAIL;
        const checkResponse = response.data.message;
        const resultIncludes = checkResponse.includes(confirmEmailOk);
        if (resultIncludes !== false) {
          saveToken(token, setToken, setUser, setIsAdmin);
          setTimeout(() => {
            alert(checkResponse);
            navigate(`/publish`);
          }, 1000);
        }
      }
    } catch (error) {
      console.log("error:", error);
      console.log("Array.isArray(error):", Array.isArray(error));
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleConfirmEmail}
        className="boxFormCenter boxFormInputCode"
      >
        <div className="boxContainerInputCode">
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
        </div>
        <Input
          type="submit"
          value="envoyer le code"
          classInput="submitInputCode"
        />
      </form>
      {errorMessage.message && (
        <p style={{ color: "red" }}>{errorMessage.message}</p>
      )}
    </>
  );
};

export default ConfirmEmail;
