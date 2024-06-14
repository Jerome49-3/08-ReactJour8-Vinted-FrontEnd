import React from 'react'
import Input from './Input';
import Image from './Image';
import SmallLogo from '../assets/images/favicon.png'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SignIn = ({
  show,
  setShow
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url2 = 'https://site--backendvintedapp--s4qnmrl7fg46.code.run/user/login';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = axios.get(url2)
        setData(response.data);
        setIsLoading(false);
        console.log('data', data);
        if (response) {
          Cookies.set('login', { expires: 15, token: data.user.token })
        }
      } catch (error) {
        console.log('error:', error)
      }
    }
    fetchData();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = async () => {
      try {
        axios
          .post(url2), {
            method: "POST",
            body: JSON.stringify({
              email: { email },
              password: { password }
            })
          }
            .then(response)
        if (response) {
          Cookies.set('login', { expires: 15, token: data.user.token })
        }
      } catch (error) {
        console.log('error:', error)
      }
    }
    postData();
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
          <Input label="Email" value={email} id="email" type="email" placeholder="jerome@test.com" setState={setEmail} />
          <Input label="Password" value={password} id="password" type="password" placeholder="password" setState={setPassword} />
          <Input type="submit" value="Sign in" />
        </form>
      </div>

    </div>
  )
}

export default SignIn