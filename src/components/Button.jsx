import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from './Image';
import Links from './Links';

const Button = ({ buttonText, classButton, handleClick, icon, classIcon, classInfo, classInfoText, infoText, showEl, txtShow1, txtShow2, src, alt, path, classLink }) => {
  return (
    <>
      <button className={classButton} onClick={handleClick}>
        {buttonText ? (<p>{buttonText}</p>) : (null)}
        {icon ? (<FontAwesomeIcon icon={icon} className={classIcon} />) : (null)}
        {src ? (<Image src={src} alt={alt} />) : (null)}
        {classInfo ?
          (
            <div className={classInfo}>
              <h3 className={classInfoText}>{infoText}</h3>
            </div>
          ) : (null)}
        {showEl ? (txtShow1 = { txtShow1 }) : (txtShow2)}
        {path ? <Links path={path} classLink={classLink} /> : null}
      </button>
    </>
  )
}

export default Button