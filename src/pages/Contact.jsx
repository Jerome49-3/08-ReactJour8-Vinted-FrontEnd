import { useState } from "react";
import { useUser } from "../assets/lib/userFunc";
import TextArea from "../components/TextArea";
import Input from "../components/Input";
import SelectOptions from "../components/SelectOptions";
import LoadedInputSubmit from "../components/LoadedInputSubmit";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [optionValue, setOptionValue] = useState("");
  // console.log("optionValue in contact:", optionValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [numberCommand, setNumberCommand] = useState(null);
  const [numberOffer, setNumberOffer] = useState(null);
  const [messageContact, setMessageContact] = useState(null);
  // console.log("messageContact in contact:", messageContact);
  const { axios, isSended, setIsSended, infoUser, setInfoUser } = useUser();
  const navigate = useNavigate();

  const handleData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("messageContact", messageContact);
    formData.append("subject", optionValue);
    formData.append("numberCommand", numberCommand);
    formData.append("numberOffer", numberOffer);
    setIsSended(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}sendMail/contact`,
        formData
      );
      // console.log("response:", response);
      if (response.data) {
        // console.log("response.data:", response.data);
        setInfoUser(response.data.message);
        setIsSended(false);
        setTimeout(() => {
          setInfoUser("");
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      // console.log("error", error);
      // console.log("error.response", error.response);
      console.log(
        "error.message",
        error.message || "error.response.data",
        error.response.data
      );
      setErrorMessage(error.response.data);
      setTimeout(() => {
        setIsSended(false);
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleData} className="boxContact">
      <div className="boxMenuSelect">
        <div className="boxSubject">
          <h3>Subject:</h3>
          <SelectOptions
            values={["compte", "transactions", "offres", "other", "subject"]}
            selected="subject"
            selectName="catégories"
            OptionValue={optionValue}
            setOptionValue={setOptionValue}
          />
        </div>
      </div>
      {optionValue === "transactions" && (
        <Input
          value={numberCommand || ""}
          id="numberCommand"
          type="numberCommand"
          placeholder="number of command"
          setState={setNumberCommand}
        />
      )}
      {optionValue === "offres" && (
        <Input
          value={numberOffer || ""}
          id="numberOffer"
          type="numberOffer"
          placeholder="number of offer"
          setState={setNumberOffer}
        />
      )}
      <TextArea
        name="messageContact"
        value={messageContact || ""}
        type="text"
        placeholder="message"
        setState={setMessageContact}
        classLabel="labelTxtContact"
      />
      <LoadedInputSubmit isSended={isSended} setIsSended={setIsSended} />
      {errorMessage && <p className="red">{errorMessage}</p>}
      {infoUser && <p className="green">{infoUser}</p>}
    </form>
  );
};

export default Contact;
