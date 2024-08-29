import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from 'react';

const PrivateRoute = () => {
  const { token } = useContext(UserContext);
  if (!token) return <Navigate to='/login' />
  return <Outlet />;
};

export default PrivateRoute