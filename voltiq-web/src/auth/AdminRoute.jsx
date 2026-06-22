import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const location = useLocation();

  if (!userData || !userData.role || userData.role !== "admin") {
    return <Navigate to={`/login`} state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};
