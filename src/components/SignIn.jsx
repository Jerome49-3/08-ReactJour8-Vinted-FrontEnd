import Input from './Input';
import Image from './Image';
import SmallLogo from '../assets/images/favicon.png'
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ show, setShow, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const url2 = 'https://lereacteur-vinted-api.herokuapp.com/user/login';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      axios
        .post((url2),
          {
            email: email,
            password: password,
          }
        );
      console.log('response.data:', response.data);
      if (response.data.token) {
        Cookies.set('login', response.data.token, { expires: 15 });
        setToken(response.data.token);
        navigate("/publish")
      }
    } catch (error) {
      console.log('error:', error.response)
    }
  }

  return (
    <div className='boxModal'>
      <div className='boxModalContent'>
        <div>
          <Image src={SmallLogo} alt='logo Vinted' />
          <button onClick={() => {
            { show === true ? (setShow(false)) : (null) }
          }}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <Input id="email" type="email" placeholder="jerome@test.com" value={email} setState={setEmail} autocomplete="on" />
          <Input id="password" type="password" placeholder="password" value={password} setState={setPassword} autocomplete="on" />
          <Input type="submit" value="Se connecter" />
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>

    </div>
  )
}

export default SignIn