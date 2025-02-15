import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//components
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";

//provider
import { useUser } from "../assets/lib/userFunc";

const SendEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAdmin, user, axios, errorMessage, setErrorMessage } =
    useUser();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [messageContact, setMessageContact] = useState(null);

  const handleSendMail = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("messageContact", messageContact);

    try {
      const response = await axios.post(
        `http://localhost:3000/sendContact/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log("response.data:", response.data);
        alert(response.data);
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="boxSendEmail">
      <div className="wrapper">
        <form action="" method="post">
          <Input
            label="username"
            type="text"
            id="username"
            placeholder={username}
            value={username || ""}
            setState={setUsername}
          />
          <Input
            label="email"
            type="email"
            id="email"
            placeholder={email}
            value={email || ""}
            setState={setEmail}
          />
          <Input
            label="subject"
            type="text"
            id="subject"
            placeholder="sujet"
            value={subject || ""}
            setState={setSubject}
          />
          <TextArea
            label="message"
            type="text"
            id="messageContact"
            placeholder="message"
            value={messageContact || ""}
            setState={setMessageContact}
          />
          <Button handleClick={handleSendMail} />
        </form>
        {<p className="red">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SendEmail;
