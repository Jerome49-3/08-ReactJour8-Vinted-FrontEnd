import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const cookieTheme = Cookies.get("vintaidTheme");
    // console.log(
    //   "cookieTheme",
    //   cookieTheme,
    //   "\n",
    //   "typeof cookieTheme",
    //   typeof cookieTheme
    // );
    if (cookieTheme === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const theme = !darkMode;
    // console.log("theme in themeProvider:", theme);
    setDarkMode(theme);
    Cookies.set("vintaidTheme", theme ? "true" : "false", { expires: 15 });
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
