import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";

//components
import TextArea from "../components/TextArea";
import Input from "../components/Input";
// import InputFile from "../components/InputFile";
import Button from "../components/Button";
import LoadedInputSubmit from "../components/LoadedInputSubmit";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";

const Publish = ({ faTrash, price, setPrice, quantity }) => {
  // console.log(
  //   "price in Publish:",
  //   price,
  //   "\n:",
  //   "quantity in Publish:",
  //   quantity
  // );
  const viewFile = useRef(null);
  const {
    token,
    axios,
    isSended,
    setIsSended,
    setErrorMessage,
    errorMessage,
    infoUser,
  } = useUser();
  // console.log("token in in /publish:", token);
  const [pictures, setPictures] = useState([]);
  // console.log("pictures in in /publish:", pictures);
  // console.log(
  //   "Array.isArray(pictures) in in /publish:",
  //   Array.isArray(pictures)
  // );
  // console.log("pictures.length in in /publish:", pictures.length);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setErrorMessage("");
  }, []);

  const handleSubmit = async (e) => {
    // console.log(
    //   "price in handleSubmit:",
    //   price,
    //   "\n:",
    //   "quantity in handleSubmit:",
    //   quantity
    // );
    e.preventDefault();
    setErrorMessage("");
    setIsSended(true);
    const formData = new FormData();
    // const form = e.currentTarget;
    // console.log("form on /publish:", form);
    // const values = Object.fromEntries(new FormData(form));
    // console.log("values on /publish:", values);
    price = Number(price).toFixed(2);
    quantity = Number(quantity).toFixed(2);
    // console.log("quantity in handleSubmit on /publish:", quantity);
    // console.log(
    //   "typeof quantity in handleSubmit on /publish:",
    //   typeof quantity
    // );
    for (let i = 0; i < pictures.length; i++) {
      const el = pictures[i];
      // console.log("el in picures for:", el);
      formData.append("pictures", el);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("condition", condition);
    formData.append("color", color);
    formData.append("city", city);
    // price = Number(price).toFixed(2);
    // console.log("typeof price in publish:", typeof price);
    // console.log(
    //   "file in publish:",
    //   pictures,
    //   "\n",
    //   "title in publish:",
    //   title,
    //   "\n",
    //   "description in publish:",
    //   description,
    //   "\n",
    //   "price in publish:",
    //   price,
    //   "\n",
    //   "brand in publish:",
    //   brand,
    //   "\n",
    //   "size in publish:",
    //   size,
    //   "\n",
    //   "condition in publish:",
    //   condition,
    //   "\n",
    //   "color in publish:",
    //   color,
    //   "\n",
    //   "city in publish:",
    //   city
    // );
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/offer/publish`,
        formData
      );
      // console.log(response);
      if (response) {
        // console.log("response in publish:", response);
        // console.log("response.data in publish:", response.data);
        // console.log(
        //   "response.data.newOffer._id in publish:",
        //   response.data.newOffer._id
        // );
        setIsSended(false);
        navigate(`/offers/${response.data.newOffer._id}`);
      } else {
        setTimeout(() => {
          setIsSended(false);
        }, 3000);
      }
    } catch (error) {
      console.log(
        "error",
        error,
        "error.response",
        error.response.data.message
      );
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setIsSended(false);
      }, 1000);
    }
  };

  return token ? (
    <div className="boxForm">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="boxPicTop">
            <div
              className={
                pictures.length > 0 ? "boxPicBottom" : "boxPicBottomEmpty"
              }
            >
              {pictures.length === 0 ? (
                <label htmlFor="pictures" id="labelPic">
                  + ajouter une photo !
                </label>
              ) : (
                <label htmlFor="pictures" id="labelPic">
                  +
                </label>
              )}
              {/* <InputFile /> */}
              <input
                type="file"
                id="pictures"
                name="pictures"
                multiple={true}
                onChange={(e) => {
                  // console.log("e.target:", e.target);
                  // console.log("e.target.files:", e.target.files);
                  let newPic = [...pictures];
                  // console.log(
                  //   "newPic on onChange/inputFile in /publish:",
                  //   newPic
                  // );
                  const filesArray = Array.from(e.target.files);
                  // console.log(
                  //   "filesArray on onChange/inputFile in /publish:",
                  //   filesArray
                  // );
                  // console.log(
                  //   "e.target.files on onChange/inputFile in /publish:",
                  //   e.target.files
                  // );
                  filesArray.forEach((file) => {
                    // console.log("file on forEach in /publish:", file);
                    newPic.push(file);
                  });
                  setPictures(newPic);
                }}
              />
              {pictures.map((files, index) => {
                // console.log("files on .map in /publish::", files);
                return (
                  <div className="viewPics" key={index}>
                    <img
                      src={URL.createObjectURL(files)}
                      alt="Image"
                      ref={viewFile}
                    />
                    <Button
                      classButton="suppFiles"
                      handleClick={() => {
                        const newPictures = pictures.filter(
                          (picture) => picture.name !== files.name
                        );
                        setPictures(newPictures);
                      }}
                      icon={faTrash}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="boxInputFormPublish">
            <Input
              value={title || ""}
              id="title"
              type="text"
              placeholder="Title"
              setState={setTitle}
              required={true}
            />
            <TextArea
              name="description"
              value={description || ""}
              id="description"
              type="text"
              placeholder="Description"
              setState={setDescription}
              required={true}
            />

            <Input
              value={price || ""}
              id="price"
              type="number"
              placeholder="Price"
              setState={setPrice}
              required={true}
              min="0"
              max="100000"
            />
            <div className="brandAndSize">
              <Input
                value={brand || ""}
                id="brand"
                type="text"
                placeholder="Marque"
                setState={setBrand}
              />
              <Input
                value={size || ""}
                id="size"
                type="text"
                placeholder="Taille"
                setState={setSize}
              />
            </div>
            <div className="conditionAndColor">
              <Input
                value={condition || ""}
                id="condition"
                type="text"
                placeholder="Condition"
                setState={setCondition}
              />
              <Input
                value={color || ""}
                id="color"
                type="text"
                placeholder="Couleur"
                setState={setColor}
              />
            </div>
            <Input
              value={city || ""}
              id="city"
              type="text"
              placeholder="Emplacement"
              setState={setCity}
            />
            <LoadedInputSubmit
              isSended={isSended}
              setIsSended={setIsSended}
              type="submit"
              value="Post your offer"
            />
          </div>
          {(errorMessage || infoUser) && <InfoUserErrorMessage />}
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
