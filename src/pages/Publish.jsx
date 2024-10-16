import { useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useUser } from '../context/lib/userFunc';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import TextArea from "../components/TextArea";
import Input from "../components/Input";

const Publish = ({ faRotateRight }) => {
  const [rotate, setRotate] = useState(0);
  const viewFile = useRef(null);
  const { token, errorMessage, setErrorMessage } = useUser();
  // console.log("token in publish:", token);
  const [pictures, setPictures] = useState([]);
  // console.log("pictures in publish:", pictures);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setErrorMessage('');
    // console.log("token inside handleSubmit in publish:", token);
    // console.log('e:', e);
    e.preventDefault();
    const formData = new FormData();
    price = Number(price).toFixed(2);
    for (let i = 0; i < pictures.length; i++) {
      const el = pictures[i];
      // console.log('el:', el);
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
      // console.log("token inside try to handleSubmit in publish:", token);
      const response = await axios.post(
        `https://site--vintedbackend--s4qnmrl7fg46.code.run/offer/publish`,
        // const response = await axios.post(
        //   `http/localhost:3000/offer/publish`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      if (response) {
        // console.log("response in publish:", response);
        // console.log("response.data in publish:", response.data);
        // console.log(
        //   "response.data.newOffer._id in publish:",
        //   response.data.newOffer._id
        // );
        navigate(`/offers/${response.data.newOffer._id}`);
      }
    } catch (error) {
      // console.log("error", error, "error.response", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return token ? (
    <div className="boxForm boxFormPublish">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="boxPicTop">
            <div className={pictures.length > 0 ? "boxPicBottom" : 'boxPicBottomEmpty'}>
              {pictures.length === 0 ? (
                <label htmlFor="pictures" id="labelPic">
                  + ajouter une photo !
                </label>
              ) : (
                <label htmlFor="pictures" id="labelPic">
                  +
                </label>
              )}
              <input
                type="file"
                id="pictures"
                name="pictures"
                multiple={true}
                onChange={(e) => {
                  let newPic = [...pictures];
                  console.log(
                    "e.target.files in onChange/inputFile on publish:",
                    e.target.files
                  );
                  console.log(
                    "Array.isArray() e.target.files in onChange/inputFile on publish:",
                    Array.isArray(e.target.files)
                  );
                  // console.log(
                  //   "newPic in onChange/inputFile on publish:",
                  //   newPic
                  // );
                  for (let i = 0; i < e.target.files.length; i++) {
                    const el = e.target.files[i];
                    // console.log("el in for on publish:", el);
                    newPic.push(el);
                  }
                  setPictures(newPic);
                }}
              />
              {pictures.map((files, key = index) => {
                // console.log("files:", files);
                return (
                  <div className="viewPics" key={key}>
                    <img
                      src={URL.createObjectURL(files)}
                      alt="Image"
                      ref={viewFile}
                    />
                    <button
                      type="button"
                      className="suppFiles"
                      onClick={() => {
                        let newPic = [...pictures];
                        // console.log(
                        //   "newPic in onChange/inputFile on publish:",
                        //   newPic
                        // );
                        newPic.pop();
                        setPictures(newPic);
                      }}
                    >
                      X
                    </button>
                    <button
                      type="button"
                      className="rotateFiles"
                      onClick={() => {
                        let newRotation = (rotate + 90) % 360;
                        // console.log('newRotation:', newRotation);
                        // console.log('typeof newRotation:', typeof newRotation);
                        setRotate(newRotation);
                        viewFile.current.style.transform = `rotate(${newRotation}deg)`;
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faRotateRight}
                        className="search-icons"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <Input
            value={title}
            id="title"
            type="text"
            placeholder="Titre"
            setState={setTitle}
          />
          <TextArea
            name="description"
            value={description}
            id="description"
            type="text"
            placeholder="Description"
            setState={setDescription}
          />
          <Input
            value={price}
            id="price"
            type="number"
            placeholder="Prix"
            setState={setPrice}
            min="0"
            max="100000"
          />
          <Input
            value={brand}
            id="brand"
            type="text"
            placeholder="Marque"
            setState={setBrand}
          />
          <Input
            value={size}
            id="size"
            type="text"
            placeholder="Taille"
            setState={setSize}
          />
          <Input
            value={condition}
            id="condition"
            type="text"
            placeholder="Condition"
            setState={setCondition}
          />
          <Input
            value={color}
            id="color"
            type="text"
            placeholder="Couleur"
            setState={setColor}
          />
          <Input
            value={city}
            id="city"
            type="text"
            placeholder="Emplacement"
            setState={setCity}
          />
          <Input type="submit" value="poster votre annonce" />
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
