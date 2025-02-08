import { Navigate } from "react-router-dom";

//context
import { useUser } from "../assets/lib/userFunc";

//components
import LastUsers from "../components/LastUsers";
import LastSales from "../components/LastSales";

const Dashboard = ({ faNewspaper, faXmark, faUserTie, faUser }) => {
  const { token, isAdmin } = useUser();
  console.log("isAdmin in Dashboard:", isAdmin);
  console.log("token in Dashboard:", token);

  return token && isAdmin ? (
    <div className="boxDashboard">
      <div className="wrapper">
        <div className="top">
          <div className="left">
            <div className="title">
              <h2>Users</h2>
            </div>
            <div className="boxDetails">
              <LastUsers
                faNewspaper={faNewspaper}
                faXmark={faXmark}
                faUserTie={faUserTie}
                faUser={faUser}
              />
            </div>
          </div>
          <div className="right">
            <div className="title">
              <h2>Dernières annonces</h2>
            </div>
            <div className="boxDetails"></div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="title">
              <h2>Ventes</h2>
            </div>
            <div className="boxDetails">
              <LastSales />
            </div>
          </div>
          <div className="right">
            <div className="title">
              <h2>Derniers litiges</h2>
            </div>
            <div className="boxDetails"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Dashboard;
