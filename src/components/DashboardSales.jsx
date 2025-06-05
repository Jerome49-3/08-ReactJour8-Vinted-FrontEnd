/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUser } from "../assets/lib/userFunc";

//components
import Loading from "./Loading";
import { Link } from "react-router-dom";

const DashboardSales = ({ searchTransactions, numberCommand }) => {
  // console.log(
  //   "searchPrice in LastSales:",
  //   searchPrice,
  //   "\n",
  //   "searchTransactions in LastSales:",
  //   searchTransactions
  // );
  const [isLoading, setIsLoading] = useState(true);
  const { axios, data, setData } = useUser();
  // console.log("data in LastSales:", data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_URL
          }/transactions?title=${searchTransactions}&numberCommand=${numberCommand}`
        );
        if (response) {
          // console.log("response in /transactions:", response);
          setData(response.data);
          // console.log("response.data in /transactions:", response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
        console.log("error.response:", error?.response);
        console.log(
          "error.response.data.message:",
          error?.response?.data?.message
        );
      }
    };
    fetchData();
  }, [searchTransactions, numberCommand]);

  return isLoading ? (
    <Loading />
  ) : (
    <table className="boxLastSales">
      <thead>
        <tr>
          <th>Nom produit:</th>
          <th>Prix:</th>
          <th>Vendeur:</th>
          <th>N° commande:</th>
          <th>Acheteur:</th>
        </tr>
      </thead>
      {data.map((transactions) => {
        return (
          // console.log("transactions in map on /transactions:", transactions);
          <tbody className="boxTansactions" key={transactions?._id}>
            <Link to={`/transactions/${transactions?._id}`}>
              <tr>
                <td>{transactions?.product_name}</td>
                <td>{transactions?.product_price}</td>
                <td>{transactions?.offer?.owner?.account?.username}</td>
                <td className="numCmd">{transactions?.number_command}</td>
                <td>{transactions?.buyer?.account?.username}</td>
              </tr>
            </Link>
          </tbody>
        );
      })}
    </table>
  );
};

export default DashboardSales;
