import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EyePassword = ({ icon1, icon2, type, setType }) => {
  console.log("state in EyePassword:", type);

  const handleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <>
      <FontAwesomeIcon
        icon={icon1}
        onClick={handleType}
        className={type !== "password" && "hide"}
      />
      <FontAwesomeIcon
        icon={icon2}
        onClick={handleType}
        className={type !== "text" && "hide"}
      />
    </>
  );
};

export default EyePassword;
