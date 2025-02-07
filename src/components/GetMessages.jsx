import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../assets/lib/userFunc";

import Loading from "./Loading";
import Image from "./Image";

const GetMessages = ({
  OfferID,
  messages,
  setMessages,
  setLoadMessages,
  loadMessages,
}) => {
  const { token, setErrorMessage, user } = useUser();

  useEffect(() => {
    console.log("user on /messages/${OfferID}:", user);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/${OfferID}`,
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
          setLoadMessages(false);
        }
      } catch (error) {
        console.log(error?.message);
        setErrorMessage(error?.response?.data?.message || "update failed");
      }
    };
    fetchData();
  }, [OfferID]);

  return loadMessages ? (
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
              <Image
                src={mssg?.buyerObj?.account?.avatar}
                classImg="sellerAvatar"
              />
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
