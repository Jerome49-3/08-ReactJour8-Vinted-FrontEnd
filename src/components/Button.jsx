import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from './Image';

const Button = ({ buttonText, classButton, handleClick, icon, classIcon, classInfo, classInfoText, infoText, showEl, txtShow1, txtShow2, src, alt }) => {
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
      </button>
    </>
  )
}

export default Button