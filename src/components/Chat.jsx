// Avec solution ws
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../assets/lib/userFunc";

//components
import TextArea from "./TextArea";
import Button from "./Button";

const Chat = ({ OfferID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, errorMessage, setErrorMessage } = useUser();
  // console.log("token on chat:", token);
  const [messages, setMessages] = useState([]); // Liste des messages
  const [newMessage, setNewMessage] = useState(""); // Nouveau message à envoyer
  const [socket, setSocket] = useState(null); // Référence à la WebSocket
  const [isTyping, setIsTyping] = useState(false); // Indicateur de saisie
  const [isConnected, setIsConnected] = useState(false); // État de connexion WebSocket

  useEffect(() => {
    if (!OfferID) {
      console.error(
        "OfferID manquant. Impossible d'établir la connexion WebSocket."
      );
      return;
    }

    const ws = new WebSocket(`ws://localhost:3000/messages/${OfferID}`);
    console.log("ws on chat:", ws);
    ws.onopen = () => {
      console.log("Connexion WebSocket établie.");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Message reçu:", data);

        if (data.type === "message") {
          setMessages((prev) => [...prev, data]); // Ajoute le nouveau message
        } else if (data.type === "typing") {
          console.log(`${data.user} est en train d'écrire...`);
        }
      } catch (error) {
        console.error("Erreur lors du traitement du message WebSocket:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Erreur WebSocket:", error);
    };

    ws.onclose = () => {
      console.warn("Connexion WebSocket fermée.");
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      if (ws) ws.close();
      setIsConnected(false);
    };
  }, [OfferID]);

  const handleSendMessage = async (e) => {
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
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      // if (response) {
      //   console.log("response in handleMesssage on Chat:", response);
      //   console.log("response.data  in handleMesssage on Chat:", response.data);
      //   setMessages(response.data);
      //   setIsLoading(false);
      // }
      setNewMessage(""); // Réinitialise le champ
    } else {
      console.error(
        "WebSocket n'est pas connecté. Impossible d'envoyer le message."
      );
    }
  };

  const handleTyping = () => {
    if (socket && socket.readyState === WebSocket.OPEN && !isTyping) {
      setIsTyping(true);
      socket.send(JSON.stringify({ type: "typing", offer: OfferID }));
      setTimeout(() => setIsTyping(false), 2000); // Réinitialise l'indicateur après 2s
    }
  };

  return (
    <div className="boxChat">
      {/* Indicateur de connexion */}
      <p>
        {isConnected
          ? "Connecté au serveur de chat."
          : "Connexion au serveur de chat..."}
      </p>
      {isTyping ? (
        <div className="boxLoaderTyping">
          <div className="circleTyping circleTyping1"></div>
          <div className="circleTyping circleTyping2"></div>
          <div className="circleTyping circleTyping3"></div>
        </div>
      ) : (
        <div className="boxLoaderTyping"></div>
      )}
      <TextArea
        value={newMessage}
        setState={setNewMessage}
        onKeyPress={handleTyping}
      />
      <Button handleClick={handleSendMessage} buttonText="Envoyer" />
      <ul>
        {messages.map((mssg, index) => {
          console.log("mssg:", mssg);
          return (
            <li key={index}>
              <p>{mssg.date}</p>
              <p>{mssg.owner.account.username}</p>
              <p>{mssg.message}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Chat;
