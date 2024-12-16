// Avec solution ws

import React from "react";
import { useEffect, useState } from "react";

//components
import TextArea from "./TextArea";
import Button from "./Button";

const Chat = ({ OfferID }) => {
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

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({ type: "message", offer: OfferID, text: newMessage })
      );
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
    <div>
      {/* Indicateur de connexion */}
      <p>
        {isConnected
          ? "Connecté au serveur de chat."
          : "Connexion au serveur de chat..."}
      </p>

      <TextArea
        value={newMessage}
        setState={setNewMessage}
        onKeyPress={handleTyping}
      />
      <Button handleClick={handleSendMessage} buttonText="Envoyer" />

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <b>{msg.user}:</b> {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
