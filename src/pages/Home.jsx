/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import CookieConsent from "react-cookie-consent";

//stream
import io from "socket.io-client";
const socket = io("https://site--vintaidbackend--s4qnmrl7fg46.code.run/");

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
  // console.log("nbrCards in /Home:", nbrCards);
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
      <Hero />
      <div className="wrapper">
        {dimWindows.width > 592 && (
          <div className="boxContainerBtnChevron">
            {page > 1 ? (
              <Button
                icon={faChevronCircleLeft}
                classButton="btnChevronLeft"
                handleClick={() => {
                  setPage(page - 1);
                }}
              />
            ) : (
              <div className="btnChevronLeftOff"></div>
            )}
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
        {dimWindows.width > 592 && (
          <div className="boxContainerBtnChevron">
            {data?.length >= items && items < data?.length ? (
              <Button
                icon={faChevronCircleRight}
                classButton="btnChevronRight"
                handleClick={() => {
                  setPage(page + 1);
                }}
              />
            ) : (
              data?.length < items && <div className="btnChevronLeftOff"></div>
            )}
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
