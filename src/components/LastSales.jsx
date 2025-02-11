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
      <div className="boxLastSales">
        {data.map((transactions) => {
          console.log("transactions in map on /transactions:", transactions);
          return (
            <div className="boxTansactions" key={transactions._id}>
              <Link to={`/transactions/${transactions._id}`}>
                <table>
                  <thead>
                    <tr>
                      <th>Nom du produit</th>
                    </tr>
                    <tr>
                      <th>Prix:</th>
                    </tr>
                    <tr>
                      <th>Vendeur:</th>
                    </tr>
                    <tr>
                      <th>Date d'achat:</th>
                    </tr>
                    <tr>
                      <th>Acheteur:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{transactions.product_name}</td>
                      <td>{transactions.product_price}</td>
                      <td>
                        <div>{transactions.seller.account.username}</div>
                        <div>{transactions.seller.email}</div>
                      </td>
                      <td>
                        <div>{transactions.date}</div>
                      </td>
                      <td>
                        <div>{transactions.buyer.account.username}</div>
                        <div>{transactions.buyer.email}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LastSales;
