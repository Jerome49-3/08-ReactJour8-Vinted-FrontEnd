/* eslint-disable no-unsafe-optional-chaining */
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useUser } from "../assets/lib/userFunc";
import bannerSold from "../assets/images/bannerSolded.png";

//components
import Image from "./Image";
import Hearths from "./Hearths";

//images
import noImg from "../assets/images/no-image.jpg";

const OfferCard = ({ data, faHeart, farHeart, errorMessage }) => {
  const { fav } = useUser();
  // console.log("data ds OfferCard:", data);
  // console.log("fav ds OfferCard:", fav);
  let location = useLocation();
  // console.log("location ds OfferCard:", location);
  useEffect(() => {
    // console.log("Location has changed:", location);
    localStorage.setItem("favCard", JSON.stringify(fav));
  }, [fav, location]);
  const classImgArticle = "imgArticle";
  const classBannerSold = "classBannerSold";
  // console.log("fav after useEffect in OfferCard:", fav);

  return (
    <div className="boxArticles">
      {(location.pathname === "/favorites" ? fav : data).map((article) => {
        // const isFavorite = fav.some((favArticle) => favArticle?._id);
        // console.log("article ds .boxOffer:", article);
        return (
          <React.Fragment key={article._id}>
            <Link
              to={`/offers/${article._id}`}
              className={
                location.pathname === "/my-purchases" ||
                location.pathname === "/myOffers"
                  ? ""
                  : article?.offer_solded === true
                  ? "hide"
                  : ""
              }
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
                {location.pathname === "/myOffers" &&
                article?.offer_solded === true ? (
                  <div className="boxImgArticle">
                    {article?.product_image ? (
                      <>
                        <Image
                          src={article?.product_image?.secure_url}
                          classImg="imgArticle"
                        />
                        <Image
                          src={bannerSold}
                          classImg={`${classImgArticle} ${classBannerSold}`}
                        />
                      </>
                    ) : article?.product_pictures ? (
                      article?.product_pictures.map((images, index) => {
                        return (
                          index === 0 && (
                            <React.Fragment key={index}>
                              <Image
                                src={images?.secure_url}
                                classImg="imgArticle"
                              />
                              <Image
                                src={bannerSold}
                                classImg={`${classImgArticle} ${classBannerSold}`}
                              />
                            </React.Fragment>
                          )
                        );
                      })
                    ) : (
                      <Image src={noImg} alt="no image" />
                    )}
                  </div>
                ) : (
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
                )}

                <Hearths
                  article={article}
                  faHeart={faHeart}
                  farHeart={farHeart}
                />
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default OfferCard;
