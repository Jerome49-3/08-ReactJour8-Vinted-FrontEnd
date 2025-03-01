import { useState } from "react";
import Input from "../components/Input";
import { useUser } from "../assets/lib/userFunc";
import { Navigate, useNavigate } from "react-router-dom";
import LoadedInputSubmit from "../components/LoadedInputSubmit";

const ResendEmail = ({ setEmailSended }) => {
  const [email, setEmail] = useState("");

  const { axios, token, isSended, setIsSended } = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  //handleSendEmail
  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSended(true);
    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await axios.post(
        `http://localhost:3000/resendEmail`,
        formData
      );
      if (response?.data?.success) {
        setIsSended(false);
        console.log("response.data:", response.data);
        navigate(response?.data?.success);
        setEmailSended(true);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };
  return !token ? (
    <>
      <div className="boxForgotPsswd">
        <div className="wrapper">
          <form
            action=""
            onSubmit={handleSendEmail}
            className="formForgotPsswd"
          >
            <Input
              type="email"
              id="email"
              setState={setEmail}
              value={email}
              placeholder="Veuillez confirmer votre email"
            />
            <LoadedInputSubmit
              isSended={isSended}
              setIsSended={setIsSended}
              value="Send your email"
            />
          </form>
          {errorMessage && <p className="red">{errorMessage}</p>}
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ResendEmail;
