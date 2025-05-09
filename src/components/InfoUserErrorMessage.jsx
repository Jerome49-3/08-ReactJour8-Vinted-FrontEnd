/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useUser } from "../assets/lib/userFunc";
const InfoUserErrorMessage = () => {
  const black = "black";
  const infoUserCenter = "infoUserCenter";
  const { errorMessage, setErrorMessage, infoUser, setInfoUser, location } =
    useUser();
  // console.log("errorMessage in InfoUserErrorMessage:", errorMessage);
  // console.log("infoUser in InfoUserErrorMessage:", infoUser);
  console.log("location:", location);
  let isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
    } else {
      if (location.pathname !== "/login") {
        const suppMssgUser = setTimeout(() => {
          if (errorMessage) {
            setErrorMessage("");
          } else if (infoUser) {
            setInfoUser("");
          }
        }, 3000);
        return () => {
          clearTimeout(suppMssgUser);
        };
      } else {
        const suppMssgUser = setTimeout(() => {
          if (errorMessage) {
            setErrorMessage("");
          } else if (infoUser) {
            setInfoUser("");
          }
        }, 10000);
        return () => {
          clearTimeout(suppMssgUser);
        };
      }
    }
  }, [location.pathname, errorMessage, infoUser]);

  return (
    <div className="boxInfoErrorMessage">
      {infoUser && <p className={`${black} ${infoUserCenter}`}>{infoUser}</p>}
      {errorMessage && <p className="red">{errorMessage}</p>}
    </div>
  );
};

export default InfoUserErrorMessage;
