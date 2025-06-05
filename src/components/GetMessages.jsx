import { useEffect, useState } from "react";
import { useUser } from "../assets/lib/userFunc";

import Loading from "./Loading";
import Image from "./Image";

const GetMessages = ({
  OfferID,
  messages,
  setMessages,
  isLoading,
  setIsLoading,
}) => {
  const { token, user, axios } = useUser();

  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    console.log("user on /messages/${OfferID}:", user);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/messages/${OfferID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
          }
        );
        // console.log("response in /messages/${OfferID} (GET):", response);
        if (response?.data) {
          setMessages(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error on GetMessages:", error);
        setErrorMessage(error?.response?.data || "update failed");
      }
    };
    fetchData();
  }, [OfferID]);

  return isLoading ? (
    <Loading />
  ) : (
    <ul className="boxMessages">
      {messages?.map((mssg, index) => {
        console.log("mssg in getMessages:", mssg);
        return (
          <li key={index}>
            <div className="top">
              <p>{mssg?.date}</p>
              <p>{mssg?.owner?.account?.username}</p>
              {mssg?.buyerObj?.account?.avatar?.secure_url ? (
                <Image
                  src={mssg?.buyerObj?.account?.avatar?.secure_url}
                  classImg="sellerAvatar"
                />
              ) : (
                <Image
                  src={mssg?.buyerObj?.account?.avatar}
                  classImg="sellerAvatar"
                />
              )}
            </div>
            <div className="bottom">
              <p>{mssg?.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default GetMessages;
