const Image = ({ src, alt, classImg, rotation }) => {
  // console.log(
  //   "src in image:",
  //   src,
  //   "\n",
  //   "alt in image:",
  //   alt,
  //   "\n",
  //   "classImg in image:",
  //   classImg,
  //   "\n",
  //   "rotation in image:",
  //   rotation
  // );
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
