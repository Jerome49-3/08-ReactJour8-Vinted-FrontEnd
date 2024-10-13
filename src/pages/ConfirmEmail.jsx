import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from '../context/lib/userFunc';
import { useNavigate } from 'react-router-dom';

//components
import Loading from "../components/Loading";

const ConfirmEmail = () => {
  const { code } = useParams();
  console.log('code  on /confirmEmail:', code);
  const { saveUser, setErrorMessage } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`https://site--vintedbackend--s4qnmrl7fg46.code.run/user/confirmEmail/${code}`);
        if (response) {
          const token = response.data;
          saveUser(token);
          alert(response.data.messsage);
          navigate("/publish");
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };

    loadData();
  }, []);

  return <div><Loading /></div>;
};

export default ConfirmEmail