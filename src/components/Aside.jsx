import Links from "./Links";
import { useNavigate } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";

//components
import Button from "./Button";
import PriceMinMaxInput from "./PriceMinMaxInput";
import LabeledTwoThumbs from "./LabeledTwoThumbs";

const Aside = ({
  showToggleNav,
  setShowToggleNav,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  showFilter,
}) => {
  // console.log('showToggleNav in aside:', showToggleNav);
  const { token, isAdmin, user, logout } = useUser();
  // console.log("user in aside:", user);
  // console.log("token in Aside:", token);

  const userId = user ? user._id : null;
  // console.log("userId in Aside:", userId);
  const navigate = useNavigate();
  return (
    <div className={showToggleNav ? "toggleNav" : "hideToggle"}>
      <div className="headAside">
        <Button
          buttonText="X"
          handleClick={() => {
            setShowToggleNav(false);
          }}
          classButton="btnCloseAside"
        />
      </div>
      <div className="boxAside">
        {showFilter ? (
          <div className={showFilter ? "boxFilterSearch" : "hideToggle"}>
            <PriceMinMaxInput
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
            />
            <div className="filterTwoThumbs">
              <LabeledTwoThumbs
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
              />
            </div>
          </div>
        ) : (
          <div className="boxFilterSearch"></div>
        )}
        <div className="bodyAside">
          <div className="boxTitleAside">
            <h3>Account</h3>
          </div>
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
      </div>
    </div>
  );
};

export default Aside;
