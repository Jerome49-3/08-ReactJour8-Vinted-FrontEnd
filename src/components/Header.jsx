import { Link } from "react-router-dom";
import Image from './Image';
import Logo from '../assets/images/logo.svg';
import Input from "./Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ show, setShow }) => {
  return (
    <header>
      <div className="wrapper">
        <Link to='/'>
          <Image src={Logo} alt='Vinted' classImg='logo' />
        </Link>
        <div className="boxSearch">
          <FontAwesomeIcon icon="magnifying-glass" className="search-icons" />
          <Input id='search' type='search' placeholder='Rechercher des articles' />
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/offer'>offres</Link>
            </li>
            <li>
              <div><Link to='/signup'>s'inscrire</Link></div>
              <div>|</div>
              <div className="buttonSignIn">
                <button onClick={() => {
                  { show === false ? (setShow(true)) : (setShow(false)) }
                }}>se connecter</button>
              </div>
            </li>
            <li>
              <Link to='/sealit'>vendre tes articles</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header