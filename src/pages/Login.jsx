import Input from '../components/Input';
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = ({ setToken, setIsAdmin, type, setType, icon1, icon2 }) => {
  // console.log(setToken)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleType = () => {
    setType(type === 'password' ? 'text' : 'password')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      // const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/user/login',
      const response = await axios.post(import.meta.env.VITE_REACT_APP_LOCALHOST_LOGIN,
        {
          email: email,
          password: password,
        }
      );
      console.log('response in login:', response);
      // console.log('response.data.token in login:', response?.data?.token);
      if (response.data.token) {
        Cookies.set('vintedAppConnect', response.data.token, { expires: 15 });
        setToken(response.data.token);
        console.log('response.data.token in login:', response.data.token);
        navigate("/publish")
      }
      if (response.data.isAdmin) {
        Cookies.set('vintedAppAdm', response.data.isAdmin, { expires: 15 });
        setIsAdmin(response.data.isAdmin);
      }
      // console.log('email:', email, 'password:', password)
    } catch (error) {
      console.log('error:', error.response)
    }
  }

  return (
    <div className='boxForm boxFormCenter boxFormSignUp'>
      <form onSubmit={handleSubmit}>
        <Input id="email" type="email" placeholder="jerome@test.com" value={email} setState={setEmail} autocomplete="on" />
        <div className="boxPsswd">
          <Input value={password} id="password" type={type} placeholder="Mot de passe" setState={setPassword} autocomplete="on" />
          <div className="boxIcons">
            <FontAwesomeIcon icon={icon1} onClick={handleType} className={type !== 'password' ? 'hide' : null} />
            <FontAwesomeIcon icon={icon2} onClick={handleType} className={type !== 'text' ? 'hide' : null} />
          </div>
        </div>
        <Input type="submit" value="Se connecter" />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  )
}

export default Login