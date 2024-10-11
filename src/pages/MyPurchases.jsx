import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '../context/lib/userFunc';

//components
import Loading from '../components/Loading';

const MyPurchases = () => {
  const [data, setData] = useState(null);
  console.log('data in /mypurchases:', data);
  const [isloading, setIsLoading] = useState(true);
  const { token, user } = useUser();

  useEffect(() => {
    const loadData = async () => {
      const id = user._id;
      console.log('id on /mypurchases:', id);

      const response = await axios.get(`http://localhost:3000/mypurchases/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      )
      if (response) {
        console.log('response in /mypurchases:', response);
        setData(response.data)
        setIsLoading(false)
      }
    }
    loadData();
  }, [])

  return isloading ? <Loading /> : (
    <div>MyPurchases</div>
  )
}

export default MyPurchases