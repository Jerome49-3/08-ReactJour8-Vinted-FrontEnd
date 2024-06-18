import Input from '../components/Input';
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  // console.log(setToken)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/user/login',
        {
          email: email,
          password: password,
        }
      );
      // console.log('response.data.token:', response?.data?.token)
      if (response.data.token) {
        Cookies.set('vintedApp', response.data.token, { expires: 15 });
        console.log(Cookies)
        setToken(response.data.token);
        navigate("/publish")
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
        <Input id="password" type="password" placeholder="password" value={password} setState={setPassword} autocomplete="on" />
        <Input type="submit" value="Se connecter" />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  )
}

export default Login