/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "../assets/lib/userFunc";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//components
import Loading from "./Loading";
import Image from "./Image";
import Input from "./Input";
import InputFileAvatar from "./InputFileAvatar";

//lib
import decryptUser from "../assets/lib/decryptUser";
import saveToken from "../assets/lib/saveToken";

//images
import updateIcon from "../assets/images/updateIcon.png";
import LoadedInputSubmit from "./LoadedInputSubmit";
import Trash from "./Trash";
import InfoUserErrorMessage from "./InfoUserErrorMessage";

const Profile = ({ faTrash }) => {
  const {
    setToken,
    setUser,
    setIsAdmin,
    avatar,
    setAvatar,
    setImgBoxUser,
    setIsSended,
    isSended,
    setIsSendedTrash,
    isSendedTrash,
    logout,
  } = useUser();
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.group("state on /profile:");
  console.log("id in /profile/${id}:", id);
  console.log("data in /profile/${id}:", data);
  console.groupEnd();
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState(null);
  console.group("formData on /profile:");
  console.log("pictures in /profile/${id}:", pictures);
  console.log("avatar in /profile/${id}::", avatar);
  console.groupEnd();
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [newsletter, setNewsletter] = useState(null);
  const [dataNews, setDataNews] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/profile/${id}`
        );
        // console.log("response in /profile/${id}:", response);
        if (response?.data) {
          // console.log("response.data in /profile/${id}:", response?.data);
          // setData(response?.data);
          if (response?.data?.token) {
            try {
              const newToken = await response?.data?.token;
              if (newToken) {
                const userUpdated = await decryptUser(newToken);
                // console.log("userUpdated in /users/${id} (GET):", userUpdated);
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
        setTimeout(() => {
          setIsSended(false);
        }, 3000);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateData = async (e) => {
    setIsSended(true);
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
        `${import.meta.env.VITE_REACT_APP_URL}/profile/${id}`,
        formData
      );
      // console.log('response in /profile/${id}::', response);
      // console.log(
      //   "response.data in handleUpdateData in /profile/${id}::",
      //   response.data
      // );
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
            const avatarSecureUrl = userUpdated?.account?.avatar?.secure_url;
            // console.log("avatarSecureUrl: in userProvider:", avatarSecureUrl);
            // console.log(
            //   "typeof avatarSecureUrl: in userProvider:",
            //   typeof avatarSecureUrl
            // );
            const avatarUrl = userUpdated?.account?.avatar;
            // console.log("typeof avatarUrl: in userProvider:", typeof avatarUrl);
            if (typeof avatarUrl === "string") {
              setImgBoxUser(avatarUrl);
              setAvatar(avatarUrl);
            } else if (typeof avatarSecureUrl === "string") {
              setImgBoxUser(avatarSecureUrl);
              setAvatar(avatarSecureUrl);
            } else {
              setImgBoxUser(null);
            }
            if (id === userUpdated._id) {
              // console.log("userUpdated._id in profile:", userUpdated._id);
              // console.log("id in profile:", id);
              // console.log(
              //   "typeof userUpdated._id in profile:",
              //   typeof userUpdated._id
              // );
              const avatarSecureUrl = await userUpdated?.account?.avatar
                ?.secure_url;
              const avatarUrl = await userUpdated?.account?.avatar;
              // console.log("typeof id in profile:", typeof id);
              // console.log("avatarSecureUrl in profile:", avatarSecureUrl);
              // console.log("avatarUrl in profile:", avatarUrl);
              setToken(newToken);
              saveToken(newToken, setUser, setIsAdmin, setImgBoxUser);
              if (typeof avatarUrl !== "object") {
                setImgBoxUser(avatarUrl);
              } else {
                setImgBoxUser(avatarSecureUrl);
              }
            }
            setIsLoading(false);
          } else {
            console.log("not newToken in /profile");
          }
        } catch (error) {
          console.log("error after response?.data?.token:", error);
          setTimeout(() => {
            setIsSended(false);
          }, 1000);
        }
      }
      setTimeout(() => {
        alert(response?.data?.message);
        setIsSended(false);
        navigate(`/`);
      }, 1000);
    } catch (error) {
      console.log(error?.message);
      setErrorMessage(error?.response?.data?.message || "update failed");
    }
  };

  const handleDeleteData = async (e) => {
    console.log("id in handleDeleteData on profile/:id:", id);

    e.preventDefault();
    try {
      setIsSendedTrash(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URL}/profile/${id}`
      );
      console.log("response in handleDeleteData on profile/:id:", response);
      if (response.data.infoUser) {
        logout();
        navigate("/");
      }
    } catch (error) {
      console.log("error in handleDeleteData on profile/:id:", error);
      setTimeout(() => {
        setIsSendedTrash(false);
      }, 1000);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <form className="boxUserId" onSubmit={handleUpdateData}>
        <div className="wrapper">
          <div className="left">
            <Image src={avatar} alt="avatar" />
            <InputFileAvatar
              labelTxt="Choose your avatar"
              id="file"
              setPictures={setPictures}
              setAvatar={setAvatar}
            />
          </div>
          <div className="right">
            <div className="boxUsername">
              <Input
                labelTxt="username:"
                type="text"
                id="username"
                placeholder={data?.account?.username}
                value={username || ""}
                setState={setUsername}
              />
            </div>
            <div className="boxEmail">
              <Input
                labelTxt="email:"
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
                  labelTxt="newsletter:"
                  type="text"
                  placeholder="true"
                  id="newsletter"
                  value={newsletter || ""}
                  classInput="newsletter"
                  setState={setNewsletter}
                />
              ) : (
                <Input
                  labelTxt="newsletter:"
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
            <InfoUserErrorMessage />
            <div className="boxSubmitTrash">
              <LoadedInputSubmit
                setIsSended={setIsSended}
                isSended={isSended}
                value="Update profil"
                src={updateIcon}
                alt="update icon"
                classImg="imgInputSubmit"
                type="submit"
                id="inputSubmit"
              />
              <Trash
                setIsSendedTrash={setIsSendedTrash}
                isSendedTrash={isSendedTrash}
                faTrash={faTrash}
                id={id}
                handleClick={handleDeleteData}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
