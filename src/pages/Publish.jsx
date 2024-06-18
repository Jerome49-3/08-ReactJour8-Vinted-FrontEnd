import { useState } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from 'axios'

//components
import TextArea from '../components/TextArea';
import Input from '../components/Input'

const Publish = ({ token }) => {
  console.log('token1:', token);
  const [pictures, setPictures] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    console.log('e:', e);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('pictures', pictures);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('brand', brand);
      formData.append('size', size);
      formData.append('condition', condition);
      formData.append('color', color);
      formData.append('city', city);
      console.log('formData:', formData, 'file:', pictures, 'title:', title, 'description', description, 'price', price, 'brand', brand, 'size', size, 'condition:', condition, 'color:', color, 'city:', city)
      // price = Number(price).toFixed(2);
      // console.log('price:', price);
      console.log('token2:', token);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
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
        console.log('response:', response);
        navigate(`/offer/${response.data._id}`);
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
        <Input value={Number(price)} id="price" type="number" placeholder="Prix" setState={setPrice} />
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