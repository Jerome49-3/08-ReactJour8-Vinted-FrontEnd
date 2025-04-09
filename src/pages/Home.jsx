/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect } from "react";
// import { Link } from 'react-router-dom';
import { useUser } from "../assets/lib/userFunc";
import CookieConsent from "react-cookie-consent";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
// import Image from '../components/Image';
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import OfferCard from "../components/OfferCard";
import Links from "../components/Links";
import Button from "../components/Button";

//images
// import noImg from '../assets/images/no-image.jpg';

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
  } = useUser();
  console.log("nbrCards in /Home:", nbrCards);
  // console.log("data in /Home:", data);
  // console.log("data.length in /Home:", data?.length);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_URL_HOME
          }?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&page=${page}`
        );
        if (response?.data) {
          console.log("response.data on /Home (Offer):", response.data);
          setData(response?.data?.offers);
          setCountDoc(response?.data?.count);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
        setErrorMessage(error?.response?.data?.message);
      }
    };
    fetchData();
  }, [search, priceMin, priceMax, axios, page]);

  useLayoutEffect(() => {
    const setNumberOfCards = () => {
      const cardsLength = data?.length;
      console.log("cardsLength:", cardsLength);
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
