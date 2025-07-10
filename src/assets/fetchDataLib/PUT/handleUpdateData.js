const handleUpdateData = async (
  e,
  setIsLoading,
  pictures,
  username,
  email,
  newAdmin,
  newsletter,
  axios,
  id,
  token,
  setTokenFgtP,
  setErrorMessage
) => {
  setIsLoading(true);
  e.preventDefault();
  const formData = new FormData();
  formData.append("pictures", pictures);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("isAdmin", newAdmin);
  formData.append("newsletter", newsletter);
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_URL}/userId/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    if (response) {
      console.log(
        "response.data in handleUpdateData in /userId/${id}:",
        response.data
      );
      setTokenFgtP(response?.data?.token);
      setTimeout(() => {
        alert(response?.data?.message);
        setIsLoading(false);
        // navigate(`/`);
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    setErrorMessage(error.message);
  }
};

export default handleUpdateData;
