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
        import.meta.env.VITE_REACT_APP_URL
      }/offers?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&page=${page}`
    );
    if (response?.data) {
      // console.log("response.data on /Home (Offer):", response.data);
      setData(response?.data?.offers);
      setCountDoc(response?.data?.count);
      setIsLoading(false);
    }
  } catch (error) {
    console.log("%cerror in Home:", "color: red", error);
    console.log("%cerror.response in Home:", "color: red", error?.response);
    console.log(error?.response?.data?.message);
    setErrorMessage(error?.response?.data?.message || error?.response || error);
  }
};

export default fetchDataOfferHome;
