import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../context/lib/userFunc";
import { useNavigate } from "react-router-dom";

const Login = ({ type, setType, icon1, icon2 }) => {
  const { saveUser } = useUser();
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
    try {
      const response = await axios.post(
        `https://site--vintedbackend--s4qnmrl7fg46.code.run/user/login`,
        { email, password }
      );
      // const response = await axios.post(`http://localhost:3000/user/login`, { email, password });
      if (response) {
        // console.log('response in handleSubmit on /Login:', response);
        // console.log('response.data in handleSubmit on /Login:', response.data);
        const token = response.data;
        await saveUser(token);
        navigate("/publish");
      }
    } catch (error) {
      // console.log('error.response in handleSubmit on Login:', error.response);
      // console.log('error:', error);
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
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
