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

//lib
import decryptUser from "../assets/lib/decryptUser";
import saveToken from "../assets/lib/saveToken";

const Profile = () => {
  const {
    token,
    setToken,
    user,
    setUser,
    setIsAdmin,
    avatar,
    setAvatar,
    setAvatarHeader,
  } = useUser();
  console.log("user in /profile/${id}:", user);
  // console.log("token in /profile/${id}:", token);
  const { id } = useParams();
  // console.log("id in /profile/${id}:", id);
  const [data, setData] = useState(null);
  console.log("data in /profile/${id}:", data);
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState(null);
  // console.log("pictures in /profile/${id}::", pictures);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [newsletter, setNewsletter] = useState(null);
  console.log("avatar in /profile/${id}::", avatar);
  const [dataNews, setDataNews] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        // console.log("response in /profile/${id}:", response);
        if (response?.data) {
          console.log("response.data in /profile/${id}:", response?.data);
          // setData(response?.data);
          if (response?.data?.token) {
            try {
              const newToken = await response?.data?.token;
              if (newToken) {
                const userUpdated = await decryptUser(newToken);
                console.log("userUpdated in /users/${id} (GET):", userUpdated);
                if (userUpdated) {
                  setData(userUpdated);
                  setDataNews(userUpdated?.newsletter.toString());
                }
                setAvatar(
                  userUpdated?.account?.avatar?.secure_url ||
                    userUpdated?.account?.avatar
                );
                setIsLoading(false);
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
          withCredentials: true,
        }
      );
      // console.log('response in /profile/${id}::', response);
      console.log(
        "response.data in handleUpdateData in /profile/${id}::",
        response.data
      );
      if (response?.data?.token) {
        try {
          const newToken = await response?.data?.token;
          if (newToken) {
            const userUpdated = await decryptUser(newToken);
            console.log("userUpdated in /users/${id} (GET):", userUpdated);
            if (userUpdated) {
              setData(userUpdated);
              setDataNews(userUpdated?.newsletter.toString());
            }
            setAvatar(
              userUpdated?.account?.avatar?.secure_url ||
                userUpdated?.account?.avatar
            );
            if (id === userUpdated._id) {
              console.log("userUpdated._id in profile:", userUpdated._id);
              console.log("id in profile:", id);
              console.log(
                "typeof userUpdated._id in profile:",
                typeof userUpdated._id
              );
              const avatarSecureUrl = await userUpdated?.account?.avatar
                ?.secure_url;
              const avatarUrl = await userUpdated?.account?.avatar;
              console.log("typeof id in profile:", typeof id);
              console.log("avatarSecureUrl in profile:", avatarSecureUrl);
              console.log("avatarUrl in profile:", avatarUrl);
              setToken(newToken);
              saveToken(newToken, setUser, setIsAdmin);
              if (typeof avatarUrl !== "object") {
                setAvatarHeader(avatarUrl);
              } else {
                setAvatarHeader(avatarSecureUrl);
              }
            }
            setIsLoading(false);
          } else {
            console.log("not newToken in /profile");
          }
        } catch (error) {
          console.log("error after response?.data?.token:", error);
        }
      }
      setTimeout(() => {
        alert(response?.data?.message);
        setIsLoading(false);
        navigate(`/`);
      }, 1000);
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
