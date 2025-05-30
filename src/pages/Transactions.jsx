/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";

//components
import Loading from "../components/Loading";
import Image from "../components/Image";

const Transactions = () => {
  const { id } = useParams();
  const { axios, data, setData } = useUser();
  // console.log("data in /transactions/:id:", data);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}transactions/${id}`
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
          <Link to={`/users/${data?.buyer?._id}`} className="left">
            <h3>Buyer:</h3>
            <div className="boxInfos">
              <div className="top">
                <div className="name">
                  <div>Username:</div>
                  <div>{data?.buyer?.account?.username}</div>
                </div>
                <div className="email">
                  <div>Email:</div>
                  <div> {data?.buyer?.email}</div>
                </div>
                <div className="date">
                  <div>Creation date:</div>
                  <div>{data?.buyer?.date}</div>
                </div>
              </div>
              <div className="bottom">
                <Image
                  src={data?.buyer?.account?.avatar?.secure_url}
                  alt="avatar"
                />
              </div>
            </div>
          </Link>
          <Link to={`/offers/${data?.offer?._id}`} className="middle">
            <h3>Offer:</h3>
            <div className="boxInfos">
              <div className="top">
                <div className="name">
                  <div>Product name:</div>
                  <div>{data?.product_name}</div>
                </div>
                <div className="price">
                  <div>Price:</div>
                  <div>{data?.product_price} €</div>
                </div>
                <div className="date">
                  <div>Purchase date:</div>
                  <div>{data?.date}</div>
                </div>
              </div>
              <div className="bottom">
                {data?.offer?.product_pictures ? (
                  <Image src={data?.offer?.product_pictures[0]?.secure_url} />
                ) : (
                  <Image src={data?.offer?.product_image?.secure_url} />
                )}
              </div>
            </div>
          </Link>
          <Link to={`/users/${data?.offer?.owner._id}`} className="right">
            <h3>Seller:</h3>
            <div className="boxInfos">
              <div className="top">
                <div className="name">
                  <div>Username:</div>
                  <div>{data?.offer?.owner?.account?.username}</div>
                </div>
                <div className="email">
                  <div>Email:</div>
                  <div> {data?.offer?.owner?.email}</div>
                </div>
                <div className="date">
                  <div>Creation date:</div>
                  <div>{data?.offer?.owner?.date}</div>
                </div>
              </div>
              <div className="bottom">
                {data?.offer?.owner?.account?.avatar ? (
                  <Image
                    src={data?.offer?.owner?.account?.avatar?.secure_url}
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
