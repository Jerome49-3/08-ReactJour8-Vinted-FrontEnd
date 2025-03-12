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
import TextArea from "../components/TextArea";

const OfferIdUpdateAndDelete = () => {
  const { id } = useParams();
  // console.log("id in OfferIdUpdateAndDelete:", id);
  const navigate = useNavigate();
  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [pictures, setPictures] = useState([]);
  let newPic = [...pictures];
  const [imgsNbr, setImgsNbr] = useState(null);
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
  console.log("avatarOffer in OfferIdUpdateAndDelete:", avatarOffer);
  useEffect(() => {
    // console.log("id inside useEffect in /offers/${id}:", id);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/offers/${id}`);
        console.log("response in /offers/${id}:", response);
        if (response?.data) {
          setData(response?.data);
          if (response?.data?.product_image) {
            newPic.push(response?.data?.product_image);
            setPictures(newPic);
          } else if (response?.data?.product_pictures) {
            const dataPictures = response?.data?.product_pictures;
            dataPictures.forEach(function (item) {
              console.log("item:", item);
              newPic.push(item);
              setPictures(newPic);
              setAvatarOffer(newPic);
            });
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

  useEffect(() => {
    if (data?.product_pictures) {
      const nbrPics = data?.product_pictures.length;
      console.log("nbrPics:", nbrPics);
      setImgsNbr(
        document.documentElement.style.setProperty("--imgsLength", nbrPics)
      );
    }
  }, [data?.product_pictures]);

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
          {pictures.map((pic, index) => {
            console.log("pic in OfferIdUpdateAndDelete:", pic);
            return (
              <div className="boxPictures" key={index}>
                <Image
                  alt="avatarOffer"
                  src={avatarOffer[index]?.secure_url || avatarOffer[index]}
                />
                <label htmlFor="pictures">
                  Choose your new offer
                  <input
                    id="pictures"
                    name="pictures"
                    type="file"
                    onChange={(e, index) => {
                      console.log("e.target.files:", e.target.files);
                      console.log(
                        "e.target.files[0] on inputFile:",
                        e.target.files[0]
                      );
                      console.log("index:", index);

                      const files = e.target.files[0];
                      const newPictures = newPic.map((pic, i) =>
                        i === index
                          ? { ...pic, url: URL.createObjectURL(files) }
                          : pic
                      );
                      console.log("newPictures:", newPictures);
                      setPictures(newPictures);
                      setAvatarOffer(newPictures);
                      // setPictures(e.target.files[0]);
                      // setAvatarOffer(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </label>
                {/* <InputFileOffer
                  labelTxt="Change picture"
                  id="file"
                  setPictures={setPictures}
                  setAvatarOffer={setAvatarOffer}
                  index={index}
                /> */}
              </div>
            );
          })}
        </div>
        <div className="right">
          <form action="">
            <Input
              type="text"
              id="productName"
              placeholder="Product name"
              value={productName}
              setState={setProductName}
            />
            <Input
              type="number"
              id="productPrice"
              placeholder="Product price"
              value={productPrice}
              setState={setProductPrice}
              min="0"
              max="100000"
            />
            <TextArea
              type="text"
              id="productDescription"
              placeholder="product description"
              value={productDescription}
              setState={setProductDescription}
            />
            <div>{data?.offer_solded?.toString()}</div>
          </form>
        </div>
        <InfoUserErrorMessage />
      </div>
    </div>
  );
};

export default OfferIdUpdateAndDelete;
