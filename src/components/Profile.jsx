/* eslint-disable react-hooks/exhaustive-deps */
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
import saveToken from "../assets/lib/saveToken";

const Profile = () => {
  const { token, setToken, user, setUser, setIsAdmin } = useUser();
  // console.log("token in /profile/${id}:", token);
  const { id } = useParams();
  // console.log("id in /profile/${id}:", id);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState(null);
  // console.log("pictures in /profile/${id}::", pictures);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [newsletter, setNewsletter] = useState(null);
  const [avatar, setAvatar] = useState(null);
  // console.log("avatar in /profile/${id}::", avatar);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/profile/${id}`);
        // console.log("response in /profile/${id}:", response);
        if (response?.data) {
          console.log("response.data in /profile/${id}:", response?.data);
          // setData(response?.data);
          if (response?.data?.token) {
            try {
              const newToken = await response?.data?.token;
              if (newToken) {
                setToken(newToken);
                saveToken(newToken, setUser, setIsAdmin);
                console.log("user in /profile/${id}:", user);
                setData(user);
                setAvatar(data?.account?.avatar?.secure_url);
              } else {
                console.log("not newToken in /profile");
              }
            } catch (error) {
              console.log("error after response?.data?.token:", error);
            }
          }
          // console.log('data in /profile/${id}:', data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error?.message);
        setErrorMessage(error?.response?.data?.message || "update failed");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const userId = data.id;
    const formData = new FormData();
    formData.append("pictures", pictures);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("newsletter", newsletter);
    formData.append("userId", userId);
    try {
      const response = await axios.put(
        `http://localhost:3000/profile/${id}`,
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
        setTimeout(() => {
          alert(response?.data?.message);
          setIsLoading(false);
          navigate(`/`);
        }, 1000);
      }
    } catch (error) {
      console.log(error?.message);
      setErrorMessage(error?.response?.data?.message || "update failed");
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
              Voici le profil de <strong>{data?.account?.username}</strong>
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
            </div>
            <div className="right">
              <div className="boxUsername">
                <Input
                  label="username:"
                  type="text"
                  id="username"
                  placeholder={data?.account?.username}
                  value={username || ""}
                  setState={setUsername}
                />
              </div>
              <div className="boxEmail">
                <Input
                  label="email:"
                  type="email"
                  id="email"
                  placeholder={data?.email}
                  value={email || ""}
                  setState={setEmail}
                />
              </div>
              <div className="boxNewsletter">
                {data?.newsletter === true ? (
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
              <div className="boxDate">Date de création: {data?.date}</div>
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
