import { useState } from "react";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";

//components
import Input from "../components/Input";
import Loading from "../components/Loading";
import EyePassword from "../components/EyePassword";
import Links from "../components/Links";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";

//lib
import saveToken from "../assets/lib/saveToken";

const Login = ({ icon1, icon2, type, setType }) => {
  // const boxForm = "boxForm";
  // const boxLogin = "boxLogin";
  const {
    token,
    setToken,
    errorMessage,
    setErrorMessage,
    setUser,
    setIsAdmin,
    axios,
    setImgBoxUser,
  } = useUser();
  // console.log("imgBoxUser in Login:", imgBoxUser);
  console.log("errorMessage in Login:", errorMessage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/sendMail/sendCode`,
        {}
      );
      if (response.data) {
        console.log("response.data:", response.data);
        alert(response.data);
        setIsLoading(false);
        navigate("/confirmEmail");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error?.response?.data);
      setErrorMessage(error?.response?.data?.message);
    }
  };
  // console.log(
  //   "import.meta.env.VITE_REACT_APP_URL_LOGIN:",
  //   import.meta.env.VITE_REACT_APP_URL_LOGIN
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_URL_LOGIN,
        {
          email,
          password,
        }
      );
      console.log("response in handlesubmit in /login:", response);
      try {
        if (response?.data?.token) {
          console.log(
            "response.data.token in handlesubmit in /login:",
            response.data.token
          );
          setToken(response?.data?.token);
          console.log("token in handlesubmit in /login:", token);
          saveToken(response?.data?.token, setUser, setIsAdmin, setImgBoxUser);
          setIsLoading(false);
        }
        if (isLoading !== true) {
          navigate("/publish");
        }
      } catch (error) {
        console.log("error in try/catch after response in /login:", error);
        setErrorMessage(error?.response?.data?.message);
      }
    } catch (error) {
      console.log("error in handleSubmit on Login:", error);
      const errRespDataMssg = error?.response?.data?.message;
      console.log("errRespDataMssg in handleSubmit on Login:", errRespDataMssg);
      const messageNotConfirmEmail = import.meta.env
        .VITE_REACT_APP_MSSG_NOT_CONFIRMEMAIL;
      if (
        typeof errRespDataMssg === "string" &&
        errRespDataMssg === messageNotConfirmEmail
      ) {
        setErrorMessage(errRespDataMssg);
        alert(errRespDataMssg);
        setTimeout(() => {
          navigate("/confirmemail");
        }, 3500);
      } else {
        setErrorMessage(errRespDataMssg);
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    // <div className={`${boxForm} ${boxLogin}`}>
    <div className="boxLogin">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            placeholder="email"
            value={email || ""}
            setState={setEmail}
            autocomplete="on"
          />
          <div className="boxPsswd">
            <Input
              value={password || ""}
              id="password"
              type={type}
              placeholder="Mot de passe"
              setState={setPassword}
              autocomplete="on"
            />
            <div className="boxIcons">
              <EyePassword
                icon1={icon1}
                icon2={icon2}
                type={type}
                setType={setType}
              />
            </div>
          </div>
          <Input type="submit" value="Se connecter" />
          <div className="boxForgot">
            <div className="btnSubmitCode" onClick={handleSendCode}>
              <Links path="/resendEmail" linkText="Mot de passe oublié ?" />
            </div>
          </div>
          <InfoUserErrorMessage />
        </form>
      </div>
    </div>
  );
};

export default Login;
