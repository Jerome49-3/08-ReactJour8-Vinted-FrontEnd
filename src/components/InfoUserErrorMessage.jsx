import { useUser } from "../assets/lib/userFunc";
const InfoUserErrorMessage = () => {
  const { errorMessage, infoUser } = useUser();
  return (
    <>
      {infoUser ? <p className="black">{infoUser}</p> : <p></p>}
      {errorMessage ? <p className="red">{errorMessage}</p> : <p></p>}
    </>
  );
};

export default InfoUserErrorMessage;
