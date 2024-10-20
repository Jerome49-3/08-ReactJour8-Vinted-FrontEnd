//components
import Button from "./Button";
import Image from './Image';

const ImgsModal = ({ showImgsModal, setShowImgsModal, srcImgsModal }) => {
  console.log('showImgsModal in imgssMoadl:', showImgsModal);
  console.log('srcImgsModal in imgssMoadl:', srcImgsModal);


  const handleShowImgs = () => {
    showImgsModal === false ? (setShowImgsModal(true)) : (setShowImgsModal(false))
  }

  return (
    <div className='boxModal'>
      <div className='boxModalContent'>
        <Button handleClick={handleShowImgs} buttonText='X' />
        {showImgsModal === true && <Image src={srcImgsModal} />}
      </div>
    </div>
  )
}

export default ImgsModal