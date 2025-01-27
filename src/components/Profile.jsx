import { useUser } from "../assets/lib/userFunc";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//components
import Loading from "./Loading";
import Image from "./Image";
import Input from "./Input";
import InputFile from "./InputFile";
import Button from "./Button";

const Profile = () => {
  const { token } = useUser();
  const { id } = useParams();
  console.log("id in /profile/${id}:", id);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState(null);
  console.log("pictures in /profile/${id}::", pictures);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [newsletter, setNewsletter] = useState(null);
  const [avatar, setAvatar] = useState(null);
  console.log("avatar in /profile/${id}::", avatar);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vintaidbackend--s4qnmrl7fg46.code.run/users/${id}`,
          // const response = await axios.get(
          //   `http://localhost:3000/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
          }
        );
        console.log("response in /profile/${id}::", response);
        if (response.data) {
          console.log("response.data in /profile/${id}::", response.data);
          setData(response?.data);
          setAvatar(response?.data?.avatar?.secure_url);
          // console.log('data in /profile/${id}:', data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateData = async (e) => {
    const userId = data.id;
    e.preventDefault();
    const formData = new FormData();
    formData.append("pictures", pictures);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("newsletter", newsletter);
    formData.append("userId", userId);
    try {
      const response = await axios.put(
        `https://site--vintaidbackend--s4qnmrl7fg46.code.run/profile/${id}`,
        // const response = await axios.put(
        //   `http://localhost:3000/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      if (response) {
        // console.log('response in /profile/${id}::', response);
        console.log(
          "response.data in handleUpdateData in /profile/${id}::",
          response.data
        );
        alert(response.data.message);
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="boxUserId">
        <div className="wrapper">
          <div className="top">
            <div className="title">
              Voici le profil de <strong>{data.username}</strong>
            </div>
          </div>
          <form className="bottom">
            <div className="left">
              <Image src={avatar} alt="avatar" />
              <label htmlFor="pictures"></label>
              <InputFile
                labelTxt="Choose your avatar"
                id="file"
                setPictures={setPictures}
                setAvatar={setAvatar}
              />
              {/* {pictures && (
                <img
                  src={URL.createObjectURL(pictures)}
                  alt="Image"
                  className="viewPictures"
                />
              )} */}
            </div>
            <div className="right">
              <div className="boxUsername">
                <Input
                  label="username:"
                  type="text"
                  id="username"
                  placeholder={data.username}
                  value={username || ""}
                  setState={setUsername}
                />
              </div>
              <div className="boxEmail">
                <Input
                  label="email:"
                  type="email"
                  id="email"
                  placeholder={data.email}
                  value={email || ""}
                  setState={setEmail}
                />
              </div>
              <div className="boxNewsletter">
                {data.newsletter === true ? (
                  <Input
                    label="newsletter:"
                    type="text"
                    placeholder="true"
                    id="newsletter"
                    value={newsletter || ""}
                    classInput="newsletter"
                    setState={setNewsletter}
                  />
                ) : (
                  <Input
                    label="newsletter:"
                    type="text"
                    id="newsletter"
                    placeholder="false"
                    value={newsletter || ""}
                    classInput="newsletter"
                    setState={setNewsletter}
                  />
                )}
              </div>
              <div className="boxDate">Date de création: {data.date}</div>
              <div className="boxButton">
                <Button
                  buttonText="Update profile"
                  handleClick={handleUpdateData}
                  // src={updateIcon}
                  classButton="updateButton"
                />
                <Button
                  buttonText="Delete profile"
                  // handleClick={handleDeleteData}
                  // src={updateIcon}
                  classButton="deleteButton"
                />
              </div>
            </div>
          </form>
        </div>
        {errorMessage && <div className="red">{errorMessage}</div>}
      </div>
    </>
  );
};

export default Profile;
