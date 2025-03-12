/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
//context
import { useUser } from "../assets/lib/userFunc";
//components
import TitleSearch from "../components/TitleSearch";
import Links from "../components/Links";

const Dashboard = ({
  searchUsers,
  setSearchUsers,
  searchOffer,
  setSearchOffer,
  searchTransactions,
  setSearchTransactions,
  numberCommand,
  setNumberCommand,
  searchMessage,
  setSearchMessage,
}) => {
  const { token, isAdmin } = useUser();

  // const [searchPrice, setSearchPrice] = useState("");
  // console.log("searchPrice in Dashboard:", searchPrice);

  // console.log("isAdmin in Dashboard:", isAdmin);
  // console.log("token in Dashboard:", token);

  return token && isAdmin ? (
    <div className="boxDashboard">
      <div className="wrapper">
        <div className="leftPannel">
          <div>
            <TitleSearch
              title="Users"
              valueStr={searchUsers}
              setStateStr={setSearchUsers}
              txtPlaceholder="search by name or email"
            />
            <Links path="/dashboard/dashUsers" linkText="Dashboard Users" />
          </div>
          <div>
            <TitleSearch
              title="Offers"
              valueStr={searchOffer}
              setStateStr={setSearchOffer}
              txtPlaceholder="search by name or id"
            />
            <Links path="/dashboard/dashOffers" linkText="Dashboard Offers" />
          </div>
          <div>
            <TitleSearch
              title="Sales"
              valueStr={searchTransactions}
              setStateStr={setSearchTransactions}
              txtPlaceholder="search by name"
              txtNumber="by n° command"
              valueNum={numberCommand}
              setStateNum={setNumberCommand}
            />
            <Links path="/dashboard/dashSales" linkText="Dashboard Sales" />
          </div>
          <div>
            <TitleSearch
              title="Contact messages"
              value={searchMessage}
              setState={setSearchMessage}
              txtPlaceholder="search by name or id"
            />
            <Links
              path="/dashboard/dashMessages"
              linkText="Dashboard Messages"
            />
          </div>
        </div>
        <div className="rightOutlet">
          <Outlet />
        </div>
        {/* <div className="top">
          <div className="left">
            <TitleSearch
              title="Users"
              valueStr={searchUsers}
              setStateStr={setSearchUsers}
              txtPlaceholder="search by name or email"
            />
            <div className="boxDetails">
              <DashboardUsers
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
              title="Offers"
              valueStr={searchOffer}
              setStateStr={setSearchOffer}
              txtPlaceholder="search by name or id"
            />
            <div className="boxDetails">
              <DashboardOffers faTrash={faTrash} />
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <TitleSearch
              title="Transactions"
              valueStr={searchTransactions}
              setStateStr={setSearchTransactions}
              txtPlaceholder="search by name"
              txtNumber="by n° command"
              valueNum={numberCommand}
              setStateNum={setNumberCommand}
            />

            <div className="boxDetails">
              <DashboardSales
                searchTransactions={searchTransactions}
                numberCommand={numberCommand}
              />
            </div>
          </div>
          <div className="right">
            <TitleSearch
              title="Contact messages"
              value={searchMessage}
              setState={setSearchMessage}
              txtPlaceholder="search by name or id"
            />

            <div className="boxDetails">
              <DashboardMessages />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Dashboard;
