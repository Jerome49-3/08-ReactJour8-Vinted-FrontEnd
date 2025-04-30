/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../assets/lib/userFunc";

const Hearths = ({ faHeart, farHeart, article }) => {
  const { fav, setFav, axios } = useUser();
  // console.log("fav inside Hearths:", fav);
  const [isFavorite, setIsFavorite] = useState();
  const heartsRefs = useRef({});
  useEffect(() => {
    if (fav && Array.isArray(fav)) {
      // console.log("fav inside useEffect to Hearths:", fav);
      const inFavorite = fav.some(
        (favArticle) => favArticle._id === article._id
      );
      if (inFavorite) {
        setIsFavorite(inFavorite);
      }
    }
  }, [fav]);
  // console.log("isFavorite after useEffect in BoxHearth:", isFavorite);
  const handleToggle = (e, article) => {
    console.log("article in handleToggle:", article);
    e.preventDefault();

    const heartEmpty = heartsRefs.current[`${article._id}-heartEmpty`];
    const heartFull = heartsRefs.current[`${article._id}-heartFull`];

    if (heartEmpty && heartFull) {
      heartEmpty.classList.toggle("show");
      heartFull.classList.toggle("hide");
      heartFull.classList.toggle("show");
      heartEmpty.classList.toggle("hide");
    }
    // const favIsArray = Array.isArray(fav);
    // console.log("favIsArray:", favIsArray);
    // create ref object who contain ref of each article
    // const isFavorite = fav.some((favArticle) => favArticle._id === article._id);
    // console.log("isFavorite in handleToggle:", isFavorite);
    let newFav;
    if (isFavorite) {
      // Remove article
      newFav = fav.filter((favArticle) => favArticle._id !== article._id);
      // console.log("newFav in if:", newFav);
      const deleteFavorite = async () => {
        const id = article._id;
        try {
          const response = await axios.put(
            `http://localhost:3000/suppFavOffer/${id}`
          );
          console.log("response.data in /suppFavOffer/${id}:", response?.data);
          if (response?.data) {
            setInfoUser(response?.data?.infoUser);
          }
        } catch (error) {
          console.log("error in /suppFavOffer/${id}:", error);
          console.log(
            "error.response in /suppFavOffer/${id}:",
            error?.response
          );
        }
      };
      deleteFavorite();
    } else {
      // Add article
      newFav = [...fav, article];
      // console.log("newFav in else:", newFav);
      const addFavorite = async () => {
        const id = article._id;
        try {
          const response = await axios.put(
            `http://localhost:3000/addFavOffer/${id}`
          );
          console.log("response.data in /suppFavOffer/${id}:", response?.data);
          if (response?.data) {
            setInfoUser(response?.data?.infoUser);
          }
        } catch (error) {
          console.log("error in /suppFavOffer/${id}:", error);
          console.log(
            "error.response in /suppFavOffer/${id}:",
            error?.response
          );
        }
      };
      addFavorite();
    }
    setFav(newFav);
    // console.log("fav in else:", fav);
    localStorage.setItem("favCard", JSON.stringify(newFav));
  };

  return (
    <React.Fragment>
      <button className="boxHearth" onClick={(e) => handleToggle(e, article)}>
        <FontAwesomeIcon
          icon={faHeart}
          className={isFavorite === true ? "show" : "hide"}
          ref={(el) => (heartsRefs.current[`${article._id}-heartFull`] = el)}
        />
        <FontAwesomeIcon
          icon={farHeart}
          className={isFavorite === true ? "hide" : "show"}
          ref={(el) => (heartsRefs.current[`${article._id}-heartEmpty`] = el)}
        />
        <div>{article?.isFavorite}</div>
      </button>
    </React.Fragment>
  );
};

export default Hearths;
