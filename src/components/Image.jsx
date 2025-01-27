const Image = ({ src, alt, classImg, rotation }) => {
  // console.log("src, alt, imgHeader in image:", src, alt, classImg);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={classImg}
        style={{
          ...{ classImg },
          ...(rotation && { transform: `rotate(${rotation}deg)` }),
        }}
      />
    </>
  );
};

export default Image;
