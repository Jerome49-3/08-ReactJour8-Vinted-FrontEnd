import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../assets/lib/userFunc";

//components
import Image from "./Image";
import Loading from "./Loading";

const LastUsers = ({
  faNewspaper,
  faXmark,
  faUserTie,
  faUser,
  searchUsers,
}) => {
  const [data, setData] = useState();
  // console.log("data in LastUsers:", data);
  // console.log("searchUsers in LastUsers:", searchUsers);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("isLoading in LastUsers:", isLoading);
  const navigate = useNavigate();
  const { isAdmin, axios } = useUser();
  // console.log("isAdmin in LastUsers:", isAdmin);
  // console.log("token in LastUsers:", token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAdmin !== false) {
          // console.log("isAdmin in LastUsers:", isAdmin);
          // const response = await axios.get(
          //   "https://site--vintaidbackend--s4qnmrl7fg46.code.run/users/",
          const response = await axios.get(
            `http://localhost:3000/users?title=${searchUsers}`
          );
          // console.log("response in LastUsers:", response);
          // console.log("response.data in LastUsers:", response.data);
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
  }, [isAdmin, searchUsers]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxLastUsers">
      {data.map((user, key = user.id) => {
        // console.log("user in LastUsers:", user);
        return (
          <div className="boxUsers" key={key}>
            <Link to={`/userId/${user.id}`}>
              <div className="username">{user?.account?.username}</div>
              <div className="avatar">
                {user?.account?.avatar?.secure_url ? (
                  <Image src={user?.account?.avatar?.secure_url} alt="avatar" />
                ) : (
                  <Image src={user?.account?.avatar} alt="avatar" />
                )}
              </div>
              <div className="email">{user?.email}</div>
              {user.newsletter === true ? (
                <FontAwesomeIcon icon={faNewspaper} className="news" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="news" />
              )}
              {user.date ? (
                <div className="date">{user?.date}</div>
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
