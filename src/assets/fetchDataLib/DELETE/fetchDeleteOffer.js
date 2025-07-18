const fetchDeleteOffer = async (
  axios,
  id,
  setInfoUser,
  setIsSended,
  setData
) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_REACT_APP_URL}/offerDelete/${id}`
    );
    if (response?.data) {
      console.log("response.data in /messagesContact:", response?.data);
      setInfoUser(response?.data?.infoUser);
      setData(response?.data?.offers);
      setIsSended(false);
      setTimeout(() => {
        setInfoUser("");
      }, 3000);
    }
  } catch (error) {
    console.log("error in /messagesContact:", error);
    console.log("error.response in /messagesContact:", error?.response);
  }
};

export default fetchDeleteOffer;
