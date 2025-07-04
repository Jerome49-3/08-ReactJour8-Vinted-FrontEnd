import { useState, useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";

//components
import Loading from "../components/Loading";
import OfferCard from "../components/OfferCard";
import Links from "../components/Links";

const MyPurchases = ({ faHeart, farHeart }) => {
  const { fav, setFav, axios, data, setData } = useUser();
  const [isloading, setIsLoading] = useState(true);
  // console.log("data in /mypurchases:", data);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/mypurchases`
        );
        if (response) {
          // console.log("response on /mypurchases:", response);
          // console.log("response.data on /mypurchases:", response.data);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
        setErrorMessage(error?.response?.data?.message);
      }
    };
    fetchData();
  }, []);

  return isloading ? (
    <Loading />
  ) : (
    <div className="boxMyPurchases">
      <div className="wrapper">
        {data?.length > 0 ? (
          <OfferCard
            data={data}
            faHeart={faHeart}
            farHeart={farHeart}
            fav={fav}
            setFav={setFav}
            errorMessage={errorMessage}
            setErrorMessage={errorMessage}
          />
        ) : (
          <div className="boxNoPurchases">
            <p> Vous n'avez pas d'achat réalisés:</p>
            <Links path="/" linkText="Consultez nos offres disponibles" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;
