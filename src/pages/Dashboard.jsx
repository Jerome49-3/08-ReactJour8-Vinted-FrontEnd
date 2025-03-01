/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
//context
import { useUser } from "../assets/lib/userFunc";
//components
import LastUsers from "../components/LastUsers";
import LastSales from "../components/LastSales";
import TitleSearch from "../components/TitleSearch";

const Dashboard = ({ faNewspaper, faXmark, faUserTie, faUser }) => {
  const { token, isAdmin } = useUser();
  const [searchUsers, setSearchUsers] = useState("");
  const [searchTransactions, setSearchTransactions] = useState("");
  console.log("searchTransactions in Dashboard:", searchTransactions);
  // const [searchPrice, setSearchPrice] = useState("");
  // console.log("searchPrice in Dashboard:", searchPrice);
  const [numberCommand, setNumberCommand] = useState("");
  console.log("numberCommand in Dashboard:", numberCommand);
  const [searchOffer, setSearchOffer] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  // console.log("isAdmin in Dashboard:", isAdmin);
  // console.log("token in Dashboard:", token);

  return token && isAdmin ? (
    <div className="boxDashboard">
      <div className="wrapper">
        <div className="top">
          <div className="left">
            <TitleSearch
              title="Users"
              valueStr={searchUsers}
              setStateStr={setSearchUsers}
              txtPlaceholder="search by name or email"
            />
            <div className="boxDetails">
              <LastUsers
                faNewspaper={faNewspaper}
                faXmark={faXmark}
                faUserTie={faUserTie}
                faUser={faUser}
                searchUsers={searchUsers}
              />
            </div>
          </div>
          <div className="right">
            <TitleSearch
              title="Annonces"
              valueStr={searchOffer}
              setStateStr={setSearchOffer}
              txtPlaceholder="search by name or id"
            />
            <div className="boxDetails"></div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <TitleSearch
              title="Ventes"
              valueStr={searchTransactions}
              setStateStr={setSearchTransactions}
              txtPlaceholder="search by name"
              txtNumber="by n° command"
              valueNum={numberCommand}
              setStateNum={setNumberCommand}
            />

            <div className="boxDetails">
              <LastSales
                searchTransactions={searchTransactions}
                numberCommand={numberCommand}
              />
            </div>
          </div>
          <div className="right">
            <TitleSearch
              title="Messages"
              value={searchMessage}
              setState={setSearchMessage}
              txtPlaceholder="search by name or id"
            />

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
