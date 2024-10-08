import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import Links from "./Links";
import { useNavigate } from "react-router-dom";

const Aside = ({ showToggleNav, setShowToggleNav }) => {
  // console.log('showToggleNav in aside:', showToggleNav);
  const { token, isAdmin, clearUser } = useContext(UserContext);
  console.log('token in Aside:', token)
  const navigate = useNavigate();
  return (
    <div className={showToggleNav === true ? 'toggleNav' : 'hideToggle'}>
      {isAdmin === true && token && <Links path='/dashboard' linkText='Dashboard' />}
      {token && <Links path='/my-sales' linkText='Mes Ventes' />}
      {token && <Links path='/my-purchases' linkText='Mes Achats' />}
      {token && <button onClick={() => {
        clearUser();
        setShowToggleNav(false);
        navigate('/')
      }}>Se deconnecter</button>}
    </div>
  )
}

export default Aside