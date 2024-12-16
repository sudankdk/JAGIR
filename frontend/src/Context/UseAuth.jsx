import { useEffect, useState, createContext, useContext } from "react";
import { get_auth, login } from "../api/EndPoints";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const checkAuth = async () => {
    try {
      await get_auth();
      setAuth(true);
    } catch (error) {
      setAuth(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const authLogin = async (username, password) => {
    try {
      const data = await login(username, password);
      if (data.success) {
        setAuth(true);
        
        navigate(`/${username}`);
      } else {
        console.log("ya error bala code ma janxa");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login. Please try again.");
    }
    console.log("Logging in with:", { username, password });
  };

  useEffect(() => {
    checkAuth();
  }, [window.location.pathname]);
  return (
    <AuthContext.Provider value={{ Auth, loading, authLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
