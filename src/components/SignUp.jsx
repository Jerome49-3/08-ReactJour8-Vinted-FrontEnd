import { useState, useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import { useNavigate } from "react-router-dom";

//components
import EyePassword from "../components/EyePassword";
import Input from "../components/Input";
import Image from "../components/Image";
import Button from "../components/Button";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";

//images
import SmallLogo from "../assets/images/favicon.png";

//lib
import saveToken from "../assets/lib/saveToken";

const SignUp = ({
  showSignUp,
  setShowSignUp,
  icon1,
  icon2,
  type,
  setType,
  faCircleXmark,
}) => {
  console.log("showSignUp on SignUp:", showSignUp);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const { token, setToken, setUser, setIsAdmin, axios, setErrorMessage } =
    useUser();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("showSignUp updated in SignUp:", showSignUp);
  }, [showSignUp]);
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(`http://localhost:3000/user/signup`, {
        username,
        email,
        password,
        newsletter,
      });
      console.log("response in /signup:", response);
      if (response) {
        alert(response?.data?.message);
        setShowSignUp(false);
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
        <div className="boxTitleClose">
          <Image src={SmallLogo} alt="logo Vinted" />
          <Button
            icon={faCircleXmark}
            handleClick={() => {
              setShowSignUp(false);
            }}
          />
        </div>
        <div className="boxFormSignUp">
          <div className="wrapper">
            <form onSubmit={handleSignup}>
              <Input
                value={username || ""}
                id="username"
                type="text"
                placeholder="Nom d'utilisateur(ice)"
                setState={setUsername}
                autocomplete="on"
              />
              <Input
                id="email"
                value={email || ""}
                type="email"
                placeholder="Email"
                setState={setEmail}
                autocomplete="on"
              />
              <div className="boxPsswd">
                <Input
                  id="password"
                  value={password || ""}
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
                conditions et politique de confidentialité de Vinted. Je
                confirme avoir au moins 18ans
              </p>
              <Input type="submit" value="S'inscrire" />
            </form>
          </div>
          <InfoUserErrorMessage />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
