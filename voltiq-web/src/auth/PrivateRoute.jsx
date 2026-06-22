import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const location = useLocation();

  if (!userData) {
    return <Navigate to={`/login`} state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};
