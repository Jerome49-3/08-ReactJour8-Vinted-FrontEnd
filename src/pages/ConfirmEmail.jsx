import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from '../context/lib/userFunc';
import Loading from "../components/Loading";

export const ConfirmEmail = () => {
  const { code } = useParams();
  const { saveUser, setErrorMessage } = useUser();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`https://site--vintedbackend--s4qnmrl7fg46.code.run/user/confirmEmail/${code}`);
        const token = response.data;
        saveUser(token);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };

    loadData();
  }, [code]);

  return <div><Loading /></div>;
};