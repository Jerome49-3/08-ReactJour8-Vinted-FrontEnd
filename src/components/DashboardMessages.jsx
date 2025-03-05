/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import Loading from "./Loading";
import fetchDataContact from "../assets/fetchDataLib/GET/fetchDataContact";
import { Link } from "react-router-dom";

const DashboardMessages = () => {
  const [data, setData] = useState(null);
  console.log("data in /messagesContact:", data);
  const [isLoading, setIsLoading] = useState(true);
  const { axios, setErrorMessage } = useUser();

  useEffect(() => {
    fetchDataContact(axios, setData, setIsLoading, setErrorMessage);
  }, [axios]);

  // const [wsError, setWsError] = useState(null);
  // useEffect(() => {
  //   fetchDataContact(axios, setData, setIsLoading);
  //   const ws = new WebSocket("ws://localhost:3000");
  //   ws.onopen = () => {
  //     console.log("WebSocket connecté");
  //     setWsError(null);
  //   };
  //   ws.onerror = (error) => {
  //     console.error("WebSocket Error:", error);
  //   };
  //   ws.onmessage = (e) => {
  //     try {
  //       const message = JSON.parse(e.data);
  //       console.log("message ws on DashboardMessages:", message);
  //       switch (message.type) {
  //         case "REFRESH_CONTACT":
  //           fetchDataContact(axios, setData, setIsLoading);
  //           break;
  //       }
  //     } catch (error) {
  //       console.log("error:", error);
  //     }
  //   };
  //   return () => ws.close();
  // }, [axios]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxMessagesContacts">
      {data.map((messg, index) => {
        const id = messg._id;
        return (
          <Link
            className="boxDetailsMessages"
            key={index}
            to={`/messagesContactId/${id}`}
          >
            <div className="userMssg">{messg?.owner?.account?.username}</div>
            <div className="mssg">{messg?.messageContact}</div>
            <div className="userEmail">{messg?.owner?.email}</div>
            <div>{messg?.date}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardMessages;
