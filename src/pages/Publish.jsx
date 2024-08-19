import { useState } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from 'axios'

//components
import TextArea from '../components/TextArea';
import Input from '../components/Input'

const Publish = ({ token }) => {
  console.log('token in publish:', token);
  const [pictures, setPictures] = useState(null);
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
    console.log('token inside handleSubmit in publish:', token);
    // console.log('e:', e);
    e.preventDefault();
    const formData = new FormData();
    price = Number(price).toFixed(2);
    formData.append('pictures', pictures);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('size', size);
    formData.append('condition', condition);
    formData.append('color', color);
    formData.append('city', city);
    // price = Number(price).toFixed(2);
    console.log('typeof price in publish:', typeof price);
    console.log('file in publish:', pictures, "\n", 'title in publish:', title, "\n", 'description in publish:', description, "\n", 'price in publish:', price, "\n", 'brand in publish:', brand, "\n", 'size in publish:', size, "\n", 'condition in publish:', condition, "\n", 'color in publish:', color, "\n", 'city in publish:', city);
    try {
      console.log('token inside try to handleSubmit in publish:', token);
      // const response = await axios.post(
      //   "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
      const response = await axios.post(import.meta.env.VITE_REACT_APP_LOCALHOST_PUBLISH,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data"
          }
        }
      );
      console.log(response);
      if (response) {
        console.log('response in publish:', response);
        console.log('response.data in publish:', response.data);
        console.log('response.data.newOffer._id in publish:', response.data.newOffer._id);
        navigate(`/offers/${response.data.newOffer._id}`);
      }
    } catch (error) {
      console.log('error', error, 'error.response', error.response)
    }
  }

  return token ? (
    <div className='boxForm boxFormCenter'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pictures">+ ajouter une photo !</label>
        <input type="file" id='pictures' name='pictures'
          onChange={(e) => {
            console.log('e.target.files:', e.target.files[0]);
            setPictures(e.target.files[0])
          }}
        />
        {/* <Input label="+ ajoute une photo !" type="file" id='pictures' name='pictures' setState={setPictures} /> */}
        {pictures && <img src={URL.createObjectURL(pictures)} alt="Image" />}
        <Input value={title} id="title" type="text" placeholder="nom du produit" setState={setTitle} />
        <TextArea name="description" value={description} id="description" type="text" placeholder="Description" setState={setDescription} />
        <Input value={price} id="price" type="number" placeholder="Prix" setState={setPrice} min='0' max='100000' />
        <Input value={brand} id="brand" type="text" placeholder="Marque" setState={setBrand} />
        <Input value={size} id="size" type="text" placeholder="Taille" setState={setSize} />
        <Input value={condition} id="condition" type="text" placeholder="Condition" setState={setCondition} />
        <Input value={color} id="color" type="text" placeholder="Couleur" setState={setColor} />
        <Input value={city} id="city" type="text" placeholder="Emplacement" setState={setCity} />
        <Input type="submit" value="poster votre annonce" />
      </form>
    </div>
  )
    : <Navigate to="/login" />
}

export default Publish