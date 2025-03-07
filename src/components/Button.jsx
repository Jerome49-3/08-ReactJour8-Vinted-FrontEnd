import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "./Image";
import Links from "./Links";

const Button = ({
  buttonText,
  classButton,
  handleClick,
  icon,
  classIcon,
  classInfo,
  classInfoText,
  infoText,
  showEl,
  txtShow1,
  txtShow2,
  src,
  alt,
  classImg,
  path,
  classLink,
  rotation,
  linkText,
}) => {
  return (
    <>
      <button className={classButton} onClick={handleClick} type="button">
        {buttonText ? <p>{buttonText}</p> : null}
        {icon ? <FontAwesomeIcon icon={icon} className={classIcon} /> : null}
        {src ? (
          <Image src={src} alt={alt} classImg={classImg} rotation={rotation} />
        ) : null}
        {classInfo ? (
          <div className={classInfo}>
            <h3 className={classInfoText}>{infoText}</h3>
          </div>
        ) : null}
        {showEl ? (txtShow1 = { txtShow1 }) : txtShow2}
        {path ? (
          <Links path={path} classLink={classLink} linkText={linkText} />
        ) : null}
      </button>
    </>
  );
};

export default Button;
