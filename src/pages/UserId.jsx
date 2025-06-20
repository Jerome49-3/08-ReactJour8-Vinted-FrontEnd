/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import saveToken from "../assets/lib/saveToken";
import { useUser } from "../assets/lib/userFunc";
import decryptUser from "../assets/lib/decryptUser";

//components
import Image from "../components/Image";
import Input from "../components/Input";
import Button from "../components/Button";
import InputFileAvatar from "../components/InputFileAvatar";
import Loading from "../components/Loading";
import Trash from "../components/Trash";

//images
// import updateIcon from "../assets/images/updateIcon.png";
import LoadedInputSubmit from "../components/LoadedInputSubmit";

const UserId = ({ faTrash }) => {
  const { id } = useParams();
  // console.log("id /users/${userId}:", id);
  // const { state } = useLocation();
  // console.log("state: in /users/${userId}:", state);
  // const { token } = state;
  // console.log("token /users/${userId}:", token);
  const [pictures, setPictures] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [newsletter, setNewsletter] = useState(null);
  const [newAdmin, setNewAdmin] = useState(null);
  const [sendEmail, setSendMail] = useState(null);
  const [dataAdmin, setDataAdmin] = useState(null);
  // console.log("dataAdmin in /users/${id} (GET):", dataAdmin);
  const [dataNews, setDataNews] = useState(null);
  // console.log("dataNews in /users/${id} (GET):", dataNews);

  // console.log("pictures in /users/${id}:", pictures);
  // console.log("avatar in /users/${id}:", avatar);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  // console.log("data in /users/${userId}:", data);
  // console.log(
  //   "data?.emailIsConfirmed in /users/${userId:",
  //   data?.emailIsConfirmed
  // );

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { token, isAdmin, avatar, setAvatar, setIsSended, isSended } =
    useUser();
  // console.log("token /users/${userId}:", token);
  // console.log("user /users/${userId}:", user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/users/${id}`
        );
        // console.log("response in /user/${id} (GET):", response);
        if (response?.data?.token) {
          try {
            const newToken = await response?.data?.token;
            // console.log("newToken in /users/${id} (GET):", newToken);
            if (newToken) {
              const userUpdated = await decryptUser(newToken);
              // console.log("userUpdated in /users/${id} (GET):", userUpdated);
              if (userUpdated) {
                setData(userUpdated);
                setDataAdmin(userUpdated?.isAdmin.toString());
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("pictures", pictures);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("isAdmin", newAdmin);
    formData.append("newsletter", newsletter);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_URL_USERID}${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response) {
        console.log(
          "response.data in handleUpdateData in /users/${id}:",
          response.data
        );
        setTimeout(() => {
          alert(response?.data?.message);
          setIsLoading(false);
          navigate(`/`);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };
  const handleDeleteData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (confirm("Do yout want delete this user and their  offers ?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_REACT_APP_URL_USERID}${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (response) {
          console.log(
            "response in handleDeleteData on /users/${id}:",
            response
          );
          console.log(
            "response.data in handleDeleteData on /users/${id}:",
            response.data
          );
          setIsLoading(false);
          alert(response.data.message);
          navigate(`/dashboard`);
        }
      } catch (error) {
        console.log("error:", error?.response);
        setErrorMessage(error?.response?.data?.message);
      }
    } else {
      navigate(`/dashboard`);
    }
  };

  const handleSendMailCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/sendMail/sendCode/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer token",
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log("response.data:", response.data);
        alert(response.data.message);
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxUserId">
      <div className="wrapper">
        <form className="bottom" onSubmit={handleUpdateData}>
          <div className="left">
            <Image src={avatar} alt="avatar" />
            <InputFileAvatar
              labelTxt="Choose your new avatar"
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
            <div className="boxIsAdmin">
              {isAdmin === true && (
                <Input
                  labelTxt="Admin:"
                  id="admin"
                  type="text"
                  placeholder={dataAdmin}
                  value={newAdmin || ""}
                  classInput="isAdmin"
                  setState={setNewAdmin}
                />
              )}
            </div>
            <div className="boxNewsletter">
              <Input
                labelTxt="newsletter:"
                type="text"
                placeholder={dataNews}
                id="newsletter"
                value={dataNews || ""}
                classInput="newsletter"
                setState={setNewsletter}
              />
            </div>
            <div className="boxEmailIsConfirmed">
              <div className="infosEmailIsConfirmed">
                <h3>email confirmé:</h3>
                <div>{data?.emailIsConfirmed.toString()}</div>
              </div>

              {/* <Links
                path="/sendEmail"
                classLink="linkSendMail"
                state={{
                  data: {
                    usernameDest: data?.account?.username,
                    admin: data?.account?.username,
                    codeDest: null,
                  },
                }}
                linkText="Renvoyer le code"
              /> */}
              {data?.emailIsConfirmed.toString() === "false" && (
                <>
                  <Button
                    handleClick={handleSendMailCode}
                    buttonText="Renvoyer le code"
                    classButton="btnSendMailCode"
                  />
                  {<p>{sendEmail}</p>}
                </>
              )}
            </div>
            <div className="boxDate">
              <div>Date de création:</div>
              <div>{data?.date}</div>
            </div>
            <div className="boxSubmitTrash">
              <LoadedInputSubmit
                isSended={isSended}
                setIsSended={setIsSended}
                value="Update"
              />
              <Trash id={id} faTrash={faTrash} handleClick={handleDeleteData} />
            </div>
          </div>
        </form>
      </div>
      {errorMessage && <div className="red">{errorMessage}</div>}
    </div>
  );
};

export default UserId;
