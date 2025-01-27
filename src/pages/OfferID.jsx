/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//images
import noImg from "../assets/images/no-image.jpg";

//components
import Hero from "../components/Hero";
import Image from "../components/Image";
import Button from "../components/Button";
import Chat from "../components/Chat";

//lib
import classRotation from "../assets/lib/classRotation";

const OfferID = ({
  showHero,
  showImgsModal,
  setShowImgsModal,
  setSrcImgsModal,
}) => {
  // console.log('showHero in Offer:', showHero, '\n', 'token in Offer:', token);
  const { id } = useParams();
  console.log("id1 in /offers/${id}:", id);
  const [data, setData] = useState();
  const [imgsNbr, setImgsNbr] = useState(0);
  // const [wrappWidth, setWrappWidth] = useState(0);
  // const [imgRightHeight, setImgRightHeight] = useState(0);
  console.log("data in OfferId:", data);
  let [price, setPrice] = useState(0);
  const prices = Number(price).toFixed(2);
  // console.log('prices in /offers/${id}:', prices);
  // const [objId, setObjId] = useState(id);
  const [isLoading, setIsLoading] = useState(true);
  const rotation = classRotation(data);
  // const wrapperDimensions = useRef(null);
  // const topHeightDimensions = useRef(null);

  // const handleShowImgs = () => {
  //   showImgsModal === false ? (setShowImgsModal(true)) : (setShowImgsModal(false))
  // }

  useEffect(() => {
    console.log("id inside useEffect in /offers/${id}:", id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vintaidbackend--s4qnmrl7fg46.code.run/offers/${id}`
        );
        // const response = await axios.get(`http://localhost:3000/offers/${id}`);
        if (response) {
          setData(response.data);
          console.log("response in /offers/${id}:", response);
          console.log("response.data in /offers/${id}:", response.data);
          // console.log('response.data.product_image in /offers/${id}:', response.data.product_image);
          // console.log('response.data.product_pictures in /offers/${id}:', response.data.product_pictures);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const setPrices = () => {
      setPrice(data.product_price);
      // console.log('data.product_price in second useEffect:', data.product_price);
    };
    //si les data sont bien chargés, alors j'execute la fonction setPrice
    if (isLoading === false) {
      setPrices();
    }
  }, [isLoading]);

  useEffect(() => {
    const setImgsLength = () => {
      const imgsLength = data.product_pictures.length - 1;
      // console.log('imgsLength in useEffect in /offer/:id:', imgsLength);
      if (data.product_pictures.length > 1) {
        setImgsNbr(
          document.documentElement.style.setProperty("--imgsLength", imgsLength)
        );
      }
    };
    if (isLoading === false) {
      setImgsLength();
    }
  }, [isLoading, imgsNbr]);

  // useEffect(() => {
  //   const defineDimensions = () => {
  //     if (wrapperDimensions.current) {
  //       const rect = wrapperDimensions.current.getBoundingClientRect();
  //       const wrapperDim = rect.width;
  //       console.log("wrapperDim dans useLayoutEffect:", wrapperDim);
  //       setWrappWidth(
  //         document.documentElement.style.setProperty("--wrapperDim", wrapperDim)
  //       );
  //     }
  //     if (topHeightDimensions.current) {
  //       const rect2 = topHeightDimensions.current.getBoundingClientRect();
  //       const imgRightHeight = Math.round(rect2.height);
  //       console.log("imgRightHeight dans useLayoutEffect:", imgRightHeight);
  //       setImgRightHeight(
  //         document.documentElement.style.setProperty(
  //           "--imgRightHeight",
  //           imgRightHeight
  //         )
  //       );
  //     }
  //   };
  //   if (isLoading === false) {
  //     defineDimensions();
  //   }
  // }, [isLoading]);

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
              <div className={data.product_image ? "imgLeftAlone" : "imgLeft"}>
                {data.product_image ? (
                  <Button
                    classButton="boxImgOffer"
                    src={data.product_image.secure_url}
                    classImg={data?.product_image && "prodImg"}
                    handleClick={() => {
                      if (showImgsModal === false) {
                        setShowImgsModal(true);
                        setSrcImgsModal(data?.product_image?.secure_url);
                      } else {
                        setShowImgsModal(true);
                      }
                    }}
                    rotation={rotation}
                  />
                ) : data.product_pictures ? (
                  <>
                    {data.product_pictures.map((images, index) => {
                      // console.log('images:', images);
                      const rotation = classRotation(images);
                      return (
                        <>
                          {index === 0 ? (
                            <Button
                              classButton="boxImgOffer"
                              key={index}
                              src={images.secure_url}
                              classImg={index === 0 ? "prodPict0" : "prodPict"}
                              handleClick={() => {
                                if (showImgsModal === false) {
                                  setShowImgsModal(true);
                                  setSrcImgsModal(images.secure_url);
                                } else {
                                  setShowImgsModal(true);
                                }
                              }}
                              rotation={rotation}
                            />
                          ) : null}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <Image src={noImg} classImg="prodImg" />
                )}
              </div>
              <div
                className={data.product_image ? "imgsRightNone" : "imgsRight"}
              >
                {data.product_pictures ? (
                  <>
                    {data.product_pictures.map((images, index) => {
                      // console.log('images:', images);
                      return (
                        <>
                          {index > 0 && (
                            <Button
                              classButton="boxImgOffer"
                              key={index}
                              src={images.secure_url}
                              classImg={index > 0 && "prodPict"}
                              handleClick={() => {
                                if (showImgsModal === false) {
                                  setShowImgsModal(true);
                                  setSrcImgsModal(images.secure_url);
                                } else {
                                  setShowImgsModal(true);
                                }
                              }}
                              rotation={rotation}
                            />
                          )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <Image src={noImg} classImg="prodImg" />
                )}
              </div>
            </div>
            <div className="right">
              <div className="rightTop">
                <div className="boxPrice">
                  <div>{prices} €</div>
                </div>
                <div className="boxDetails">
                  <div>
                    <p>MARQUE: </p>
                    <span>{data.product_details[0].MARQUE}</span>
                  </div>
                  <div>
                    <p>TAILLE:</p> <span>{data.product_details[1].TAILLE}</span>
                  </div>
                  <div>
                    <p>ÉTAT: </p> <span>{data.product_details[2].ÉTAT}</span>
                  </div>
                  <div>
                    <p>COULEUR: </p>{" "}
                    <span>{data.product_details[3].COULEUR}</span>
                  </div>
                  <div>
                    <p>EMPLACEMENT: </p>{" "}
                    <span>{data.product_details[4].EMPLACEMENT}</span>
                  </div>
                </div>
              </div>
              <div className="boxLineOffer">
                <div className="lineOffer"></div>
              </div>
              <div className="rightBottom">
                <div className="up">
                  <div>
                    <p>Name:</p>
                    <div>{data.product_name}</div>
                  </div>
                  <div>
                    <p>Description:</p>
                    <div>{data.product_description}</div>
                  </div>
                </div>
                <div className="down">
                  <div className="boxUser">
                    {data.owner.account.avatar.secure_url ? (
                      <>
                        <Image
                          src={data.owner.account.avatar.secure_url}
                          alt="avatar"
                          classImg="imgAvatar"
                        />
                      </>
                    ) : (
                      <Image
                        src={data.owner.account.avatar}
                        alt="avatar"
                        classImg="imgAvatar"
                      />
                    )}
                    <div>{data.owner.account.username}</div>
                  </div>
                </div>
                {data.product_image !== undefined ? (
                  <Link
                    to="/payment"
                    state={{
                      product_id: data.product_id,
                      product_name: data.product_name,
                      product_price: Number(data.product_price).toFixed(2),
                      product_image: data.product_image.secure_url,
                    }}
                    className="btnPay"
                  >
                    Acheter
                  </Link>
                ) : (
                  <Link
                    to="/payment"
                    state={{
                      product_id: data.product_id,
                      product_name: data.product_name,
                      product_price: Number(data.product_price).toFixed(2),
                      product_pictures: data.product_pictures,
                    }}
                  >
                    Acheter
                  </Link>
                )}
              </div>
            </div>
          </article>
          <div className="bottom">
            <Chat OfferID={data.product_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferID;
