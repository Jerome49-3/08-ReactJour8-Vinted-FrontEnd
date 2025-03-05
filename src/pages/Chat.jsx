// Avec solution ws
import { useEffect, useState } from "react";
import { useBeforeUnload } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";
import { useLocation } from "react-router-dom";

//components
import TextArea from "../components/TextArea";
import GetMessages from "../components/GetMessages";

const Chat = () => {
  const { state } = useLocation();
  // console.log("state in /payment:", state);
  const { product_id } = state;
  const OfferID = product_id;
  const [loadMessages, setLoadMessages] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { token, errorMessage, setErrorMessage, user, axios } = useUser();
  // const [viewKey, setViewKey] = useState(null);
  // console.log("token on chat:", token);
  const [messages, setMessages] = useState([]); // Liste des messages
  const [newMessage, setNewMessage] = useState(""); // Nouveau message à envoyer
  const [socket, setSocket] = useState(null); // useState du WebSocket
  const [isTyping, setIsTyping] = useState(false); // useState de la saisie
  const [isConnected, setIsConnected] = useState(false); // État de connexion WebSocket

  useEffect(() => {
    try {
      if (!OfferID) {
        console.error(
          "OfferID manquant. Impossible d'établir la connexion WebSocket."
        );
        return;
      } else {
        const ws = new WebSocket(`ws://localhost:3000/messages/${OfferID}`);
        console.log("ws on chat:", ws);

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
    } catch (error) {
      setErrorMessage(error);
    }
  }, [OfferID, user]);

  const handleSendMessage = async (e) => {
    // setViewKey(e.key)
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("e.key in handleMesssage on Chat:", e.key);
      console.log("token in handleMesssage on Chat:", token);
      const formData = new FormData();
      formData.append("newMessage", newMessage);
      console.log("${ObjectID} in handleMesssage on Chat:", `${OfferID}`);

      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("socket.readyState:", socket.readyState);

        socket.send(
          JSON.stringify({ type: "message", offer: OfferID, text: newMessage })
        );
        const response = await axios.post(
          `http://localhost:3000/messages/${OfferID}`,
          // const response = await axios.post(
          //   `https://site--vintaidbackend--s4qnmrl7fg46.code.run/${OfferID}`,
          formData
        );
        if (response) {
          console.log("response in handleMesssage on Chat:", response);
          console.log(
            "response.data  in handleMesssage on Chat:",
            response.data
          );
          setMessages(response.data);
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
      <div className="wrapper">
        {/* Indicateur de connexion */}
        <div className="boxChatInfos">
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
        </div>
        <GetMessages
          OfferID={OfferID}
          messages={messages}
          setMessages={setMessages}
          loadMessages={loadMessages}
          setLoadMessages={setLoadMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        {/* <p>{viewKey}</p> */}
        <TextArea
          value={newMessage}
          setState={setNewMessage}
          onKeyPress={handleTyping}
          onKeyDown={handleSendMessage}
          classTextArea="textAreaChat"
          placeholder="les messages sont visibles par tous les visiteurs de l'offre"
        />
        {errorMessage && <div className="red">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Chat;
