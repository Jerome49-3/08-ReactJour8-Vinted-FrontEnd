import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThemeButton from "./ThemeButton";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";


//components
import Image from './Image';
import Aside from "./Aside";
import Input from "./Input";
import Links from "./Links";

const Header = ({ show, setShow, search, setSearch }) => {


  const { token, user, showToggleNav, setShowToggleNav } = useContext(UserContext);
  // console.log('token in header:', token, '\n', 'isAdmin in header:', isAdmin, '\n', 'user: in header:', user);
  // console.log('typeof token in header:', typeof token, '\n', 'typeof isAdmin in header:', typeof isAdmin);
  return (
    <header>
      <div className="wrapper">
        <div className="boxLogoTheme">
          <Link to='/'>
            <Image src={Logo} alt='Vinted' classImg='logo' />
          </Link>
          <div className="boxTheme">
            <ThemeButton />
          </div>
        </div>
        <div className="boxSearch">
          <FontAwesomeIcon icon="magnifying-glass" className="search-icons" />
          <Input id='search' type='search' placeholder='Rechercher des articles' value={search} setState={setSearch} />
        </div>
        <nav>
          <ul>
            {token === null && (
              <>
                <li>
                  <div className="buttonSignIn">
                    <button onClick={() => {
                      { show === false ? (setShow(true)) : (setShow(false)) }
                    }}> s'inscrire</button>
                  </div>
                  <div>|</div>
                  <div><Link to='/login'>se connecter</Link></div>
                </li>
                <li>
                  <Links path={token !== null && token !== undefined ? '/publish' : '/login'} linkText='vendre tes articles' />
                </li>
              </>

            )}
            {token ? (
              <div className='boxUser' onClick={() => { setShowToggleNav(!showToggleNav) }}>
                <div className="hello">bonjour {user.account.username}</div>
                {user.account.avatar.secure_url ? (
                  <>
                    <Image src={user.account.avatar.secure_url} alt="avatar" classImg='imgAvatar' />
                  </>
                ) : (<Image src={user.account.avatar} alt="avatar" classImg='imgAvatar' />)}
              </div>
            ) : (null)}
            <Aside />
          </ul>
        </nav>
      </div>
    </header >
  )
}

export default Header