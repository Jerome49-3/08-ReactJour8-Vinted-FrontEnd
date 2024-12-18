/* eslint-disable no-unsafe-optional-chaining */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";

//components
import Image from "../components/Image";

//images
import noImg from "../assets/images/no-image.jpg";

const OfferCard = ({ data, faHeart, farHeart, fav, setFav }) => {
  useEffect(() => {
    localStorage.setItem("favCard", JSON.stringify(fav));
  }, [fav]);
  console.log("fav in OfferCard:", fav);
  console.log("typeof fav in OfferCard:", typeof fav);
  const favIsArray = Array.isArray(fav);
  console.log("favIsArray:", favIsArray);
  // create ref object who contain ref of each article
  const heartsRefs = useRef({});

  const handleToggle = (e, article) => {
    e.preventDefault();

    const heartEmpty = heartsRefs.current[`${article._id}-heartEmpty`];
    const heartFull = heartsRefs.current[`${article._id}-heartFull`];

    if (heartEmpty && heartFull) {
      heartEmpty.classList.toggle("show");
      heartFull.classList.toggle("hide");
      heartFull.classList.toggle("show");
      heartEmpty.classList.toggle("hide");
    }

    const isFavorite = fav.some((favArticle) => favArticle._id === article._id);
    // console.log("isFavorite in handleToggle:", isFavorite);
    let newFav;
    if (isFavorite) {
      // Remove article
      newFav = fav.filter((favArticle) => favArticle._id !== article._id);
      // console.log("newFav in if:", newFav);
    } else {
      // Add article
      newFav = [...fav, article];
      // console.log("newFav in else:", newFav);
    }
    setFav(newFav);
    // console.log("fav in else:", fav);
    localStorage.setItem("favCard", JSON.stringify(newFav));
  };

  return (
    <div className="boxArticles">
      {data.map((article) => {
        // console.log("article ds .boxOffer:", article);
        return (
          <React.Fragment key={article._id}>
            <Link
              to={`/offers/${article._id}`}
              className={article?.offer_solded === true ? "hide" : ""}
            >
              <article>
                <div className="boxUser">
                  {article?.owner?.account?.avatar?.secure_url ? (
                    <Image
                      src={article?.owner?.account?.avatar.secure_url}
                      alt="avatar"
                      classImg="imgAvatar"
                    />
                  ) : (
                    <Image
                      src={article?.owner?.account?.avatar}
                      alt="avatar"
                      classImg="imgAvatar"
                    />
                  )}
                  <h5>{article?.owner?.account?.username}</h5>
                </div>
                <div className="boxImgArticle">
                  {article?.product_image ? (
                    <Image
                      src={article?.product_image?.secure_url}
                      classImg="imgArticle"
                    />
                  ) : article?.product_pictures ? (
                    article?.product_pictures.map((images, index) => {
                      return (
                        index === 0 && (
                          <React.Fragment key={index}>
                            <Image
                              src={images?.secure_url}
                              classImg="imgArticle"
                            />
                          </React.Fragment>
                        )
                      );
                    })
                  ) : (
                    <Image src={noImg} alt="no image" />
                  )}
                </div>
                <button
                  className="boxHearth"
                  onClick={(e) => handleToggle(e, article)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="hide"
                    ref={(el) =>
                      (heartsRefs.current[`${article._id}-heartFull`] = el)
                    }
                  />
                  <FontAwesomeIcon
                    icon={farHeart}
                    className="show"
                    ref={(el) =>
                      (heartsRefs.current[`${article._id}-heartEmpty`] = el)
                    }
                  />
                </button>
                <div className="footerArticle">
                  <div>{article?.product_details[0]?.MARQUE}</div>
                  <div className="description">
                    {(article?.product_price).toFixed(2)} €
                  </div>
                </div>
              </article>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OfferCard;
