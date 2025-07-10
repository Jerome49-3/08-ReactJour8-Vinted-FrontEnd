/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import CookieConsent from "react-cookie-consent";

//stream
import io from "socket.io-client";
const socket = io(`${import.meta.env.VITE_REACT_APP_URL_CORS_IO}`);
// console.log(
//   "`${import.meta.env.VITE_REACT_APP_URL_CORS_IO}`",
//   `${import.meta.env.VITE_REACT_APP_URL_CORS_IO}`
// );

//components
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import OfferCard from "../components/OfferCard";
import Links from "../components/Links";
import Button from "../components/Button";

//lib
import fetchDataOfferHome from "../assets/fetchDataLib/GET/fetchDataOfferHome";

const Home = ({
  search,
  faHeart,
  farHeart,
  priceMin,
  priceMax,
  page,
  setPage,
  faChevronCircleLeft,
  faChevronCircleRight,
  countDoc,
  setCountDoc,
  setDimDiv,
}) => {
  // console.log("priceMin in Home:", priceMin);
  // console.log("priceMax in Home:", priceMax);
  // console.log("isFavorite in Home:", isFavorite);
  // console.log('search in Home:', search);
  // const [imgsNbr, setImgsNbr] = useState(0);
  const {
    axios,
    fav,
    setFav,
    data,
    setData,
    isLoading,
    setIsLoading,
    setErrorMessage,
    items,
    nbrCards,
    setNbrCards,
    dimWindows,
  } = useUser();
  // console.log("data in /Home:", data);
  // console.log("data.length in /Home:", data?.length);
  // console.log("dimWindows in /Home:", dimWindows);
  useEffect(() => {
    fetchDataOfferHome(
      axios,
      search,
      priceMin,
      priceMax,
      page,
      setData,
      setCountDoc,
      setIsLoading,
      setErrorMessage
    );
  }, [search, priceMin, priceMax, axios, page]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected:", socket.id);
    });
    socket.on("offerUpdated", (change) => {
      console.log("change:", change);
      fetchDataOfferHome(
        axios,
        search,
        priceMin,
        priceMax,
        page,
        setData,
        setCountDoc,
        setIsLoading,
        setErrorMessage
      );
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
    return () => socket.off("offerUpdated");
  }, []);

  useLayoutEffect(() => {
    const setNumberOfCards = () => {
      const cardsLength = data?.length;
      // console.log("cardsLength:", cardsLength);
      setNbrCards(
        document.documentElement.style.setProperty("--cardsLength", cardsLength)
      );
    };
    setNumberOfCards();
  }, [data?.length]);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : data?.length > 0 && countDoc !== 0 ? (
    <div className="boxHome">
      <Hero isLoading={isLoading} setDimDiv={setDimDiv} />
      <div className="wrapper">
        {dimWindows.width > 1201 && page > 1 && (
          <div className="boxContainerBtnChevron">
            <Button
              icon={faChevronCircleLeft}
              classButton="btnChevronLeft"
              handleClick={() => {
                setPage(page - 1);
              }}
            />
          </div>
        )}
        <OfferCard
          data={data}
          faHeart={faHeart}
          farHeart={farHeart}
          fav={fav}
          setFav={setFav}
          faChevronCircleLeft={faChevronCircleLeft}
          faChevronCircleRight={faChevronCircleRight}
          page={page}
        />
        {dimWindows.width > 1201 &&
          data?.length >= items &&
          items < data?.length && (
            <div className="boxContainerBtnChevron">
              <Button
                icon={faChevronCircleRight}
                classButton="btnChevronRight"
                handleClick={() => {
                  setPage(page + 1);
                }}
              />
            </div>
          )}

        <CookieConsent
          location="bottom"
          buttonText="Sure !"
          cookieName="VintaidAppCookiesAccept"
          expires={150}
        >
          This website uses cookies only to enhance the user experience and not
          for advertising purposes.{" "}
        </CookieConsent>
      </div>
    </div>
  ) : (
    <div className="boxHome">
      <Hero />
      <div className="wrapper">
        <div className="boxHomeNoOffer">
          <div className="boxNoOffers">
            <div> Il n'y aucune offre actuellement:&ensp;</div>
            <Links path="/publish" linkText="Publier la votre" />
          </div>
        </div>
        <CookieConsent
          location="bottom"
          buttonText="Sure !"
          cookieName="VintaidAppCookiesAccept"
          expires={150}
        >
          This website uses cookies only to enhance the user experience and not
          for advertising purposes.{" "}
        </CookieConsent>
      </div>
    </div>
  );
};

export default Home;
