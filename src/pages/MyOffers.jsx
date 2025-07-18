import { useUser } from "../assets/lib/userFunc";
import { useState, useEffect, Fragment } from "react";

//components
import Loading from "../components/Loading";
import OfferCard from "../components/OfferCard";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";
import Links from "../components/Links";

const MyOffers = ({
  faHeart,
  farHeart,
  showNoOffer,
  setShowNoOffer,
  faTrash,
}) => {
  const { axios, data, setData, errorMessage, infoUser } = useUser();
  // console.log("data on /mySales:", data);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/myOffers`
        );
        if (response.data) {
          // console.log("response on /MyOffers:", response);
          // console.log("response.data on /mySales:", response.data);
          setData(response.data);
          if (response.data.length === 0) {
            setShowNoOffer(true);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error.response:", error.response);
        // console.log(
        //   "error.response.data.message:",
        //   error.response.data.message
        // );
        setShowNoOffer(true);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axios]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxMyOffers">
      <div className="wrapper">
        {data?.length > 0 ? (
          <Fragment>
            <OfferCard
              data={data}
              faHeart={faHeart}
              farHeart={farHeart}
              faTrash={faTrash}
              setData={setData}
            />
            {(errorMessage || infoUser) && <InfoUserErrorMessage />}
          </Fragment>
        ) : (
          showNoOffer && (
            <div className="boxNoOffers">
              <p> Vous n'avez pas d'annonces publiés:&ensp;</p>
              <Links path="/publish" linkText="Mettez en vente un produit" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyOffers;
