import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from 'react';

const PrivateAdmRoute = () => {
  const { user } = useContext(UserContext);
  if (!user && !user.token && !user.isAdmin === true) return <Navigate to='/login' />
  return <Outlet />;
};

export default PrivateAdmRoute