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
import LabeledTwoThumbs from "./LabeledTwoThumbs";
import { useUser } from '../context/lib/userFunc';

const Header = ({ show, setShow, search, setSearch, showToggleNav, setShowToggleNav, priceMax, setPriceMax, priceMin, setPriceMin }) => {
  // console.log('search in header:', search);
  // console.log('showToggleNav in header:', showToggleNav);
  const { token, user } = useUser();
  // console.log('token in header:', token, '\n', 'isAdmin in header:', isAdmin, '\n', 'user: in header:', user);
  // console.log('typeof token in header:', typeof token, '\n', 'typeof isAdmin in header:', typeof isAdmin);


  return (
    <header>
      <div className="wrapper">
        <div className="topHeader">
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
                <li>
                  <div className="buttonSignIn">
                    <button onClick={() => {
                      { show === false ? (setShow(true)) : (setShow(false)) }
                    }}>s'inscrire</button>
                  </div>
                  <div><Link to='/login' className="linkConnect">se connecter</Link></div>
                </li>
              )}
              <li>
                <Links path={token !== null && token !== undefined ? '/publish' : '/login'} linkText='vendre tes articles' />
              </li>
              {(token && user) ? (
                <li className="boxUser" onClick={() => { setShowToggleNav(!showToggleNav) }}>
                  <div className="hello">Bonjour {user.account.username}</div>
                  {user.account.avatar.secure_url ? (
                    <>
                      <Image src={user.account.avatar.secure_url} alt="avatar" classImg='imgAvatar' />
                    </>
                  ) : (<Image src={user.account.avatar} alt="avatar" classImg='imgAvatar' />)}
                </li>
              ) : (null)}
              <Aside showToggleNav={showToggleNav} setShowToggleNav={setShowToggleNav} />
            </ul>
          </nav>
        </div>
        <div className="bottomHeader">
          {search && <LabeledTwoThumbs priceMin={priceMin} setPriceMin={setPriceMin} priceMax={priceMax} setPriceMax={setPriceMax} />}
        </div>
      </div>
    </header >
  )
}

export default Header