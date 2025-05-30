const fetchDataAllUsers = async (
  isAdmin,
  axios,
  searchUsers,
  setData,
  setIsLoading,
  navigate
) => {
  try {
    if (isAdmin !== false) {
      // console.log("isAdmin in LastUsers:", isAdmin);
      // const response = await axios.get(
      //   "https://site--vintaidbackend--s4qnmrl7fg46.code.run/users/",
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}users?title=${searchUsers}`
      );
      // console.log("response in LastUsers:", response);
      // console.log("response.data in LastUsers:", response.data);
      if (response.data) {
        setData(response.data);
        setIsLoading(false);
      }
    } else {
      navigate("/login");
    }
  } catch (error) {
    console.log("error on catch in LastUsers:", error);
  }
};

export default fetchDataAllUsers;
