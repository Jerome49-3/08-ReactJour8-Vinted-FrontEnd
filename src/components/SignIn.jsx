import Input from './Input';
import Image from './Image';
import SmallLogo from '../assets/images/favicon.png'
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = ({
  show,
  setShow
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url2 = 'https://site--backendvintedapp--s4qnmrl7fg46.code.run/user/login';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post((url2),
          {
            email: email,
            password: password
          }
        );
      console.log('response.data:', response.data);
      if (response.data.token) {
        Cookies.set('login', response.data.token, { expires: 15 });
        navigate("/")
      }
    } catch (error) {
      console.log('error:', error)
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
          {/* je crée un input email pour conserver la valeur de l'input*/}
          {/* <label htmlFor="email">email</label> */}
          <Input value={email} id="email" type="email" placeholder="jerome@test.com" setState={setEmail} />
          <Input value={password} id="password" type="password" placeholder="password" setState={setPassword} />
          <Input type="submit" value="Sign in" />
        </form>
      </div>

    </div>
  )
}

export default SignIn