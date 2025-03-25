/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";
// import { ReactFragment } from "react";

//images
import noImg from "../assets/images/no-image.jpg";
import bannerSold from "../assets/images/bannerSolded.png";

//components
import Hero from "../components/Hero";
import Image from "../components/Image";
import Button from "../components/Button";

//lib
import classRotation from "../assets/lib/classRotation";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";

const OfferID = ({ showImgsModal, setShowImgsModal, setSrcImgsModal }) => {
  const { axios, infoUser, setInfoUser, showHero, data, setData } = useUser();
  console.log("infoUser on OfferID:", infoUser);

  // console.log('showHero in Offer:', showHero, '\n', 'token in Offer:', token);
  const { id } = useParams();
  // console.log("id1 in /offers/${id}:", id);
  const [imgsNbr, setImgsNbr] = useState(0);
  console.log("data in OfferId:", data);
  let [price, setPrice] = useState(0);
  const prices = Number(price).toFixed(2);
  // console.log("prices in OfferId:", prices);
  // console.log('prices in /offers/${id}:', prices);
  const [isLoading, setIsLoading] = useState(true);
  const rotation = classRotation(data);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("id inside useEffect in /offers/${id}:", id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL_OFFERID}${id}`
        );
        console.log("response in /offers/${id}:", response);
        if (response?.data) {
          setData(response.data);
          setIsLoading(false);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("error?.response:", error?.response);
        console.log(
          "error?.response?.data?.message:",
          error?.response?.data?.infoUser
        );
        setInfoUser(error?.response?.data?.infoUser);
        if (infoUser) {
          navigate("/");
        }
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const setPrices = () => {
      setPrice(data?.product_price);
      // console.log('data.product_price in second useEffect:', data.product_price);
    };
    if (isLoading === false) {
      setPrices();
    }
  }, [isLoading]);

  useEffect(() => {
    const setImgsLength = () => {
      const imgsLength = data?.product_pictures.length - 1;
      // console.log('imgsLength in useEffect in /offer/:id:', imgsLength);
      if (data?.product_pictures.length > 3) {
        setImgsNbr(
          document.documentElement.style.setProperty("--imgsLength", imgsLength)
        );
      }
    };
    if (isLoading === false && data?.product_pictures) {
      setImgsLength();
    }
  }, [isLoading, imgsNbr]);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      {showHero && <Hero />}
      <div className="boxOffer">
        <div className="wrapper">
          <article className="top">
            <div className="left">
              <div className={data?.product_image ? "imgLeftAlone" : "imgLeft"}>
                {data?.product_image ? (
                  <Button
                    classButton="boxImgOffer"
                    src={data?.product_image?.secure_url}
                    classImg={data?.product_image && "prodImg"}
                    handleClick={() => {
                      if (showImgsModal === false) {
                        setShowImgsModal(true);
                        setSrcImgsModal(data?.product_image?.secure_url);
                      } else {
                        setShowImgsModal(true);
                      }
                    }}
                  />
                ) : data?.product_pictures ? (
                  <>
                    {data?.product_pictures.map((images, index) => {
                      console.log("images:", images);
                      return (
                        <React.Fragment key={index}>
                          {index === 0 ? (
                            <article>
                              <Button
                                classButton="boxImgOffer"
                                key={index}
                                src={images?.secure_url}
                                classImg={
                                  index === 0 ? "prodPict0" : "prodPict"
                                }
                                handleClick={() => {
                                  if (showImgsModal === false) {
                                    setShowImgsModal(true);
                                    setSrcImgsModal(images?.secure_url);
                                  } else {
                                    setShowImgsModal(true);
                                  }
                                }}
                              />
                            </article>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <Image src={noImg} classImg="noImg" />
                )}
              </div>
              <div
                className={data?.product_image ? "imgsRightNone" : "imgsRight"}
              >
                {data?.product_pictures ? (
                  <>
                    {data?.product_pictures.map((images, index) => {
                      // console.log('images:', images);
                      return (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <article>
                              <Button
                                classButton="boxImgOffer"
                                key={index}
                                src={images?.secure_url}
                                classImg={
                                  index > 2 ? "prodPict" : "prodPict100"
                                }
                                handleClick={() => {
                                  if (showImgsModal === false) {
                                    setShowImgsModal(true);
                                    setSrcImgsModal(images?.secure_url);
                                  } else {
                                    setShowImgsModal(true);
                                  }
                                }}
                              />
                            </article>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <Image src={noImg} classImg="noImg" />
                )}
              </div>
            </div>
            <div className="right">
              <div className="title">
                <p>Infos de l'offre: </p>
                <div className="boxLineOffer">
                  <div className="lineOffer"></div>
                </div>
              </div>
              <div className="boxDetails">
                <div>
                  <p>Name:</p>
                  <span>{data?.product_name}</span>
                </div>
                <div>
                  <p>Description:</p>
                  <span>{data?.product_description}</span>
                </div>
                <div>
                  <p>Prix: </p>
                  <span>{prices} €</span>
                </div>
                <div>
                  <p>Marque: </p>
                  {data?.product_details && (
                    <span>{data?.product_details[0].MARQUE}</span>
                  )}
                </div>
                <div>
                  <p>Taille:</p>
                  {data?.product_details && (
                    <span>{data?.product_details[1].TAILLE}</span>
                  )}
                </div>
                <div>
                  <p>État: </p>
                  {data?.product_details && (
                    <span>{data?.product_details[2].ÉTAT}</span>
                  )}
                </div>
                <div>
                  <p>Couleur: </p>
                  {data?.product_details && (
                    <span>{data?.product_details[3].COULEUR}</span>
                  )}
                </div>
                <div>
                  <p>Emplacement: </p>
                  {data?.product_details && (
                    <span>{data?.product_details[4].EMPLACEMENT}</span>
                  )}
                </div>
                {data?.offer_solded === true && (
                  <div>
                    <Image
                      src={bannerSold}
                      classImg="imgOfferSold"
                      alt="bannière vendu"
                    />
                  </div>
                )}
              </div>

              <div className="rightBottom">
                <div className="boxLineOffer">
                  <div className="lineOffer"></div>
                </div>
                <div className="down">
                  <div className="boxUser">
                    {data?.owner?.avatar?.secure_url ? (
                      <>
                        <Image
                          src={data?.owner?.avatar?.secure_url}
                          alt="avatar"
                          classImg="imgAvatar"
                        />
                      </>
                    ) : (
                      <Image
                        src={data?.owner?.account?.avatar}
                        alt="avatar"
                        classImg="imgAvatar"
                      />
                    )}
                    <div>{data?.owner?.username}</div>
                  </div>
                  <div className="boxLinks">
                    <Link to="/chat" state={{ product_id: data?.product_id }}>
                      Contacter le vendeur
                    </Link>
                    {data?.product_image !== undefined ? (
                      <Link
                        to="/payment"
                        state={{
                          product_id: data?.product_id,
                          product_name: data?.product_name,
                          product_price: Number(data?.product_price).toFixed(2),
                          product_image: data?.product_image?.secure_url,
                        }}
                        className="btnPay"
                      >
                        Acheter
                      </Link>
                    ) : (
                      <Link
                        to="/payment"
                        state={{
                          product_id: data?.product_id,
                          product_name: data?.product_name,
                          product_price: Number(data?.product_price).toFixed(2),
                          product_pictures: data?.product_pictures,
                        }}
                      >
                        Acheter
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <InfoUserErrorMessage />
      </div>
    </>
  );
};

export default OfferID;
