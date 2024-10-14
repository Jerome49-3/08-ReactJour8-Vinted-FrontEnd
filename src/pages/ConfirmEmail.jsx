import axios from "axios";
import { useState } from "react";
import { useUser } from '../context/lib/userFunc';
import { useNavigate } from 'react-router-dom';

//components
import Input from '../components/Input';

const ConfirmEmail = () => {
  const [code, setCode] = useState(null);
  console.log('code  on /confirmEmail:', code);
  const { saveUser, setErrorMessage } = useUser();
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
        const token = response.data;
        saveUser(token);
        alert(response.data.messsage);
        navigate("/publish");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleConfirmEmail} className="boxForm boxFormCenter">
      <Input value={code} type='text' setState={setCode} />
      <Input type='submit' value='envoyer le code' />
    </form>
  )
}

export default ConfirmEmail