import { useUser } from "../assets/lib/userFunc";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//components
import Loading from "../components/Loading";
import OfferCard from "../components/OfferCard";

const MySales = ({ faHeart, farHeart, showNoOffer, setShowNoOffer }) => {
  const { axios } = useUser();
  const [data, setData] = useState(null);
  // console.log("data on /mySales:", data);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_REACT_APP_URL_MYOFFERS
        );
        if (response.data) {
          // console.log("response on /mySales:", response);
          // console.log("response.data on /mySales:", response.data);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
        setShowNoOffer(true);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="wrapper">
        {data ? (
          <OfferCard data={data} faHeart={faHeart} farHeart={farHeart} />
        ) : (
          showNoOffer && (
            <div className="boxNoOffers">
              <p> Vous n'avez pas d'annonces publiés:</p>
              <Link path="/publish">Mettez en vente un produit</Link>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default MySales;
