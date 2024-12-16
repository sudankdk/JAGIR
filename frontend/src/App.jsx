import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./Component/Layout";
import Login from "./Routes/Login";
import Navbar from "./Component/Navbar";
import Register from "./Routes/Register";
import UserProfile from "./Routes/UserProfile";
import CreateJob from "./Routes/CreateJob";
import { AuthProvider } from "./Context/UseAuth";
import PrivateRoute from "./Component/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Route for login */}
          <Route path="/login" element={<Login />} />

          {/* Route for user profile */}
          <Route
            path="/:username"
            element={
              <PrivateRoute>
                <Layout left={<Navbar />} right={<UserProfile />} />
              </PrivateRoute>
            }
          />

          {/* Route for registration */}
          <Route path="/register" element={<Register />} />

          {/* Route for create job */}
          <Route
            path="/jobs/create/:username"
            element={<Layout left={<Navbar />} right={<CreateJob />} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
