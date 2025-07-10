/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import saveToken from "../assets/lib/saveToken";
import { useUser } from "../assets/lib/userFunc";
import decryptUser from "../assets/lib/decryptUser";

//components
import Image from "../components/Image";
import Input from "../components/Input";
import Button from "../components/Button";
import InputFileAvatar from "../components/InputFileAvatar";
import Loading from "../components/Loading";
import Trash from "../components/Trash";
import Links from "../components/Links";

//images
// import updateIcon from "../assets/images/updateIcon.png";
import LoadedInputSubmit from "../components/LoadedInputSubmit";

//libFetch
import handleDeleteUserId from "../assets/fetchDataLib/DELETE/fetchDeleteUserId";
import handleSendMailCode from "../assets/fetchDataLib/POST/handleSendMailCode";
import InputCheckBox from "../components/InputCheckBox";
import handleUpdateData from "../assets/fetchDataLib/PUT/handleUpdateData";

const UserId = ({ faTrash }) => {
  const { id } = useParams();
  // console.log("id /users/${userId}:", id);
  // const { state } = useLocation();
  // console.log("state: in /users/${userId}:", state);
  // const { token } = state;
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
  const {
    token,
    isAdmin,
    avatar,
    setAvatar,
    setIsSended,
    isSended,
    setUser,
    setIsAdmin,
    setImgBoxUser,
    imgBoxUser,
    tokenFgtP,
    setTokenFgtP,
  } = useUser();
  // console.log("token /users/${userId}:", token);
  // console.log("user /users/${userId}:", user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/userId/${id}`
        );
        // console.log("response in /user/${id} (GET):", response);
        if (response?.data?.token) {
          try {
            const newToken = await response?.data?.token;
            // console.log("newToken in /users/${id} (GET):", newToken);
            if (newToken) {
              const userUpdated = await decryptUser(newToken);
              const actualUser = await decryptUser(token);
              if (userUpdated) {
                console.log("userUpdated in /users/${id} (GET):", userUpdated);
                console.log("actualUser in /users/${id} (GET):", actualUser);
                console.log(
                  "userUpdated?._id === actualUser?._id in /users/${id} (GET):",
                  userUpdated?._id === actualUser?._id
                );
                setData(userUpdated);
                setDataAdmin(userUpdated?.isAdmin);
                setDataNews(userUpdated?.newsletter);
                if (userUpdated?._id === actualUser?._id) {
                  console.log(
                    "userUpdated._id in /users/${id} (GET):",
                    userUpdated._id
                  );
                  console.log(
                    "actualUser?._id in /users/${id} (GET):",
                    actualUser?._id
                  );
                  saveToken(
                    response?.data?.token,
                    setUser,
                    setIsAdmin,
                    setImgBoxUser
                  );
                }
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
  }, [id, imgBoxUser]);

  useEffect(() => {}, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxUserId">
      <div className="wrapper">
        <form
          className="bottom"
          onSubmit={(e) =>
            handleUpdateData(
              e,
              setIsLoading,
              pictures,
              username,
              email,
              newAdmin,
              newsletter,
              axios,
              id,
              token,
              setTokenFgtP,
              setErrorMessage
            )
          }
        >
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
            <div className="boxAdminNews">
              <div className="boxIsAdmin">
                {isAdmin === true && (
                  <InputCheckBox
                    idCheckbox="Admin"
                    nameCheckbox="Abonnez-vous"
                    state={dataAdmin || false}
                    setState={setNewAdmin}
                  />
                )}
              </div>
              <div className="boxNewsletter">
                <InputCheckBox
                  idCheckbox="Newsletter"
                  nameCheckbox="Abonnez-vous"
                  state={dataNews || false}
                  setState={setNewsletter}
                />
              </div>
            </div>
            <div className="boxEmailIsConfirmed">
              <div className="infosEmailIsConfirmed">
                <h3>email confirmé:</h3>
                <div>{data?.emailIsConfirmed.toString()}</div>
              </div>

              <Links
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
              />
              {data?.emailIsConfirmed.toString() === "false" && (
                <>
                  <Button
                    handleClick={(e) =>
                      handleSendMailCode(
                        e,
                        axios,
                        tokenFgtP,
                        navigate,
                        setErrorMessage
                      )
                    }
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
              <Trash
                id={id}
                faTrash={faTrash}
                handleClick={(e) => {
                  handleDeleteUserId(
                    e,
                    setIsLoading,
                    axios,
                    id,
                    token,
                    navigate,
                    setErrorMessage
                  );
                }}
              />
            </div>
          </div>
        </form>
      </div>
      {errorMessage && <div className="red">{errorMessage}</div>}
    </div>
  );
};

export default UserId;
