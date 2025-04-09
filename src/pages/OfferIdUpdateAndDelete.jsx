/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";
import { useEffect, useState, Fragment } from "react";
//components
import Image from "../components/Image";
import Loading from "../components/Loading";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import LoadedInputSubmit from "../components/LoadedInputSubmit";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";
import InputArrayObject from "../components/InputArrayObject";
import InputArrayPictures from "../components/InputArrayPictures";
import InputFileAvatar from "../components/InputFileAvatar";
import Trash from "../components/Trash";

const OfferIdUpdateAndDelete = ({ faTrash }) => {
  const { id } = useParams();
  // console.log("id in OfferIdUpdateAndDelete:", id);
  const navigate = useNavigate();
  const [productName, setProductName] = useState(null);
  const [data, setData] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [offerSolded, setOfferSolded] = useState(null);
  const [pictures, setPictures] = useState([]);
  // console.log("pictures in OfferIdUpdateAndDelete:", pictures);
  const [productDetails, setProductDetails] = useState([]);
  // console.log("productDetails in OfferIdUpdateAndDelete:", productDetails);
  // console.log("productDetails in OfferIdUpdateAndDelete:", productDetails);
  const [imgsNbr, setImgsNbr] = useState(null);
  const [imgSupp, setImgSupp] = useState([]);
  console.log("imgSupp in OfferIdUpdateAndDelete:", imgSupp);
  const {
    setIsSended,
    isSended,
    axios,
    setIsLoading,
    isLoading,
    setInfoUser,
    infoUser,
    setErrorMessage,
    setAvatarOffer,
    avatarOffer,
  } = useUser();
  // console.log("avatarOffer in OfferIdUpdateAndDelete:", avatarOffer);
  useEffect(() => {
    // console.log("id inside useEffect in /offers/${id}:", id);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/offer/${id}`);
        console.log("response in OfferIdUpdateAndDelete:", response);
        if (response) {
          setData(response?.data);
          if (response?.data?.product_image) {
            let arrayPic = [...pictures];
            arrayPic.push(response?.data?.product_image);
            console.log("arrayPic in OfferIdUpdateAndDelete:", arrayPic);
            setPictures(arrayPic);
            setAvatarOffer(arrayPic);
          } else if (response?.data?.product_pictures) {
            setPictures(response?.data?.product_pictures);
            setAvatarOffer(response?.data?.product_pictures);
          }
          setProductDetails(response?.data?.product_details);
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

  useEffect(() => {
    if (data?.product_pictures) {
      const nbrPics = data?.product_pictures.length;
      // console.log("nbrPics in OfferIdUpdateAndDelete:", nbrPics);
      setImgsNbr(
        document.documentElement.style.setProperty("--imgsLength", nbrPics)
      );
    }
  }, [data?.product_pictures]);

  const handleUpdateOffer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    pictures.forEach(function (file) {
      console.log("file instanceof Blob:", file instanceof Blob);
      console.log("file in forEach in OfferIdUpdateAndDelete :", file);
    });
    for (let i = 0; i < pictures.length; i++) {
      const el = pictures[i];
      if (el instanceof Blob) {
        formData.append("pictures", el);
      }
    }
    formData.append("infoImgSupp", JSON.stringify(imgSupp));
    // formData.append("pictures", JSON.stringify(pictures));
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("offerSolded", offerSolded);
    formData.append("productDetails", JSON.stringify(productDetails));

    try {
      setIsSended(true);
      const response = await axios.put(
        `http://localhost:3000/offer/${id}`,
        formData
      );
      if (response.data) {
        // console.log("response.data:", response?.data);
        setInfoUser(response?.data?.infoUser);
        setTimeout(() => {
          setIsSended(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setTimeout(() => {
        setIsSended(false);
      }, 3000);
    }
  };

  const handleSuppOffers = async (e, data) => {
    // console.log("data?._id in OfferIdUpdateAndDelete:", data?._id);
    const id = data?._id;
    // setIsSended(true);
    e.preventDefault();
    try {
      setIsSended(true);
      const response = await axios.delete(`http://localhost:3000/offer/${id}`);
      if (response.data) {
        console.log("response.data:", response.data);
        setData(response.data);
        setIsLoading(false);
        setIsSended(false);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.message);
      setTimeout(() => {
        setIsSended(false);
      }, 3000);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form
      className="boxOfferIdUpdateAndDelete"
      action="POST"
      onSubmit={handleUpdateOffer}
    >
      <div className="wrapper">
        <div className="left">
          <InputArrayPictures
            labelTxt="Choose your new picture"
            pictures={pictures}
            setPictures={setPictures}
            avatarOffer={avatarOffer}
            setAvatarOffer={setAvatarOffer}
            imgSupp={imgSupp}
            setImgSupp={setImgSupp}
          />
        </div>
        <div className="right">
          <div className="boxOfferIdUpdateInput">
            <Input
              type="text"
              id="productName"
              placeholder={data?.product_name}
              value={productName || ""}
              setState={setProductName}
              labelTxt="product_name:"
            />
            <Input
              type="number"
              id="productPrice"
              placeholder={data?.product_price}
              value={productPrice || ""}
              setState={setProductPrice}
              min="0"
              max="100000"
              labelTxt="product_price:"
            />
            <TextArea
              type="text"
              id="productDescription"
              placeholder={data?.product_description}
              value={productDescription || ""}
              setState={setProductDescription}
              labelTxt="product_description:"
            />
            <Input
              type="text"
              id="offerSolded"
              placeholder={data?.offer_solded?.toString()}
              value={offerSolded || ""}
              setState={setOfferSolded}
              labelTxt="Offer Solded:"
            />
            <InputArrayObject
              id="offerDetails"
              arrayObject={productDetails}
              setArrayObject={setProductDetails}
            />
            <div className="boxSubmitTrash">
              <LoadedInputSubmit
                isSended={isSended}
                setIsSended={setIsSended}
                value="Update"
              />
              <Trash id={id} faTrash={faTrash} handleClick={handleSuppOffers} />
            </div>
          </div>
        </div>
        <InfoUserErrorMessage />
      </div>
    </form>
  );
};

export default OfferIdUpdateAndDelete;
