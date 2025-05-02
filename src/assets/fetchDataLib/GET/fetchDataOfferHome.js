const fetchDataOfferHome = async (
  axios,
  search,
  priceMin,
  priceMax,
  page,
  setData,
  setCountDoc,
  setIsLoading,
  setErrorMessage
) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_URL_HOME
      }?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&page=${page}`
    );
    if (response?.data) {
      console.log("response.data on /Home (Offer):", response.data);
      setData(response?.data?.offers);
      setCountDoc(response?.data?.count);
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    setErrorMessage(error?.response?.data?.message);
  }
};

export default fetchDataOfferHome;
