/* eslint-disable react-hooks/exhaustive-deps */
import Button from "./Button";
import { useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
const Trash = ({ faTrash, handleClick }) => {
  const { showTrash, setShowTrash, isSended, setIsSended, location } =
    useUser();
  // console.log(
  //   "showTrash on Trash:",
  //   showTrash,
  //   "\n",
  //   "isSended on Trash:",
  //   isSended
  // );

  useEffect(() => {
    console.log("location in Trash:", location);
    if (
      location.pathname === "/myOffers" ||
      location.pathname === "/dashboard"
    ) {
      setShowTrash(true);
    } else {
      setShowTrash(false);
    }
  }, [location.pathname, showTrash]);

  useEffect(() => {
    setIsSended(false);
  }, []);

  return (
    <>
      {showTrash === true &&
        (isSended !== true ? (
          <Button
            icon={faTrash}
            classButton="btnTrash"
            handleClick={handleClick}
          />
        ) : (
          <div className="boxLoaded">
            <div className="loaded"></div>
          </div>
        ))}
    </>
  );
};

export default Trash;
