import { useUser } from "../assets/lib/userFunc";
const InfoUserErrorMessage = () => {
  const { errorMessage, infoUser } = useUser();
  const black = "black";
  const infoUserCenter = "infoUserCenter";
  return (
    <>
      {infoUser ? (
        <p className={`${black} ${infoUserCenter}`}>{infoUser}</p>
      ) : (
        <p></p>
      )}
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : <p></p>}
    </>
  );
};

export default InfoUserErrorMessage;
