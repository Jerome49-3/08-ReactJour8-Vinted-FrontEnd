import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = ({
  showSignUp,
  setShowSignUp,
  search,
  setSearch,
  showToggleNav,
  setShowToggleNav,
  faFilter,
  setShowFilter,
  showFilter,
}) => {
  return (
    <>
      <Header
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
        search={search}
        setSearch={setSearch}
        showToggleNav={showToggleNav}
        setShowToggleNav={setShowToggleNav}
        faFilter={faFilter}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      <main className="mainLayout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
