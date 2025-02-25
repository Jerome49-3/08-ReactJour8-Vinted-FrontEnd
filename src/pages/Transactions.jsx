/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";

//components
import Loading from "../components/Loading";
import Image from "../components/Image";

const Transactions = () => {
  const { id } = useParams();
  const { axios } = useUser();
  const [data, setData] = useState();
  // console.log("data in /transactions/:id:", data);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL_TRANSACTIONSID}${id}`
        );
        if (response.data) {
          setData(response.data);
          // console.log("response.data in /transactions/:id:", response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(
          "error in /transactions/${id}:",
          error.response.data.message
        );
        setErrorMessage(error?.response?.data?.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxTransactionId">
      <div className="wrapper">
        <div className="transactionId">
          <Link to={`/users/${data?.buyerId}`} className="left">
            <h3>Acheteur:</h3>
            <div className="boxInfos">
              <div className="top">{data?.buyer?.account?.username}</div>
              <div className="middle">{data?.buyer?.email}</div>
              <div className="bottom">
                <Image
                  src={data?.buyer?.account?.avatar?.secure_url}
                  alt="avatar"
                />
              </div>
            </div>
          </Link>
          <Link to={`/offers/${data?.product_id}`} className="middle">
            <h3>Offre:</h3>
            <div className="boxInfos">
              <div className="top">
                <div className="name">
                  <div>Nom du produit:</div>
                  <div>{data?.product_name}</div>
                </div>
              </div>
              <div className="middle">
                <div className="price">
                  <div>Prix:</div>
                  <div>{data?.product_price} €</div>
                </div>
              </div>
              <div className="bottom">
                <div className="date">
                  <div>Date d'achat:</div>
                  <div>{data?.date}</div>
                </div>
              </div>
            </div>
          </Link>
          <Link to={`/users/${data?.seller._id}`} className="right">
            <h3>Vendeur:</h3>
            <div className="boxInfos">
              <div className="top">{data?.seller?.account?.username}</div>
              <div className="middle">{data?.seller?.email}</div>
              <div className="bottom">
                {data?.seller?.account?.avatar ? (
                  <Image
                    src={data?.seller?.account?.avatar?.secure_url}
                    alt="avatar"
                  />
                ) : null}
              </div>
            </div>
          </Link>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Transactions;
