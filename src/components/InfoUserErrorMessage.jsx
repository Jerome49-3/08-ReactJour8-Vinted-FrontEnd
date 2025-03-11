/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
const InfoUserErrorMessage = () => {
  const { errorMessage, setErrorMessage, infoUser, setInfoUser } = useUser();
  // console.log("errorMessage in InfoUserErrorMessage:", errorMessage);
  // console.log("infoUser in InfoUserErrorMessage:", infoUser);
  const black = "black";
  const infoUserCenter = "infoUserCenter";
  useEffect(() => {
    setTimeout(() => {
      if (errorMessage) {
        setErrorMessage("");
      } else if (infoUser) {
        setInfoUser("");
      }
    }, 3000);
  }, [errorMessage, infoUser]);

  return (
    <div className="boxInfoErrorMessage">
      {infoUser && <p className={`${black} ${infoUserCenter}`}>{infoUser}</p>}
      {errorMessage && <p className="red">{errorMessage}</p>}
    </div>
  );
};

export default InfoUserErrorMessage;
