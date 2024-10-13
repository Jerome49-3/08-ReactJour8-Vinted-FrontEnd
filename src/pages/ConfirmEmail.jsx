import axios from "axios";
import { useState } from "react";
import { useUser } from '../context/lib/userFunc';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//components
import Input from '../components/Input';
import Loading from "../components/Loading";


const ConfirmEmail = () => {
  const { saveUser, errorMessage, setErrorMessage } = useUser();
  let [code, setCode] = useState(null);
  code = useParams();
  console.log('code on /confirmEmail:', code);
  const navigate = useNavigate();

  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", code);
    try {
      const response = axios.post(`https://site--vintedbackend--s4qnmrl7fg46.code.run/confirmEmail/${code}`,
        formData,
      );
      if (response) {
        const token = response.data;
        saveUser(token);
        alert('Votre mail à bien été confirmé');
        navigate("/publish");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleConfirmEmail}>
        <Input value={code} type='text' setState={setCode} />
        <Input type='submit' value='envoyer le code' />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default ConfirmEmail