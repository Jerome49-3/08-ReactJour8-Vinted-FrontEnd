// import { Outlet } from "react-router-dom";

// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useUser } from "../assets/lib/userFunc";
// const AppLayout = ({
//   showSignUp,
//   setShowSignUp,
//   search,
//   setSearch,
//   showToggleNav,
//   setShowToggleNav,
//   faFilter,
//   setShowFilter,
//   showFilter,
// }) => {
//   const mainLayout = "mainLayout";
//   const scrollHide = "scrollHide";
//   const mainLayoutNoheight = "mainLayoutNoheight";
//   console.log("%cshowSignUp in AppLayout:", "color: yellow", showSignUp);
//   const { dimWindows } = useUser();
//   const width = dimWindows.width;
//   console.log("%cwidth in AppLayout:", "color: yellow", width);
//   return (
//     <>
//       {/* <Header
//         showSignUp={showSignUp}
//         setShowSignUp={setShowSignUp}
//         search={search}
//         setSearch={setSearch}
//         showToggleNav={showToggleNav}
//         setShowToggleNav={setShowToggleNav}
//         faFilter={faFilter}
//         showFilter={showFilter}
//         setShowFilter={setShowFilter}
//       /> */}
//       <main
//         className={`${
//           showSignUp ? `${scrollHide} ${mainLayout}` : `${mainLayout}`
//         } ${width > 768 ? "" : `${mainLayoutNoheight}`}`}
//       >
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default AppLayout;
