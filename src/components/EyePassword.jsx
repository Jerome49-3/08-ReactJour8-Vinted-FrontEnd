import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EyePassword = ({ icon1, icon2, state, setState }) => {

  const handleType = () => {
    setState(state === 'password' ? 'text' : 'password')
  }

  return (
    <>
      <FontAwesomeIcon icon={icon1} onClick={handleType} className={state !== 'password' ? 'hide' : null} />
      <FontAwesomeIcon icon={icon2} onClick={handleType} className={state !== 'text' ? 'hide' : null} />
    </>
  )
}

export default EyePassword