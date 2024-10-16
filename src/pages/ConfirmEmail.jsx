import axios from "axios";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useUser } from '../context/lib/userFunc';
import Loading from "../components/Loading";
const { saveUser, signup, errorMessage, setErrorMessage } = useUser();

const ConfirmEmail = () => {

  const [Data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = req.params.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://site--vintedbackend--s4qnmrl7fg46.code.run/confirmEmail/${token}`);
        console.log('response in /confirmEmail/${token}:', response);
        console.log('response.data in /confirmEmail/${token}:', response.data);
        if (response.data) {
          const token = response.data;
          await saveUser(token);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message)
      }
    }
    fetchData();
  }, []);

  return isLoading ? <Loading /> : (
    <div>

    </div>
=======
import { useState } from "react";
import { useUser } from '../context/lib/userFunc';
import { useNavigate } from "react-router-dom";

//components
import Input from '../components/Input';

const ConfirmEmail = () => {
  const [code, setCode] = useState(null);
  console.log('code  on /confirmEmail:', code);
  const { saveUser, errorMessage, setErrorMessage } = useUser();
  const navigate = useNavigate();

  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", code);
    try {
      const response = await axios.post(`https://site--vintedbackend--s4qnmrl7fg46.code.run/user/confirmEmail`,
        {
          code,
        }
      );
      // const response = await axios.get(`http/localhost:3000/user/confirmEmail/${id}`);
      if (response) {
        console.log('response in /confirmEmail:', response);
        console.log('response.data in /confirmEmail:', response.data);
        console.log('response.data.token in /confirmEmail:', response.data.token);
        console.log('response.data.message in /confirmEmail:', response.data.message);
        if (response.data.message) {
          const message = response.data.message;
          alert(message);
        }
        if (response.data.token) {
          const token = response.data.token;
          saveUser(token);
        }
        navigate("/publish");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleConfirmEmail} className="boxForm boxFormCenter">
        <Input value={code} type='text' setState={setCode} />
        <Input type='submit' value='envoyer le code' />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
>>>>>>> 4d29bf46d9245485c0c47118dd4c55ad79120217
  )
}

export default ConfirmEmail