import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";
import axios from "axios";

//components
import Loading from "../components/Loading";
import Image from "../components/Image";

const Transactions = () => {
  const { id } = useParams();
  const { token } = useUser();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        // `https://site--vintedbackend--s4qnmrl7fg46.code.run/transactions/${id}`,
        const response = await axios.get(
          `http/localhost:3000/transactions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
          }
        );
        if (response) {
          setData(response.data);
          // console.log("response.data in /transactions/:id:", response.data);
          // console.log("data in /transactions/:id:", data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(
          "error in /transactions/${id}:",
          error.response.data.message
        );
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
          <div className="left"></div>
          <div className="middle">
            <div className="name">
              <div>Nom du produit:</div>
              <div>{data.product_name}</div>
            </div>
            <div className="price">
              <div>Prix:</div>
              <div>{data.product_price} €</div>
            </div>
            <div className="date">
              <div>Date d'achat:</div>
              <div>{data.date}</div>
            </div>
          </div>
          <div className="right">
            <h3>Vendeur:</h3>
            <div className="top">{data.seller.account.username}</div>
            <div className="middle">{data.seller.email}</div>
            <div className="bottom">
              {data.seller.account.avatar ? (
                <Image
                  src={data.seller.account.avatar.secure_url}
                  alt="avatar"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
