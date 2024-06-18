import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

//components
import TextArea from '../components/TextArea';
import Input from '../components/Input'

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [pictures, setPictures] = useState(null);
  const navigate = useNavigate();

  const handleChangeFile = (e) => {
    setPictures(e.target.file)
  }
  const handleSubmit = async (e) => {
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


      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        {
          formData,
        },
        params,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data"
          }
        }
      );
      if (response) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log('error', error.response)
    }
  }

  return token ? (
    <div className='boxForm boxFormCenter'>
      <form onSubmit={handleSubmit}>
        <Input label="+ ajoute une photo !" htmlFor='pictures' type="file" id='pictures' name='pictures' onChange={() => {
          handleChangeFile
        }} multiple />
        {pictures && <img src={pictures} alt="Image" />}
        <Input value={title} id="title" type="text" placeholder="nom du produit" setState={setTitle} />
        <TextArea name="description" value={description} id="description" type="text" placeholder="Description" setState={setDescription} />
        <Input value={price} id="price" type="number" placeholder="Prix" setState={setPrice} />
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