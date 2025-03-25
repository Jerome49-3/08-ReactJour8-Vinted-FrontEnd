/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
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
          <div className="boxTitleLinksDashboard">
            <TitleSearch
              title="Users"
              valueStr={searchUsers}
              setStateStr={setSearchUsers}
              txtPlaceholder="search by name or email"
            />
            <Links path="/dashboard/dashUsers" linkText="Dashboard Users" />
          </div>
          <div className="boxTitleLinksDashboard">
            <TitleSearch
              title="Offers"
              valueStr={searchOffer}
              setStateStr={setSearchOffer}
              txtPlaceholder="search by name or id"
            />
            <Links path="/dashboard/dashOffers" linkText="Dashboard Offers" />
          </div>
          <div className="boxTitleLinksDashboard">
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
          <div className="boxTitleLinksDashboard">
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
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Dashboard;
