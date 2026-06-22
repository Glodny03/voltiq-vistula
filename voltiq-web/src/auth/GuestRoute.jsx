import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const GuestRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);

  if (userData) {
    return <Navigate to="/" />;
  }

  return children;
};
