import Links from "./Links";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/lib/userFunc';

const Aside = ({ showToggleNav, setShowToggleNav }) => {
  // console.log('showToggleNav in aside:', showToggleNav);
  const { token, isAdmin, logout } = useUser();
  // console.log('token in Aside:', token);
  const navigate = useNavigate();
  return (
    <div className={showToggleNav === true ? 'toggleNav' : 'hideToggle'}>
      {(isAdmin === true && token) ? <Links path='/dashboard' linkText='Dashboard' /> : (null)}
      {token && <Links path='/myOffers' linkText='Mes Offres' />}
      {token && <Links path='/my-purchases' linkText='Mes Achats' />}
      {token && <button onClick={() => {
        logout();
        setShowToggleNav(false);
        navigate('/')
      }}>Se deconnecter</button>}
    </div>
  )
}

export default Aside