import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';

const SignUp = ({ icon1, icon2 }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [type, setType] = useState('password');
  const [errorMessage, setErrorMessage] = useState("");

  const handleType = () => {


    setType(type === 'password' ? 'text' : 'password')
  }
  const handleSubmit = async (e) => {
    const navigate = useNavigate();
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/user/signup',
        {
          username,
          email,
          password,
          newsletter
        }
      );
      if (response.data) {
        Cookies.set('vintedApp', response.data.token, { expires: 15 });
        // console.log('cookies:', Cookies);
        setToken(response.data.token);
        navigate("/publish");
      }
    } catch (error) {
      console.log('error', error.response)
    }
  }

  return (
    <div className='boxForm boxFormCenter boxFormSignUp'>
      <form onSubmit={handleSubmit}>
        <Input value={username} id="username" type="text" placeholder="Nom d'utilisateur(ice)" setState={setUsername} autocomplete="on" />
        <Input value={email} id="email" type="email" placeholder="Email" setState={setEmail} autocomplete="on" />
        <div className="boxPsswd">
          <Input value={password} id="password" type={type} placeholder="Mot de passe" setState={setPassword} autocomplete="on" />
          <div className="boxIcons">
            <FontAwesomeIcon icon={icon1} onClick={handleType} className={type !== 'password' ? 'hide' : null} />
            <FontAwesomeIcon icon={icon2} onClick={handleType} className={type !== 'text' ? 'hide' : null} />
          </div>
        </div>
        <div className='boxCheckBox'>
          <input type="checkbox" name="checkbox" id="checkbox" onChange={() => {
            setNewsletter(!newsletter);
          }} checked={newsletter} />
          <span>S'inscrire à la newsletter</span>
        </div>
        <p>En m'inscrivant, je confirme avoir lu et accepté les termes, conditions et politique de confidentialité de Vinted. Je confirme avoir au moins 18ans</p>
        <Input type="submit" value="S'inscrire" />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  )
}

export default SignUp
