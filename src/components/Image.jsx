
const Image = ({ src, alt, classImg }) => {
  // console.log("src, alt, imgHeader in image:", src, alt, classImg);
  return (
    <>
      <img src={src} alt={alt} className={classImg} />
    </>
  )
}

export default Image