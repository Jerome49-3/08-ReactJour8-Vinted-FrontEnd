/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";
import { useEffect, useState } from "react";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";
import { Fragment } from "react";
//components
import Image from "../components/Image";
import Loading from "../components/Loading";
import InputFileOffer from "../components/InputFileOffer";
import Input from "../components/Input";

const OfferIdUpdateAndDelete = () => {
  const { id } = useParams();
  // console.log("id in OfferIdUpdateAndDelete:", id);
  const navigate = useNavigate();
  const [productName, setProductName] = useState(null);
  const [pictures, setPictures] = useState([]);
  console.log("pictures in OfferIdUpdateAndDelete:", pictures);

  const {
    setIsSended,
    isSended,
    axios,
    data,
    setData,
    setIsLoading,
    isLoading,
    setInfoUser,
    infoUser,
    setErrorMessage,
    setAvatarOffer,
    avatarOffer,
  } = useUser();

  useEffect(() => {
    // console.log("id inside useEffect in /offers/${id}:", id);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/offers/${id}`);
        console.log("response in /offers/${id}:", response);
        if (response?.data) {
          setData(response?.data);
          if (response?.data?.product_image) {
            let newPic = [...pictures];
            newPic.push(response?.data?.product_image);
            setPictures(newPic);
            setAvatarOffer(response?.data?.product_image);
          }
          console.log("pictures in axios.get on /offers/${id}:", pictures);
          setIsLoading(false);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("error?.response:", error?.response);
        console.log(
          "error?.response?.data?.message:",
          error?.response?.data?.infoUser
        );
        setInfoUser(error?.response?.data?.infoUser);
        if (infoUser) {
          navigate("/");
        }
      }
    };
    fetchData();
  }, [id]);

  const handleSuppOffers = async (e, data) => {
    console.log("data?._id in DashboardOffers:", data?._id);
    const id = data?._id;
    // setIsSended(true);
    e.preventDefault();
    try {
      setIsSended(true);
      const response = await axios.delete(
        `http://localhost:3000/offerDelete/${id}`
      );
      if (response.data) {
        console.log("response.data:", response.data);
        setData(response.data);
        setIsLoading(false);
        setIsSended(false);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.message);
      setIsSended(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxOfferIdUpdateAndDelete">
      <div className="wrapper">
        <div className="left">
          {pictures?.map((pic, index) => {
            console.log("pic in OfferIdUpdateAndDelete:", pic);
            return (
              <Fragment key={index}>
                <Image alt="avatarOffer" src={pic?.secure_url} />
                <label htmlFor="pictures"></label>
                <InputFileOffer
                  labelTxt="Change picture"
                  id="file"
                  setPictures={setPictures}
                  setAvatarOffer={setAvatarOffer}
                />
              </Fragment>
            );
          })}
        </div>
        <div className="right">
          <form action="">
            <Input type="text" id="productName" placeholder="Product name" />
            <Input type="text" id="productName" placeholder="Product name" />
            <div>{data?.offer_solded.toString()}</div>
          </form>
        </div>
        <InfoUserErrorMessage />
      </div>
    </div>
  );
};

export default OfferIdUpdateAndDelete;
