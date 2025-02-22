import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/UseAuth";

interface PrivateRouteProps {
  element: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};
