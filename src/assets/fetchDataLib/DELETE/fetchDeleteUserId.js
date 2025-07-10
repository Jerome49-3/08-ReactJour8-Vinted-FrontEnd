const handleDeleteUserId = async (
  e,
  setIsLoading,
  axios,
  id,
  token,
  navigate,
  setErrorMessage
) => {
  setIsLoading(true);
  e.preventDefault();
  if (confirm("Do yout want delete this user and their  offers ?")) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URL_USERID}${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response) {
        console.log("response in handleDeleteData on /users/${id}:", response);
        console.log(
          "response.data in handleDeleteData on /users/${id}:",
          response.data
        );
        setIsLoading(false);
        alert(response.data.message);
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.log("error:", error?.response);
      setErrorMessage(error?.response?.data?.message);
    }
  } else {
    navigate(`/dashboard`);
  }
};

export default handleDeleteUserId;
