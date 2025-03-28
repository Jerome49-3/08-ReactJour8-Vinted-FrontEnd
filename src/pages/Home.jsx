/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
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
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";

//images
// import noImg from '../assets/images/no-image.jpg';

const Home = ({ search, faHeart, farHeart, priceMin, priceMax }) => {
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
  } = useUser();
  console.log("data in /Home:", data);
  console.log("data.length in /Home:", data?.length);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_URL_HOME
          }?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}`
        );
        if (response?.data) {
          console.log("response.data on /Home (Offer):", response.data);
          setData(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
        setErrorMessage(error?.response?.data?.message);
      }
    };
    fetchData();
  }, [search, priceMin, priceMax, axios]);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : data?.length > 0 ? (
    <div className="boxHome">
      <Hero />
      <div className="wrapper">
        <OfferCard
          data={data}
          faHeart={faHeart}
          farHeart={farHeart}
          fav={fav}
          setFav={setFav}
        />
        <CookieConsent
          location="bottom"
          buttonText="Sure !"
          cookieName="VintaidAppCookiesAccept"
          expires={150}
        >
          This website uses cookies only to enhance the user experience and not
          for advertising purposes.{" "}
        </CookieConsent>
        <InfoUserErrorMessage />
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
        <InfoUserErrorMessage />
      </div>
    </div>
  );
};

export default Home;
