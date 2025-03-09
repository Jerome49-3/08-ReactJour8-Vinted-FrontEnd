import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  console.log("darkMode in ThemeProvider:", darkMode);

  useEffect(() => {
    const cookieDarkLight = Cookies.get("vintaidAppTheme");
    // console.log(
    //   "cookieDarkLight",
    //   cookieDarkLight,
    //   "\n",
    //   "typeof cookieDarkLight",
    //   typeof cookieDarkLight
    // );

    if (cookieDarkLight === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    Cookies.set("vintaidAppTheme", darkMode ? "dark" : "light", {
      expires: 15,
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
