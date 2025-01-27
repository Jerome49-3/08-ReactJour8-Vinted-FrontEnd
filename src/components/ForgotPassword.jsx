import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../components/Input";
import saveToken from "../assets/lib/saveToken";

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");
  axios.defaults.withCredentials = true;
  try {
    // const response = await axios.post(
    //   `https://site--vintedbackend--s4qnmrl7fg46.code.run/user/login`,
    const response = await axios.post(
      `http://localhost:3000/user/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    if (response) {
      saveToken();
      console.log("response in handlesubmit in /login:", response);
      alert(response.data);
      navigate("/publish");
    }
  } catch (error) {
    // console.log('error.response in handleSubmit on Login:', error.response);
    // console.log('error:', error);
    setErrorMessage(error?.response?.data?.message || "login failed");
  }
};

const ForgotPassword = () => {
  return (
    <div>
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
    </div>
  );
};

export default ForgotPassword;
