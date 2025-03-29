import { useState } from "react";
import Input from "../components/Input";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";
import LoadedInputSubmit from "../components/LoadedInputSubmit";

const ResetPsswd = ({ setEmailSended }) => {
  const [email, setEmail] = useState("");
  const { axios, isSended, setIsSended } = useUser();
  // console.log("token: in /resendEmailPsswd:", token);
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
        `http://localhost:3000/resendEmailPsswd`,
        formData
      );
      if (response?.data?.success) {
        setIsSended(false);
        console.log("response.data:", response.data);
        navigate(response?.data?.success, {
          state: { tokenId: response?.data?.tokenId },
        });
        setEmailSended(true);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="boxResetPsswd">
      <div className="wrapper">
        <form onSubmit={handleSendEmail} className="formResetPsswd">
          <Input
            type="email"
            id="email"
            setState={setEmail}
            value={email}
            placeholder="Please, confirm your email"
          />
          <LoadedInputSubmit
            isSended={isSended}
            setIsSended={setIsSended}
            value="Send your email"
            type="submit"
          />
        </form>
        {errorMessage && <p className="red">{errorMessage}</p>}
      </div>
    </div>
  );
  // : (
  //   <Navigate to="/" />
  // );
};

export default ResetPsswd;
