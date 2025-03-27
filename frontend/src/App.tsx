import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign from "./Pages/Signup";
import DashboardJS from "./Pages/DashboardJS";
import Application from "./Components/Application";
import Bookmarks from "./Components/Bookmark";
import { AuthProvider } from "./context/UseAuth";
import { PrivateRoute } from "./private/PrivateRoute.js";
import JobDescription from "./Pages/JobDescription.js";
import DashboardJG from "./Pages/DashboardJG.js";
import JobApplicant from "./Pages/JobApplicant.js";
import Profile from "./Pages/Profile.js";
import Job from "./Pages/Job.js";
import JobPostingForm from "./Components/PostJob.js";
import JGApplication from "./Pages/JGApplication.js";
import NotificationSend from "./Notifications/Notifications.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Sign />} />
          <Route
            path="/Dashboard"
            element={<PrivateRoute element={<DashboardJS />} />}
          />
          <Route
            path="/Dashboard/application"
            element={<PrivateRoute element={<Application />} />}
          />
          <Route
            path="/Dashboard/bookmarks"
            element={<PrivateRoute element={<Bookmarks />} />}
          />
          <Route path="/job/description" element={<JobDescription />} />

          {/* yes lai authorize ganai xa*/}
          <Route path="/JG/dashboard" element={<DashboardJG />} />
          <Route path="/JG/applicant" element={<JobApplicant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/job/:id" element={<Job />} />
          <Route path="/job/post" element={<JobPostingForm />} />
          <Route path="/jobs" element={<JGApplication />} />
          <Route path="/notifications" element={<NotificationSend />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
