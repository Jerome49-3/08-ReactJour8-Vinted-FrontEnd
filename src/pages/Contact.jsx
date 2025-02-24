import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";
import { useParams } from "react-router-dom";
import TextArea from "../components/TextArea";
import Input from "../components/Input";

const Contact = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const [messageContact, setMessageContact] = useState(null);
  const { axios } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleData = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("messageContact", messageContact);
    formData.append("subject", subject);

    try {
      if (id) {
        const response = await axios.post(
          `http://localhost:3000/contact/${id}`,
          formData
        );
        if (response.data) {
          console.log("response.data:", response.data);
          setData(response.data);
          setIsLoading(false);
        }
      } else {
        const response = await axios.post(
          `http://localhost:3000/contact`,
          formData
        );
        if (response.data) {
          console.log("response.data:", response.data);
          setData(response.data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleData}>
      <Input
        value={subject || ""}
        id="subject"
        type="text"
        placeholder="sujet/subject"
        setState={setSubject}
      />
      <TextArea
        name=""
        value={messageContact || ""}
        id=""
        type="text"
        placeholder="message"
        setState={setMessageContact}
      />
      <Input type="submit" value="Envoyer" />
    </form>
  );
};

export default Contact;
