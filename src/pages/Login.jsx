import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";

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
        `https://site--vintaidbackend--s4qnmrl7fg46.code.run/user/login`,
        // const response = await axios.post(
        //   `http://localhost:3000/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response) {
        saveToken(token, setToken, setUser, setIsAdmin);
        // console.log("response in handlesubmit in /login:", response);
        navigate("/publish");
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
