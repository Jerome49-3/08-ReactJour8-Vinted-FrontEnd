import { useState, useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import { Link } from "react-router-dom";

//components
import Loading from "../components/Loading";
import OfferCard from "../components/OfferCard";

const MyPurchases = ({ faHeart, farHeart, showNoOffer, setShowNoOffer }) => {
  const [data, setData] = useState(null);
  console.log("data in /mypurchases:", data);
  const [isloading, setIsLoading] = useState(true);
  const { token, axios, fav, setFav } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vintaidbackend--s4qnmrl7fg46.code.run/mypurchases`,
          // const response = await axios.get(`http://localhost:3000/mypurchases`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
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
