import axios from "axios";
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
  )
}

export default ConfirmEmail