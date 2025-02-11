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

//images
// import noImg from '../assets/images/no-image.jpg';

const Home = ({ search, faHeart, farHeart }) => {
  // console.log("isFavorite in Home:", isFavorite);
  // console.log('search in Home:', search);
  const [data, setData] = useState();
  // console.log('data in /Home:', data);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const [imgsNbr, setImgsNbr] = useState(0);
  const { axios, fav, setFav } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL_HOME}?title=${search}`
        );
        if (response.data) {
          // console.log("response on /Home (Offer):", response);
          // console.log("response.data on /Home (Offer):", response.data);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
        setErrorMessage(error?.response?.data?.message);
      }
    };
    fetchData();
  }, [search, data]);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <div className="boxHome">
      <div className="wrapper">
        <Hero />
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Home;
