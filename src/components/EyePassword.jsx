import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EyePassword = ({ faEye, faEyeSlash, type, setType }) => {
  // console.log("type in EyePassword:", type);

  const handleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faEye}
        onClick={handleType}
        className={type !== "password" ? "hide" : "show"}
      />
      <FontAwesomeIcon
        icon={faEyeSlash}
        onClick={handleType}
        className={type !== "text" ? "hide" : "show"}
      />
    </>
  );
};

export default EyePassword;
