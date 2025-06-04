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
import LoadedInputSubmit from "../components/LoadedInputSubmit";

const Login = ({ faEye, faEyeSlash, type, setType }) => {
  // console.log("type in login:", type);
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
    isSended,
    setIsSended,
  } = useUser();
  // console.log("imgBoxUser in Login:", imgBoxUser);
  console.log("errorMessage in Login:", errorMessage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/login`,
        formData
      );
      console.log("response in handlesubmit in /login:", response);
      try {
        if (response?.data?.token) {
          // console.log(
          //   "response.data.token in handlesubmit in /login:",
          //   response.data.token
          // );
          setToken(response?.data?.token);
          // console.log("token in handlesubmit in /login:", token);
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
                faEye={faEye}
                faEyeSlash={faEyeSlash}
                type={type}
                setType={setType}
              />
            </div>
          </div>
          <LoadedInputSubmit
            type="submit"
            value="Se connecter"
            isSended={isSended}
            setIsSended={setIsSended}
          />
          <div className="boxForgotErrorMessage">
            <div className="boxForgot">
              <div className="btnSubmitCode">
                <Links
                  path="/resendEmailPsswd"
                  linkText="Mot de passe oublié ?"
                  state={{ tokenId: token }}
                />
              </div>
            </div>
            <InfoUserErrorMessage />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
