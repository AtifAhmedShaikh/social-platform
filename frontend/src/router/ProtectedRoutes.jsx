import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticatedUser = true;
  return (
    <>{isAuthenticatedUser ? <Outlet /> : <Navigate to={"/auth/login"} />}</>
  );
};

export default ProtectedRoutes;
