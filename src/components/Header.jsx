import { Link, useNavigate } from "react-router-dom";
import Image from './Image';
import Logo from '../assets/images/logo.svg';
import Input from "./Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThemeButton from "./ThemeButton";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

const Header = ({ show, setShow, search, setSearch }) => {
  const { token, isAdmin, clearUser } = useContext(UserContext);
  console.log('token in header:', token, '\n', 'isAdmin in header:', isAdmin);
  console.log('typeof token in header:', typeof token, '\n', 'typeof isAdmin in header:', typeof isAdmin);
  const navigate = useNavigate();
  return (
    <header>
      <div className="wrapper">
        <Link to='/'>
          <Image src={Logo} alt='Vinted' classImg='logo' />
        </Link>
        <div className="boxTheme">
          <ThemeButton />
        </div>
        <div className="boxSearch">
          <FontAwesomeIcon icon="magnifying-glass" className="search-icons" />
          <Input id='search' type='search' placeholder='Rechercher des articles' value={search} setState={setSearch} />
        </div>
        <nav>
          <ul>
            <li>{isAdmin === true && <Link to='/dashboard'>Dashboard</Link>}</li>
            {token ? (
              <li><button onClick={() => {
                clearUser();
                navigate('/')
              }}>Se deconnecter</button></li>
            ) : (
              <li>
                <div className="buttonSignIn">
                  <button onClick={() => {
                    { show === false ? (setShow(true)) : (setShow(false)) }
                  }}> s'inscrire</button>
                </div>
                <div>|</div>
                <div><Link to='/login'>se connecter</Link></div>
              </li>
            )}
            <li>
              <Link to={token ? '/publish' : '/login'} >vendre tes articles</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header