import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeButton from "./ThemeButton";
import { useUser } from "../assets/lib/userFunc";
import { useEffect } from "react";
//components
import Image from "./Image";
import Input from "./Input";
import Links from "./Links";
import LabeledTwoThumbs from "./LabeledTwoThumbs";

const Header = ({
  show,
  setShow,
  search,
  setSearch,
  showToggleNav,
  setShowToggleNav,
  priceMax,
  setPriceMax,
  priceMin,
  setPriceMin,
}) => {
  // console.log("search in header:", search);
  // console.log("showToggleNav in header:", showToggleNav);
  const { token, user, imgBoxUser } = useUser();
  // console.log("token in header:", token);
  console.log("user: in header:", user);
  console.log("imgBoxUser in header:", imgBoxUser);

  return (
    <header>
      <div className="wrapper">
        <div className="topHeader">
          <div className="boxLogoTheme">
            <Link to="/">
              <Image src={Logo} alt="Vinted" classImg="logo" />
            </Link>
            <div className="boxTheme">
              <ThemeButton />
            </div>
          </div>
          <div className="containerBoxSearch">
            <div className="boxSearch">
              <FontAwesomeIcon
                icon="magnifying-glass"
                className="search-icons"
              />
              <Input
                id="search"
                type="search"
                placeholder="Rechercher des articles"
                value={search}
                setState={setSearch}
              />
            </div>
          </div>
          <nav>
            <ul>
              {(!token || !user) && (
                <li>
                  <div className="buttonSignIn">
                    <button onClick={() => setShow(!show)}>s'inscrire</button>
                  </div>
                  <div>
                    <Link to="/login" className="linkConnect">
                      connexion
                    </Link>
                  </div>
                </li>
              )}
              <li>
                <Links
                  path={token ? "/publish" : "/login"}
                  linkText="vendre tes articles"
                />
              </li>
              {token && user ? (
                <li
                  className="boxUser"
                  onClick={() => {
                    setShowToggleNav(!showToggleNav);
                  }}
                >
                  <div className="hello">{user?.account?.username}</div>
                  <div className="boxAvatar">
                    <Image
                      src={imgBoxUser}
                      alt="imgBoxUser"
                      classImg="imgAvatar"
                    />
                  </div>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
        <div className="bottomHeader">
          {search && (
            <LabeledTwoThumbs
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
