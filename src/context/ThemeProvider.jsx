import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const cookieTheme = Cookies.get("vintaidAppTheme");
    console.log(
      "cookieTheme",
      cookieTheme,
      "\n",
      "typeof cookieTheme",
      typeof cookieTheme
    );

    if (cookieTheme === "dark") {
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
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [darkMode]);

  function toggleTheme() {
    const theme = !darkMode;
    setDarkMode(theme);
    Cookies.set("vintaidAppTheme", theme ? "dark" : "light", { expires: 15 });
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
