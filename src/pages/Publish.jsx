import Input from '../components/Input'
import { useState } from 'react';

const SealIt = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [pictures, setPictures] = useState(null);

  const handleChangeFile = (e) => {
    setPictures(e.target.file)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Vos mots de passe ne sont pas identiques")
    }
  }

  return (
    <div className='boxForm boxFormCenter'>
      <form onSubmit={handleSubmit}>
        <Input value={title} id="title" type="text" placeholder="nom du produit" setState={setTitle} />
        <Input value={description} id="description" type="text" placeholder="Description" setState={setDescription} />
        <Input value={price} id="price" type="text" placeholder="Prix" setState={setPrice} />
        <Input value={brand} id="brand" type="text" placeholder="Marque" setState={setBrand} />
        <Input value={size} id="size" type="text" placeholder="Taille" setState={setSize} />
        <Input value={condition} id="condition" type="text" placeholder="Condition" setState={setCondition} />
        <Input value={color} id="color" type="text" placeholder="Couleur" setState={setColor} />
        <Input value={city} id="city" type="text" placeholder="Emplacement" setState={setCity} />
        <input type="file" id='pictures' name='pictures' onChange={() => {
          handleChangeFile
        }} multiple />
        <Input type="submit" value="poster votre annonce" />
      </form>
    </div>
  )
}

export default SealIt