import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../assets/lib/userFunc";
import axios from "axios";

//components
import Image from "./Image";
import Loading from "./Loading";

const LastUsers = ({ faNewspaper, faXmark, faUserTie, faUser }) => {
  const [data, setData] = useState();
  console.log("data in LastUsers:", data);
  const [isLoading, setIsLoading] = useState(true);
  console.log("isLoading in LastUsers:", isLoading);
  const navigate = useNavigate();
  const { token, isAdmin } = useUser();
  console.log("isAdmin in LastUsers:", isAdmin);
  console.log("token in LastUsers:", token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAdmin !== false) {
          console.log("isAdmin in LastUsers:", isAdmin);
          const response = await axios.get(
            "https://site--vintaidbackend--s4qnmrl7fg46.code.run/users/",
            // const response = await axios.get("http://localhost:3000/users/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "multipart/form-data",
              },
            }
          );
          console.log("response in LastUsers:", response);
          console.log("response.data in LastUsers:", response.data);
          if (response.data) {
            setData(response.data);
            setIsLoading(false);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("error on catch in LastUsers:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, token]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxLastUsers">
      {data.map((user, key = user.id) => {
        console.log("user:", user);
        return (
          <div className="boxUsers" key={key}>
            <Link to={`/users/${user.id}`}>
              {/* <Link to={`/users/${user.id}`} state={{ token: user.token }}> */}
              <div className="username">{user.username}</div>
              <div className="avatar">
                {user.avatar.secure_url ? (
                  <Image src={user.avatar.secure_url} alt="avatar" />
                ) : (
                  <Image src={user.avatar} alt="avatar" />
                )}
              </div>
              <div className="email">{user.email}</div>
              {user.newsletter === true ? (
                <FontAwesomeIcon icon={faNewspaper} className="news" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="news" />
              )}
              {user.date ? (
                <div className="date">{user.date}</div>
              ) : (
                <div className="date">no date</div>
              )}
              {user.isAdmin === true ? (
                <FontAwesomeIcon icon={faUserTie} className="isAdmin" />
              ) : (
                <FontAwesomeIcon icon={faUser} className="isAdmin" />
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LastUsers;
