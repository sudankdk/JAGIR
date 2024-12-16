import { useNavigate } from "react-router-dom";
import { UseAuth } from "../Context/UseAuth";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { Auth, loading } = UseAuth();

  useEffect(() => {
    if (!Auth && !loading) {
      navigate("/login/");
    }
  }, [Auth, loading, navigate]);

  if (loading) {
    return <p>Loading....</p>; // Show a loading indicator while authentication state is being verified.
  }

  if (Auth) {
    return children; // If authenticated, render the child components.
  }

  // Return null when navigating to avoid rendering anything unnecessary.
  return null;
};

export default PrivateRoute;
