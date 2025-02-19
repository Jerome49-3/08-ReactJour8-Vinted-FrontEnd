import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";

//components
import Links from "../components/Links";
import Input from "../components/Input";
import Loading from "../components/Loading";

//lib
import saveToken from "../assets/lib/saveToken";

const Login = ({ type, setType, icon1, icon2 }) => {
  const boxForm = "boxForm";
  const boxLogin = "boxLogin";
  const {
    token,
    setToken,
    setUser,
    setIsAdmin,
    axios,
    imgBoxUser,
    setImgBoxUser,
  } = useUser();
  console.log("imgBoxUser in Login:", imgBoxUser);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const handleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    // axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_URL_LOGIN,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("response in handlesubmit in /login:", response);
      if (response.data) {
        try {
          if (response.data.token) {
            console.log(
              "response.data.token in handlesubmit in /login:",
              response.data.token
            );
            setToken(response?.data?.token);
            console.log("token in handlesubmit in /login:", token);
            saveToken(
              response?.data?.token,
              setUser,
              setIsAdmin,
              setImgBoxUser
            );
            setIsLoading(false);
          }
          if (isLoading !== true) {
            navigate("/publish");
          }
        } catch (error) {
          console.log("error in try/catch after response in /login:", error);
        }
      }
    } catch (error) {
      console.log("error in handleSubmit on Login:", error);
      const errRespData = error?.response?.data;
      console.log("errRespData in handleSubmit on Login:", errRespData);
      console.log("typeof errRespData:", typeof errRespData);
      const errorMessage = error?.message;
      console.log("errorMessage in handleSubmit on Login:", errorMessage);
      console.log("typeof errorMessage:", typeof errorMessage);
      const errRespDataMssg = error?.response?.data?.message;
      console.log("errRespDataMssg in handleSubmit on Login:", errRespDataMssg);
      console.log("typeof errRespDataMssg:", typeof errRespDataMssg);
      const mssgErrConcat = errRespData.message.concat(": ", errorMessage);
      console.log("mssgErrConcat in handleSubmit on Login:", mssgErrConcat);
      console.log("typeof mssgErrConcat:", typeof mssgErrConcat);
      const messageNotConfirmEmail = import.meta.env
        .VITE_REACT_APP_MSSG_NOT_CONFIRMEMAIL;
      if (
        typeof errRespDataMssg === "string" &&
        errRespDataMssg === messageNotConfirmEmail
      ) {
        alert(errRespDataMssg);
        setTimeout(() => {
          navigate("/confirmemail");
        }, 3500);
      } else if (typeof errRespDataMssg === "object") {
        setErrorMessage(mssgErrConcat);
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className={`${boxForm} ${boxLogin}`}>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            placeholder="jerome@test.com"
            value={email}
            setState={setEmail}
            autocomplete="on"
          />
          <div className="boxPsswd">
            <Input
              value={password}
              id="password"
              type={type}
              placeholder="Mot de passe"
              setState={setPassword}
              autocomplete="on"
            />
            <div className="boxIcons">
              <FontAwesomeIcon
                icon={icon1}
                onClick={handleType}
                className={type !== "password" ? "hide" : null}
              />
              <FontAwesomeIcon
                icon={icon2}
                onClick={handleType}
                className={type !== "text" ? "hide" : null}
              />
            </div>
          </div>
          <Input type="submit" value="Se connecter" />
          <div className="boxForgot">
            <small>
              <Links />
            </small>
          </div>
          {errorMessage && (
            <p
              style={{
                color: "red",
                fontSize: "1.05rem",
                fontWeight: "700",
                textShadow:
                  "0px 0px 1px orangered, 0.15px 0.15px 1.25px black, 0.35px 0.35px 1.5px green",
              }}
            >
              {errorMessage}
            </p>
          )}
        </form>
        <Links path="/forgotPassword" />
      </div>
    </div>
  );
};

export default Login;
