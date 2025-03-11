/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUser } from "../assets/lib/userFunc";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Trash from "./Trash";

const DashboardOffers = ({ faTrash }) => {
  const {
    axios,
    isLoading,
    setIsLoading,
    setErrorMessage,
    setIsSended,
    isSended,
  } = useUser();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_REACT_APP_URL_HOME
        );
        if (response) {
          console.log("response in DashboardOffers:", response);
          setData(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage(error?.response?.data?.message);
      }
    };
    if (!isSended) {
      fetchData();
    }
  }, [axios, isSended]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxDashboardOffers">
      {data?.map((offer, key = offer._id) => {
        console.log("offer in DashboardOffers:", offer);
        return (
          <Link
            className="boxOfferDashbord"
            key={key}
            to={`/offerUpdate/${offer._id}`}
          >
            <div className="userName">{offer?.owner?.account?.username}</div>
            <div className="offerPrice">{offer?.product_price} €</div>
            <div className="offerId">{offer?._id}</div>
            <div className="offerName">{offer?.product_name}</div>
            {/* <Trash handleClick={handleSuppOffers} faTrash={faTrash} /> */}
          </Link>
        );
      })}
      <InfoUserErrorMessage />
    </div>
  );
};

export default DashboardOffers;
