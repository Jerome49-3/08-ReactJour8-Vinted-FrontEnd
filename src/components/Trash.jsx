/* eslint-disable react-hooks/exhaustive-deps */
import Button from "./Button";
import { useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
const Trash = ({ faTrash, handleClick }) => {
  const { showTrash, setShowTrash, location } = useUser();
  // console.log("location on Trash:", location);

  useEffect(() => {
    // console.log("location in Trash:", location);
    if (location.pathname === "/myOffers") {
      setShowTrash(true);
    }
  }, [location.pathname]);

  return (
    <>
      {showTrash && (
        <Button
          icon={faTrash}
          classButton="btnTrash"
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default Trash;
