const handleSendMailCode = async (
  e,
  axios,
  tokenFgtP,
  navigate,
  setErrorMessage
) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://localhost:3000/sendMail/sendCode/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenFgtP}`,
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    if (response.data) {
      console.log("response.data:", response.data);
      alert(response.data.message);
      navigate(`/dashboard`);
    }
  } catch (error) {
    console.log(error.message);
    setErrorMessage(error.message);
  }
};

export default handleSendMailCode;
