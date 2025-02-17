import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import TextArea from "../components/TextArea";
import Input from "../components/Input";

const Publish = ({ faRotateRight }) => {
  const viewFile = useRef(null);
  const { token, axios } = useUser();
  // console.log("token in in /publish:", token);
  const [errorMessage, setErrorMessage] = useState("");
  const [pictures, setPictures] = useState([]);
  // console.log("pictures in in /publish:", pictures);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
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
    setErrorMessage("");
    console.log("token inside handleSubmit in /publish:", token);
    // console.log('e:', e);
    e.preventDefault();
    const formData = new FormData();
    price = Number(price).toFixed(2);
    let arrRotate = [];
    for (let i = 0; i < pictures.length; i++) {
      console.log(
        "pictures.length in for on handleSubmit in /publish:",
        pictures.length
      );
      const el = pictures[i];
      console.log("el in for on handleSubmit in /publish:", el);
      formData.append("pictures", el.file);
      arrRotate.push(el.rotation);
      console.log("el.rotate in for on handleSubmit in /publish:", el.rotation);
    }
    const strArrRotate = JSON.stringify(arrRotate);
    formData.append("rotations", strArrRotate);
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
        import.meta.env.VITE_REACT_APP_URL_PUBLISH,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     "content-type": "multipart/form-data",
        //   },
        // }
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
              <input
                type="file"
                id="pictures"
                name="pictures"
                multiple={true}
                onChange={(e) => {
                  let newPic = [...pictures];
                  const filesArray = Array.from(e.target.files);
                  console.log(
                    "e.target.files on onChange/inputFile in /publish:",
                    e.target.files
                  );
                  console.log(
                    "filesArray on onChange/inputFile in /publish:",
                    filesArray
                  );
                  // console.log(
                  //   "newPic in onChange/inputFile on publish:",
                  //   newPic
                  // );
                  filesArray.forEach((file) => {
                    console.log("file on forEach in /publish:", file);
                    const picAndRotate = {
                      file: file,
                      rotation: 0,
                    };
                    console.log("picAndRotate in /publish::", picAndRotate);
                    newPic.push(picAndRotate);
                  });
                  setPictures(newPic);
                }}
              />
              {pictures.map((files, index) => {
                console.log("files on .map in /publish::", files);
                return (
                  <div className="viewPics" key={index}>
                    <img
                      src={URL.createObjectURL(files.file)}
                      alt="Image"
                      ref={viewFile}
                      style={{
                        transform: `rotate(${
                          pictures.find(
                            (item) => item.file.name === files.file.name
                          )?.rotation || 0
                        }deg)`,
                      }}
                    />
                    <button
                      type="button"
                      className="suppFiles"
                      onClick={() => {
                        const newPictures = pictures.filter(
                          (picture) => picture.file !== files.file
                        );
                        setPictures(newPictures);
                      }}
                    >
                      X
                    </button>
                    <button
                      type="button"
                      className="rotateFiles"
                      onClick={() => {
                        const updatedRotations = pictures.map((item) => {
                          console.log("item in /publish:", item);
                          if (item.file.name === files.file.name) {
                            return {
                              ...item,
                              rotation: (item.rotation + 90) % 360,
                            };
                          }
                          return item;
                        });
                        console.log(
                          "updatedRotations in /publish:",
                          updatedRotations
                        );
                        setPictures(updatedRotations);
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
            value={title || ""}
            id="title"
            type="text"
            placeholder="Titre"
            setState={setTitle}
          />
          <TextArea
            name="description"
            value={description || ""}
            id="description"
            type="text"
            placeholder="Description"
            setState={setDescription}
          />
          <Input
            value={price || ""}
            id="price"
            type="number"
            placeholder="Prix"
            setState={setPrice}
            min="0"
            max="100000"
          />
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
          <Input
            value={city || ""}
            id="city"
            type="text"
            placeholder="Emplacement"
            setState={setCity}
          />
          <Input type="submit" value="poster votre annonce" />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
