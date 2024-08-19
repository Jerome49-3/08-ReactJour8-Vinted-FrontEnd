// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from './Image';
import Cookies from 'js-cookie';

const Button = ({ buttonText, classButton, handleClick, icon, classIcon, classInfo, classInfoText, infoText, showEl, txtShow1, txtShow2, src, alt, handleMouseUp, handleMouseDown, fav, setFav }) => {
  return (
    <>
      <button className={classButton} onClick={handleClick} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
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