//components
import Button from "./Button"
const ImgsModal = ({ showImgsModal, setShowImgsModal }) => {

  const handleShowImgs = () => {
    showImgsModal === false ? (setShowImgsModal(true)) : (setShowImgsModal(false))
  }

  return (
    <div className='boxModal'>
      <div className='boxModalContent'>
        <Button handleClick={handleShowImgs} buttonText='X' />
      </div>
    </div>
  )
}

export default ImgsModal