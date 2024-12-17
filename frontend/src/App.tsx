import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign from "./Pages/Signup";
import DashboardJS from "./Pages/DashboardJS";
import Application from "./Components/Application";
import Bookmarks from "./Components/Bookmark";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/Dashboard" element={<DashboardJS />} />
        <Route path="/Dashboard/application" element={<Application />} />
        <Route path="/Dashboard/bookmarks" element={<Bookmarks />} />
      </Routes>
    </Router>
  );
}

export default App;
