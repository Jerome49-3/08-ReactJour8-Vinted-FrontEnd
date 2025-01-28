import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
//components
import Links from "../components/Links";
import Input from "../components/Input";

//lib
import saveToken from "../assets/lib/saveToken";

const Login = ({ type, setType, icon1, icon2 }) => {
  const { token, setToken, setUser, setIsAdmin, axios } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDone, setIsDone] = useState();
  const navigate = useNavigate();

  const handleType = () => {
    setType(type === "password" ? "text" : "password");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    axios.defaults.withCredentials = true;
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
          const loginOk = import.meta.env.VITE_REACT_APP_URL_CONFIRM_LOGIN;
          const checkResponse = response.data;
          const resultIncludes = checkResponse.includes(loginOk);
          if (resultIncludes !== false) {
            console.log(
              "resultIncludes in handlesubmit in /login:",
              resultIncludes
            );
            setTimeout(() => {
              setIsDone(true);
              try {
                const tokenCookie = Cookies.get("accessTokenV");
                console.log("tokenCookie in setTimeout:", tokenCookie);
                if (tokenCookie !== null) {
                  console.log(
                    "tokenCookie after verif tokenCookie in setTimeout:",
                    tokenCookie
                  );
                  setToken(tokenCookie);
                  console.log("token in setTimeout:", token);
                }
                if (token !== null) {
                  saveToken(token, setToken, setUser, setIsAdmin);
                }
                setIsDone(false);
                console.log("isDone in setTimeout:", isDone);
              } catch (error) {
                console.log("error:", error);
              }
            }, 100);
            if (isDone !== true) {
              navigate("/publish");
            }
          }
        } catch (error) {
          console.log("error in try/catch after response in /login:", error);
        }
      }
    } catch (error) {
      // console.log('error.response in handleSubmit on Login:', error.response);
      console.log("error:", error);
      setErrorMessage(error?.response?.data?.message || "login failed");
    }
  };

  return (
    <div className="boxForm boxFormCenter">
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
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Links path="/forgotPassword" />
    </div>
  );
};

export default Login;
