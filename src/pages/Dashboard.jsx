import { Navigate, } from 'react-router-dom';
import { useContext } from 'react';
import LastUsers from '../components/LastUsers';
import { UserContext } from "../context/UserProvider";


const Dashboard = ({ faNewspaper, faXmark, faUserTie, faUser }) => {
  const { token, isAdmin } = useContext(UserContext);

  return (token && isAdmin) ? (
    <div className='boxDashboard'>
      <div className="wrapper">
        <div className="title">
          <h1>Dashboard</h1>
        </div>
        <div className="top">
          <div className="left">
            <div className="title">
              <h2>Users</h2>
            </div>
            <div className="boxDetails">
              <LastUsers token={token} isAdmin={isAdmin} faNewspaper={faNewspaper} faXmark={faXmark} faUserTie={faUserTie} faUser={faUser} />
            </div>
          </div>
          <div className="right">
            <div className="title">
              <h2>Dernières annonces</h2>
            </div>
            <div className="boxDetails">

            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="title">
              <h2>Dernieres ventes</h2>
            </div>
            <div className="boxDetails">

            </div>
          </div>
          <div className="right">
            <div className="title">
              <h2>Derniers litiges</h2>
            </div>
            <div className="boxDetails">

            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <Navigate to="/login" />
}

export default Dashboard