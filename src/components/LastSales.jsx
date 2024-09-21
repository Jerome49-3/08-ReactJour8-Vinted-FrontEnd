import { useEffect, useState } from "react";

//axios
import axios from "axios";

//icones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//context
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

//components
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Image from "./Image";

const LastSales = () => {
  const [data, setData] = useState();
  console.log('data in LastUsers:', data);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transactions',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data"
            }
          }
        )
        if (response) {
          setData(response.data);
          console.log('response.data in /transactions:', response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }

    }
    fetchData();
  }, [])


  return isLoading ? (
    <Loading />
  ) : (
    <div className="wrapper">
      <div className="boxLastSales">
        {data.map((transactions, key = transactions._id) => {
          console.log('transactions in map on /transactions:', transactions);
          return (
            <div className="boxTansactions" key={key}>
              <Link to={`/transactions/${transactions._id}`}>
                <table>
                  <thead>
                    <tr>nom du produit:</tr>
                    <tr>Prix:</tr>
                    <tr>Vendeur:</tr>
                    <tr>Date d'achat:</tr>
                    <tr>Acheteur:</tr>
                  </thead>
                  <body>
                    <td>{transactions.product_name}</td>
                    <td>{transactions.product_price}</td>
                    <td>
                      <div className="boxSeller">
                        <div>{transactions.seller.account.username}</div>
                        <div>{transactions.seller.email}</div>
                      </div></td>
                    <td>
                      <div className="boxDate">
                        <div></div>
                        <div>{transactions.date}</div>
                      </div>
                    </td>
                    <td>
                      <div className="boxBuyer">
                        <div></div>
                        <div>{transactions.buyer.account.username}</div>
                        <div>{transactions.buyer.email}</div>
                      </div>
                    </td>
                  </body>
                </table>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LastSales