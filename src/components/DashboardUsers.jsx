import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../assets/lib/userFunc";

//components
import Image from "./Image";
import Loading from "./Loading";

//stream
import io from "socket.io-client";

const socket = io("http://localhost:3000");

//lib
import fetchDataAllUsers from "../assets/fetchDataLib/GET/fetchDataAllUsers";

//hookCustom
// import useOnlineStatus from "../hookCustom/useOnlineStatus";

const DashboardUsers = ({
  faNewspaper,
  faXmark,
  faUserTie,
  faUser,
  searchUsers,
}) => {
  // function StatusBar() {
  //   const isOnline = useOnlineStatus();
  //   console.log("isOnline on /home:", isOnline);

  //   return <div>{isOnline ? "✅" : "❌"}</div>;
  // }
  const [data, setData] = useState(null);
  // console.log("data in LastUsers:", data);
  // console.log("searchUsers in LastUsers:", searchUsers);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("isLoading in LastUsers:", isLoading);
  const navigate = useNavigate();
  const { isAdmin, axios } = useUser();
  // console.log("isAdmin in LastUsers:", isAdmin);
  // console.log("token in LastUsers:", token);

  useEffect(() => {
    fetchDataAllUsers(
      isAdmin,
      axios,
      searchUsers,
      setData,
      setIsLoading,
      navigate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, searchUsers]);

  useEffect(() => {
    socket.on("userUpdated", (change) => {
      console.log("change:", change);
      fetchDataAllUsers(
        isAdmin,
        axios,
        searchUsers,
        setData,
        setIsLoading,
        navigate
      );
    });
    return () => socket.off("userUpdated");
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <table className="boxLastUsers">
      <thead>
        <tr>
          <th className="username">Username</th>
          <th className="avatar">Avatar</th>
          <th className="email">Email</th>
          <th className="news">News</th>
          <th className="date">Date</th>
          <th className="isAdmin">Admin</th>
          <th className="isOnline">Online</th>
        </tr>
      </thead>
      {data?.map((user, key = user._id) => {
        // console.log("user in LastUsers:", user);
        return (
          <Link to={`/userId/${user._id}`} className="boxUsers" key={key}>
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
            <div className="isOnline">
              <div>{user?.isOnline === true ? "✅" : "❌"}</div>
            </div>
          </Link>
        );
      })}
    </table>
  );
};

export default DashboardUsers;
