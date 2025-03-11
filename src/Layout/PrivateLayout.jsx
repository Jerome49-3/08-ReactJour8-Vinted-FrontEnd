import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../assets/lib/userFunc";

const PrivateLayout = () => {
  const { token } = useUser();
  if (!token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateLayout;
