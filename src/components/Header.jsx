import { Link, useNavigate } from "react-router-dom";
import Image from './Image';
import Logo from '../assets/images/logo.svg';
import Input from "./Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from "js-cookie";

const Header = ({ show, setShow, token, setToken, search, setSearch }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="wrapper">
        <Link to='/'>
          <Image src={Logo} alt='Vinted' classImg='logo' />
        </Link>
        <div className="boxSearch">
          <FontAwesomeIcon icon="magnifying-glass" className="search-icons" />
          <Input id='search' type='search' placeholder='Rechercher des articles' value={search} setState={setSearch} />
        </div>
        <nav>
          <ul>
            <li></li>
            {token ? (
              <li><button onClick={() => {
                Cookies.remove("vintedApp");
                setToken(null);
                navigate('/')
              }}>Se deconnecter</button></li>
            ) : (
              <li>
                <div><Link to='/signup'>s'inscrire</Link></div>
                <div>|</div>
                <div className="buttonSignIn">
                  <button onClick={() => {
                    { show === false ? (setShow(true)) : (setShow(false)) }
                  }}>se connecter</button>
                </div>
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