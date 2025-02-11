import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import saveToken from "../assets/lib/saveToken";
import Cookies from "js-cookie";
import { useUser } from "../assets/lib/userFunc";

//components
import Image from "../components/Image";
import Input from "../components/Input";
import Button from "../components/Button";
import InputFile from "../components/InputFile";
import Loading from "../components/Loading";

//images
import updateIcon from "../assets/images/updateIcon.png";

const User = () => {
  const { id } = useParams();
  // console.log("id /users/${userId}:", id);
  // const { state } = useLocation();
  // console.log("state: in /users/${userId}:", state);
  // const { token } = state;
  // console.log("token /users/${userId}:", token);
  const [pictures, setPictures] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [newsletter, setNewsletter] = useState(null);
  const [avatar, setAvatar] = useState(null);
  // console.log("pictures in /users/${id}:", pictures);
  // console.log("avatar in /users/${id}:", avatar);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { token, setToken, setUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_REACT_APP_URL_USERID,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
          }
        );
        console.log("response in /users/${id}:", response);
        if (response.data) {
          console.log("response.data in /users/${id}:", response.data);
          setData(response?.data);
          setAvatar(response?.data?.avatar?.secure_url);
          // console.log('data in /users/${id}:', data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
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
    formData.append("isAdmin", isAdmin);
    formData.append("newsletter", newsletter);
    formData.append("userId", userId);
    try {
      const response = await axios.put(
        import.meta.env.VITE_REACT_APP_URL_USERID,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        // console.log('response in /users/${id}:', response);
        console.log(
          "response.data in handleUpdateData on /users/${id}:",
          response.data
        );
        const newData = response.data.message;
        const ok = import.meta.env.VITE_REACT_APP_MSSG_CONFIRM_PROFILE;
        const newToken = Cookies.get("accessTokenV");
        if (newData.includes(ok)) {
          saveToken(newToken, setToken, setUser, setIsAdmin);
          alert(response.data.message);
          setTimeout(() => {
            setIsLoading(false);
            navigate(`/dashboard`);
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };
  const handleDeleteData = async () => {
    if (confirm("Do yout want delete this user ?")) {
      try {
        const response = await axios.delete(
          import.meta.env.VITE_REACT_APP_URL_USERID,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
          }
        );
        if (response) {
          // console.log('response in /users/${id}:', response);
          console.log(
            "response.data in handleDeleteData on /users/${id}:",
            response.data
          );
          alert(response.data.message);
          navigate(`/dashboard`);
        }
      } catch (error) {
        console.log("error:", error);
        setErrorMessage(error.response.data.message);
      }
    } else {
      navigate(`/dashboard`);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxUserId">
      <div className="wrapper">
        <div className="top">
          <div className="title">
            Voici la page de <strong>{data.username}</strong>
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
            <div className="boxIsAdmin">
              {data.isAdmin === true ? (
                <Input
                  label="Admin:"
                  id="admin"
                  type="text"
                  placeholder="true"
                  value={isAdmin || ""}
                  classInput="isAdmin"
                  setState={setIsAdmin}
                />
              ) : (
                <Input
                  label="Admin:"
                  type="text"
                  id="admin"
                  placeholder="false"
                  value={isAdmin || ""}
                  classInput="isAdmin"
                  setState={setIsAdmin}
                />
              )}
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
                src={updateIcon}
                classButton="updateButton"
              />
              <Button
                buttonText="Delete profile"
                handleClick={handleDeleteData}
                src={updateIcon}
                classButton="deleteButton"
              />
            </div>
          </div>
        </form>
      </div>
      {errorMessage && <div className="red">{errorMessage}</div>}
    </div>
  );
};

export default User;
