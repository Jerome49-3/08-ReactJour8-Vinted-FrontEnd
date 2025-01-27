import { useUser } from "../assets/lib/userFunc";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//components
import Loading from "../components/Loading";
import OfferCard from "../components/OfferCard";

const MySales = ({ faHeart, farHeart, showNoOffer, setShowNoOffer }) => {
  const { token, axios, fav, setFav } = useUser();
  const [data, setData] = useState(null);
  // console.log("data on /mySales:", data);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`https://site--vintedbackend--s4qnmrl7fg46.code.run/myOffers`,
        const response = await axios.get("http://localhost:3000/myOffers", {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        });
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
            <>
              <div>
                Vous n'avez pas d'annonces publiés:{" "}
                <Link path="/publish">Mettez en vente un produit</Link>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default MySales;
