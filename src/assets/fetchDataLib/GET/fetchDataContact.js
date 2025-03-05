const fetchDataContact = async (axios, setData, setIsLoading) => {
  try {
    const response = await axios.get(`http://localhost:3000/messagesContact`);
    if (response?.data) {
      console.log("response.data in /messagesContact:", response?.data);
      setData(response.data);
      setIsLoading(false);
    }
  } catch (error) {
    console.log("error in /messagesContact:", error);
    console.log("error.response in /messagesContact:", error?.response);
  }
};

export default fetchDataContact;
