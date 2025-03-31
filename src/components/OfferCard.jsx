/* eslint-disable no-unsafe-optional-chaining */
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import bannerSold from "../assets/images/bannerSolded.png";
import fetchDeleteOffer from "../assets/fetchDataLib/DELETE/fetchDeleteOffer";
//components
import Image from "./Image";
import Hearths from "./Hearths";
import Trash from "./Trash";

//images
import noImg from "../assets/images/no-image.jpg";

const OfferCard = ({ faHeart, farHeart, errorMessage, faTrash }) => {
  const { fav, data, setData, axios, setInfoUser, setIsSended } = useUser();
  // console.log("data ds OfferCard:", data);
  // console.log("fav ds OfferCard:", fav);
  let location = useLocation();
  // console.log("location ds OfferCard:", location);
  useEffect(() => {
    // console.log("Location has changed:", location);
    localStorage.setItem("favCard", JSON.stringify(fav));
  }, [fav]);

  const classImgArticle = "imgArticle";
  const classBannerSold = "classBannerSold";
  const boxArticleHome = "boxOfferCard";
  const adjustBoxArticle = "adjBoxArticle";
  // console.log("fav after useEffect in OfferCard:", fav);

  return (
    <div
      className={
        location.pathname === "/"
          ? `${boxArticleHome} ${adjustBoxArticle}`
          : "boxOfferCard"
      }
    >
      {(location.pathname === "/favorites" ? fav : data)?.map((article) => {
        // const isFavorite = fav.some((favArticle) => favArticle?._id);
        // console.log("article ds .boxOffer:", article);
        const offerId = article._id;
        return (
          <React.Fragment key={offerId}>
            <Link
              to={`/offers/${offerId}`}
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
                  <Image
                    src={
                      article?.owner?.account?.avatar?.secure_url ||
                      article?.owner?.account?.avatar ||
                      article?.owner?.avatar ||
                      article?.offer?.owner?.account?.avatar?.secure_url
                    }
                    alt="avatar"
                    classImg="imgAvatar"
                  />
                  <h5>
                    {article?.offer?.owner?.account?.username ||
                      article?.owner?.account?.username}
                  </h5>
                </div>
                {location.pathname === "/myOffers" &&
                article?.offer_solded === true ? (
                  <div className="boxImgArticle">
                    {article?.offer?.product_image || article?.product_image ? (
                      <>
                        <Image
                          src={
                            article?.offer?.product_image?.secure_url ||
                            article?.product_image?.secure_url
                          }
                          classImg="imgArticle"
                        />
                        <Image
                          src={bannerSold}
                          classImg={`${classImgArticle} ${classBannerSold}`}
                        />
                      </>
                    ) : article?.offer?.product_pictures ||
                      article?.product_pictures ? (
                      (
                        article?.offer?.product_pictures ||
                        article?.product_pictures
                      )?.map((images, index) => {
                        console.log("images:", images);

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
                    {article?.offer?.product_image || article?.product_image ? (
                      <Image
                        src={
                          article?.offer?.product_image?.secure_url ||
                          article?.product_image?.secure_url
                        }
                        classImg="imgArticle"
                      />
                    ) : article?.offer?.product_pictures ||
                      article?.product_pictures ? (
                      (
                        article?.offer?.product_pictures ||
                        article?.product_pictures
                      ).map((images, index) => {
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
                <div className="boxTrashHearth">
                  <Trash
                    faTrash={faTrash}
                    handleClick={() => {
                      fetchDeleteOffer(
                        axios,
                        offerId,
                        setInfoUser,
                        setIsSended,
                        setData
                      );
                    }}
                  />
                  <Hearths
                    article={article}
                    faHeart={faHeart}
                    farHeart={farHeart}
                  />
                </div>
                <div className="footerArticle">
                  <div className="boxNameMarque">
                    <div>{article?.product_name}</div>
                    {(article?.offer?.product_details[0]?.MARQUE ||
                      article?.product_details[0]?.MARQUE) && (
                      <div>
                        {article?.offer?.product_details[0]?.MARQUE ||
                          article?.product_details[0]?.MARQUE}
                      </div>
                    )}
                  </div>
                  <div className="price">
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
