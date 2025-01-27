import Links from "./Links";
import { useNavigate } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";

const Aside = ({ showToggleNav, setShowToggleNav }) => {
  // console.log('showToggleNav in aside:', showToggleNav);
  const { token, isAdmin, user, logout } = useUser();
  // console.log("user in aside:", user);
  // console.log("token in Aside:", token);

  const userId = user ? user._id : null;
  // console.log("userId in Aside:", userId);

  const navigate = useNavigate();
  return (
    <div className={showToggleNav === true ? "toggleNav" : "hideToggle"}>
      {isAdmin === true && token ? (
        <Links path="/dashboard" linkText="Dashboard" />
      ) : null}
      {token && <Links path="/myOffers" linkText="Mes Offres" />}
      {token && <Links path="/my-purchases" linkText="Mes Achats" />}
      {token && <Links path="/favorites" linkText="Mes favoris" />}
      {token && user && userId && (
        <Links path={`/profile/${userId}`} linkText="Mon Profil" />
      )}
      {token && (
        <button
          onClick={() => {
            logout();
            setShowToggleNav(false);
            navigate("/");
          }}
        >
          Se deconnecter
        </button>
      )}
    </div>
  );
};

export default Aside;
