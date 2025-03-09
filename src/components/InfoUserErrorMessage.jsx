/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
const InfoUserErrorMessage = () => {
  const { errorMessage, setErrorMessage, infoUser } = useUser();
  console.log("errorMessage in InfoUserErrorMessage:", errorMessage);
  // console.log("infoUser in InfoUserErrorMessage:", infoUser);
  const black = "black";
  const infoUserCenter = "infoUserCenter";
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);

  return (
    <div className="boxInfoErrorMessage">
      {infoUser && <p className={`${black} ${infoUserCenter}`}>{infoUser}</p>}
      {errorMessage && <p className="red">{errorMessage}</p>}
    </div>
  );
};

export default InfoUserErrorMessage;
