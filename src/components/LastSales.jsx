/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUser } from "../assets/lib/userFunc";

//components
import Loading from "./Loading";
import { Link } from "react-router-dom";

const LastSales = () => {
  const [data, setData] = useState();
  console.log("data in LastSales:", data);
  const [isLoading, setIsLoading] = useState(true);
  const { token, axios } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `https://site--vintaidbackend--s4qnmrl7fg46.code.run/transactions`,
        const response = await axios.get(`http://localhost:3000/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        });
        if (response) {
          console.log("response in /transactions:", response);
          setData(response.data);
          console.log("response.data in /transactions:", response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="wrapper">
      <table className="boxLastSales">
        <thead>
          <tr>
            <th>Nom du produit</th>
            <th>Prix:</th>
            <th>Vendeur:</th>
            <th>Date d'achat:</th>
            <th>Acheteur:</th>
          </tr>
        </thead>
        {data.map((transactions) => {
          return (
            // console.log("transactions in map on /transactions:", transactions);
            <tbody className="boxTansactions" key={transactions._id}>
              <Link to={`/transactions/${transactions._id}`}>
                <tr>
                  <td>{transactions.product_name}</td>
                  <td>{transactions.product_price}</td>
                  <td>{transactions.seller.account.username}</td>
                  <td>{transactions.date}</td>
                  <td>{transactions.buyer.account.username}</td>
                </tr>
              </Link>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default LastSales;
