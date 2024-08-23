import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";

//components
import Image from '../components/Image';
import Input from "../components/Input";
import Button from '../components/Button';
import InputFile from '../components/InputFile';

const User = () => {
  const { id } = useParams();
  console.log('id /users/${userId}:', id);
  const { state } = useLocation();
  console.log('state: in /users/${userId}:', state);
  const { token } = state;
  console.log('token /users/${userId}:', token);
  const [pictures, setPictures] = useState(null);
  const [avatar, setAvatar] = useState(null);
  console.log('pictures in /users/${id}:', pictures);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data"
            }
          }
        );
        console.log('response in /users/${userId}:', response);
        setData(response.data);
        setAvatar(response.data.avatar);
        console.log('data /users/${userId}:', data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id]);

  const handleUpdatePict = (file) => {
    setPictures(file);
    setAvatar(URL.createObjectURL(file));
  };

  return isLoading ? <Loading /> : (
    <div className="boxUserId">
      <div className="wrapper">
        <div className="top">
          <div className="title">
            Voici la page user de {data.username}
          </div>
        </div>
        <div className="bottom">
          <form className="left">
            <Image src={avatar} alt='avatar' />
            <label htmlFor="pictures"></label>
            <InputFile labelTxt='Update your avatar' setState={handleUpdatePict} />
            {/* <Button handleClick={handleSendPictures} /> */}
          </form>
          <form className="right">
            <div className="boxUsername">
              <Input label="username:" type='name' placeholder={data.username} value={data.username} />
            </div>
            <div className="boxEmail">
              <Input label="email:" type='email' placeholder={data.email} value={data.email} />
            </div>
            <div className="boxIsAdmin">
              {data.isAdmin === true ? (<Input label="Admin:" type='text' placeholder='true' value={data.isAdmin} classInput='isAdmin' />) : (<Input label="Admin:" type='text' placeholder='false' value={data.isAdmin} classInput='isAdmin' />)}
            </div>
            <div className="boxNewsletter">
              {data.newsletter === true ? (<Input label="newsletter:" type='text' placeholder='true' value={data.newsletter} classInput='newsletter' />) : (<Input label="newsletter:" type='text' placeholder='false' value={data.newsletter} classInput='newsletter' />)}
            </div>
            <div className="boxDate">
              Date de création: {data.date}
            </div>
            <div className="boxId">
              id: {data.id}
            </div>
            {/* <Button handleClick={handleSendInfos} /> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default User