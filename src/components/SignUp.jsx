import { useState } from "react";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";

//components
import EyePassword from "./EyePassword";
import Input from "./Input";
import Image from "./Image";

//images
import SmallLogo from "../assets/images/favicon.png";

//lib
import saveToken from "../assets/lib/saveToken";

const SignUp = ({ show, setShow, icon1, icon2, type, setType }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const {
    errorMessage,
    setErrorMessage,
    token,
    setToken,
    setUser,
    setIsAdmin,
    axios,
  } = useUser();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    // console.log("e.target.file", e.target.file);
    e.preventDefault();
    setErrorMessage("");
    try {
      // const response = await axios.post(
      //   `https://site--vintedbackend--s4qnmrl7fg46.code.run/user/signup`,
      const response = await axios.post(`http://localhost:3000/user/signup`, {
        username,
        email,
        password,
        newsletter,
      });
      console.log("response in /signup:", response);
      if (response) {
        alert(response.data);
        setShow(false);
        navigate("/confirmemail");
        saveToken(token, setToken, setUser, setIsAdmin);
      }
    } catch (error) {
      console.log(
        "error in handleSubmit on /signup:",
        error.response.data.message
      );
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="boxModal">
      <div className="boxModalContent">
        <div>
          <Image src={SmallLogo} alt="logo Vinted" />
          <button
            onClick={() => {
              {
                show === true ? setShow(false) : null;
              }
            }}
          >
            X
          </button>
        </div>
        <div className="boxForm boxFormSignUp">
          <form onSubmit={handleSignup}>
            <Input
              value={username}
              id="username"
              type="text"
              placeholder="Nom d'utilisateur(ice)"
              setState={setUsername}
              autocomplete="on"
            />
            <Input
              value={email}
              id="email"
              type="email"
              placeholder="Email"
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
                <EyePassword
                  icon1={icon1}
                  icon2={icon2}
                  state={type}
                  setState={setType}
                />
              </div>
            </div>
            <div className="boxCheckBox">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onChange={() => {
                  setNewsletter(!newsletter);
                }}
                checked={newsletter}
              />
              <span>S'inscrire à la newsletter</span>
            </div>
            <p>
              En m'inscrivant, je confirme avoir lu et accepté les termes,
              conditions et politique de confidentialité de Vinted. Je confirme
              avoir au moins 18ans
            </p>
            <Input type="submit" value="S'inscrire" />
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
