// Avec solution ws
import { useEffect, useState } from "react";
import { useBeforeUnload } from "react-router-dom";
import axios from "axios";
import { useUser } from "../assets/lib/userFunc";

//components
import TextArea from "./TextArea";
// import Button from "./Button";

const Chat = ({ OfferID }) => {
  const [loadMessages, setLoadMessages] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { token, errorMessage, setErrorMessage, user } = useUser();
  // const [viewKey, setViewKey] = useState(null);
  // console.log("token on chat:", token);
  const [messages, setMessages] = useState([]); // Liste des messages
  const [newMessage, setNewMessage] = useState(""); // Nouveau message à envoyer
  const [socket, setSocket] = useState(null); // useState du WebSocket
  const [isTyping, setIsTyping] = useState(false); // useState de la saisie
  const [isConnected, setIsConnected] = useState(false); // État de connexion WebSocket

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
        console.log("response in /messages/${OfferID} (GET):", response);
        if (response.data) {
          setMessages(response?.data);
          if (!OfferID) {
            console.error(
              "OfferID manquant. Impossible d'établir la connexion WebSocket."
            );
            return;
          } else {
            const ws = new WebSocket(`ws://localhost:3000/messages/${OfferID}`);
            // console.log("ws on chat:", ws);

            ws.onopen = () => {
              console.log("Connexion WebSocket établie.");
              setIsConnected(true);
            };

            ws.onmessage = (event) => {
              console.log("event in ws.onmessage:", event);

              try {
                const data = JSON.parse(event.data);
                console.log("Message reçu in ws.onmessage:", data);

                if (data.type === "message") {
                  setMessages((prev) => [...prev, data]);
                } else if (data.type === "typing") {
                  console.log(`${user} est en train d'écrire...`);
                }
              } catch (error) {
                console.error(
                  "Erreur lors du traitement du message WebSocket:",
                  error
                );
                setErrorMessage(error);
              }
            };

            ws.onerror = (error) => {
              console.error("Erreur WebSocket:", error);
            };

            setSocket(ws);
          }
          setLoadMessages(false);
        }
      } catch (error) {
        console.log(error?.message);
        setErrorMessage(error?.response?.data?.message || "update failed");
      }
    };
    fetchData();
  }, [OfferID]);

  // const handleSendMessage = async (e) => {
  const handleSubmitMessage = async (e) => {
    // setViewKey(e.key)
    if (e.key === "Enter") {
      console.log("e.key in handleMesssage on Chat:", e.key);
      console.log("token in handleMesssage on Chat:", token);
      e.preventDefault();
      const formData = new FormData();
      formData.append("newMessage", newMessage);
      console.log("${ObjectID} in handleMesssage on Chat:", `${OfferID}`);

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({ type: "message", offer: OfferID, text: newMessage })
        );
        const response = await axios.post(
          `http://localhost:3000/messages/${OfferID}`,
          // const response = await axios.post(
          //   `https://site--vintaidbackend--s4qnmrl7fg46.code.run/${OfferID}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log("response in handleMesssage on Chat:", response);
          console.log(
            "response.data  in handleMesssage on Chat:",
            response.data
          );
          setMessages((prev) => [...prev, response.data]);
          setIsLoading(false);
        }
        setNewMessage("");
      } else {
        console.error(
          "WebSocket n'est pas connecté. Impossible d'envoyer le message."
        );
      }
    }
  };

  useBeforeUnload(() => {
    if (socket) {
      socket.close();
      setIsConnected(false);
    }
  });

  const handleTyping = () => {
    if (socket && socket.readyState === WebSocket.OPEN && !isTyping) {
      setIsTyping(true);
      socket.send(JSON.stringify({ type: "typing", offer: OfferID }));
      setTimeout(() => setIsTyping(false), 1500);
    }
  };

  return (
    <div className="boxChat">
      {/* Indicateur de connexion */}
      <p>{isConnected ? "Connecté" : "Connexion..."}</p>
      {isTyping ? (
        <div className="boxLoaderTyping">
          <div className="circleTyping circleTyping1"></div>
          <div className="circleTyping circleTyping2"></div>
          <div className="circleTyping circleTyping3"></div>
        </div>
      ) : (
        <div className="boxLoaderTyping"></div>
      )}
      <ul>
        {messages.map((mssg, index) => {
          console.log("mssg:", mssg);
          return (
            <li key={index}>
              <div className="top">
                <p>{mssg?.date}</p>
                <p>{mssg?.owner?.account?.username}</p>
              </div>
              <div className="bottom">
                <p>{mssg?.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {/* <p>{viewKey}</p> */}
      <TextArea
        value={newMessage || ""}
        setState={setNewMessage}
        onKeyPress={handleTyping}
        onKeyDown={handleSubmitMessage}
        placeholder="Message"
      />
      {/* <Button handleClick={handleSendMessage} buttonText="Envoyer" /> */}
    </div>
  );
};

export default Chat;
