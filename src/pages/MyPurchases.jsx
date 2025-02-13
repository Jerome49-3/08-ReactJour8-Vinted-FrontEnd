import { useState, useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import { Link } from "react-router-dom";
import axios from "axios";

//components
import Loading from "../components/Loading";
import OfferCard from "../components/OfferCard";

const MyPurchases = ({ faHeart, farHeart, showNoOffer, setShowNoOffer }) => {
  const [data, setData] = useState(null);
  console.log("data in /mypurchases:", data);
  const [isloading, setIsLoading] = useState(true);
  const { token, fav, setFav } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_REACT_APP_URL_MYPURCHASES,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (response) {
          console.log("response on /mypurchases:", response);
          console.log("response.data on /mypurchases:", response.data);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
        setErrorMessage(error?.response?.data?.message);
        setShowNoOffer(true);
      }
    };
    fetchData();
  }, []);

  return isloading ? (
    <Loading />
  ) : (
    <>
      <div className="wrapper">
        {data ? (
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
          showNoOffer && (
            <>
              <div>
                Vous n'avez pas d'achat réalisés:{" "}
                <Link path="/">Consultez nos offres disponibles</Link>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default MyPurchases;
