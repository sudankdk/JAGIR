import { useContext, useState, createContext, ReactNode } from "react";

interface User {
  username: string;
}
interface AuthContextType {
  user: User | null;
  auth_login: (userData: User) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("username");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const auth_login = (userData: User) => {
    localStorage.setItem("username", JSON.stringify(userData)); 
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, auth_login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
