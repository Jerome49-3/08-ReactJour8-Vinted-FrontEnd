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
    user,
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
    try {
      const response = await axios.post(
        `http://localhost:3000/user/confirmEmail/`,
        // const response = await axios.post(
        //   `https://site--vintedbackend--s4qnmrl7fg46.code.run/user/confirmEmail`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        saveToken(token, setToken, setUser, setIsAdmin);
        console.log(
          "token in /confirmEmail:",
          token,
          "user in /confirmEmail:",
          user
        );
        console.log("response in /confirmEmail:", response);
        console.log("response.data in /confirmEmail:", response.data);
        console.log(
          "response.data.token in /confirmEmail:",
          response.data.token
        );
        console.log(
          "response.data.message in /confirmEmail:",
          response.data.message
        );
        if (response.data.message) {
          const message = response.data.message;
          alert(message);
        }
        if (response.data.token) {
          const token = response.data.token;
          console.log("token in /confirmEmail:", token);
        }
        navigate("/publish");
      }
    } catch (error) {
      console.log("error:", error);
      console.log("Array.isArray(error):", Array.isArray(error));
      setErrorMessage(error);
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
