import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from "./Image";
import Loading from "./Loading"

const LastUsers = ({ token, isAdmin, faNewspaper, faXmark, faUserTie, faUser }) => {
  // console.log('isAdmin in LastUsers:', isAdmin);

  const [data, setData] = useState();
  console.log('data in LastUsers:', data);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAdmin !== false) {
          console.log('isAdmin in LastUsers:', isAdmin);
          const response = await axios.get('http://localhost:3000/users/',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "multipart/form-data"
              }
            }
          );
          console.log('response in LastUsers:', response);
          console.log('response.data in LastUsers:', response.data);
          if (response) {
            setData(response.data);
            setIsLoading(false);
          }
        }
        else {
          navigate('/login')
        }
      } catch (error) {
        console.log('error on catch in LastUsers:', error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, token])


  return isLoading ? (<Loading />) : (
    <div className='boxLastUsers'>
      {data.map((user, key = user.id) => {
        console.log('user:', user);
        return (
          <div className="boxUsers" key={key}>
            <Link to={`/users/${user.id}`} state={{ token: user.token }}>
              <div className="username">{user.username}</div>
              <div className="avatar">
                {user.avatar.secure_url ? (<Image src={user.avatar.secure_url} alt='avatar' />) : (<Image src={user.avatar} alt='avatar' />)}
              </div>
              <div className="email">{user.email}</div>
              {user.newsletter === true ? (<FontAwesomeIcon icon={faNewspaper} className="news" />) : (<FontAwesomeIcon icon={faXmark} className="news" />)}
              {user.date ? (<div className="date">{user.date}</div>) : (<div className="date">no date</div>
              )}
              {user.isAdmin === true ? (<FontAwesomeIcon icon={faUserTie} className="isAdmin" />) : (<FontAwesomeIcon icon={faUser} className="isAdmin" />)}
            </Link>
          </div>
        )
      })}
    </div >
  )
}

export default LastUsers