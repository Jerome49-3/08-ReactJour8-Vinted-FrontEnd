/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
//components
import Input from "./Input";

const LoadedInputSubmit = ({ isSended, setIsSended, value }) => {
  useEffect(() => {
    setIsSended(false);
  }, []);
  return (
    <>
      {isSended !== true ? (
        <Input type="submit" value={value} />
      ) : (
        <div className="boxLoaded">
          <div className="loaded"></div>
        </div>
      )}
    </>
  );
};

export default LoadedInputSubmit;
