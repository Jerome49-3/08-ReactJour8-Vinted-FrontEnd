/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
//components
import Image from "./Image";

const LoadedInputSubmit = ({
  isSended,
  setIsSended,
  value,
  src,
  alt,
  classImg,
  id,
  classInput,
}) => {
  useEffect(() => {
    setIsSended(false);
  }, []);
  return (
    <>
      {isSended !== true ? (
        <label htmlFor={id} className="classLabelInputSubmit">
          <input
            id={id}
            type="submit"
            name={id}
            value={value}
            className={classInput}
          />
          {src ? <Image src={src} alt={alt} classImg={classImg} /> : null}
        </label>
      ) : (
        <div className="boxLoaded">
          <div className="loaded"></div>
        </div>
      )}
    </>
  );
};

export default LoadedInputSubmit;
