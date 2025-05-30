const fetchDataContactId = async (
  axios,
  id,
  setData,
  setIsLoading,
  setErrorMessage
) => {
  // console.log("id on fetchDataContactId:", id);

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}messagesContactId/${id}`
    );
    if (response?.data) {
      // console.log("response.data in /messagesContactId:", response?.data);
      setData(response.data);
      setIsLoading(false);
    }
  } catch (error) {
    console.log("error in /messagesContactId:", error);
    console.log("error.response in /messagesContactId:", error?.response);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

export default fetchDataContactId;
