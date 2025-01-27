import axios from "axios";

const setCredentielsAxios = () => {
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  ) {
    return (axios.defaults.withCredentials = true);
  } else return (axios.defaults.withCredentials = false);
};
export default setCredentielsAxios;
