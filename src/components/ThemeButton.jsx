import { ThemeContext } from "../context/ThemeProvider";
import { useContext } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faMoon, faSun);

const ThemeButton = () => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  // console.log('darkMode in themeButton:', darkMode);

  return (
    <>
      <button onClick={toggleTheme} className="btnTheme">
        {darkMode ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>
    </>
  );
};

export default ThemeButton;
