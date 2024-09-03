import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import Links from "./Links";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const { token, isAdmin, clearUser, showToggleNav, setShowToggleNav } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className={showToggleNav === true ? 'toggleNav' : 'hideToggle'}>
      {isAdmin === true && <Links path='/dashboard' linkText='Dashboard' />}
      {token && <button onClick={() => {
        clearUser();
        setShowToggleNav(false);
        navigate('/')
      }}>Se deconnecter</button>}
    </div>
  )
}

export default Aside