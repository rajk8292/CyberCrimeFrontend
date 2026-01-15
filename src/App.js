import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import HomePage from "./components/Home";
import Login from "./components/login";
import ComplaintRegistration from "./components/ComplaintRegistration";
import ComplaintStatus from "./components/ComplaintStatus";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import AddCase from "./components/AddCase";
import CaseList from "./components/CaseList";
import CaseDetails from "./components/CaseDetails";
import ComplaintList from "./components/ComplaintList";
import StatesPage from "./components/Dashboard/StatesPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [dashboardPage, setDashboardPage] = useState("states");
  const [userRole, setUserRole] = useState(null);

  // Fetch all cases
  useEffect(() => {
    fetch("http://localhost:8080/api/cases")
      .then((res) => res.json())
      .then((data) => setCases(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    setPage(role === "admin" ? "dashboard" : "home");
  };

  return (
    <div>
      <Navbar setPage={setPage} />

      {/* Public Pages */}
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "login" && <Login onLoginSuccess={handleLogin} />}
      {page === "register" && <ComplaintRegistration />}
      {page === "status" && <ComplaintStatus />}

      {/* Admin Dashboard */}
      {page === "dashboard" && userRole === "admin" && (
        <AdminDashboard
          setPage={setPage}
          dashboardPage={dashboardPage}
          setDashboardPage={setDashboardPage}
        >
          {dashboardPage === "states" && <StatesPage cases={cases} />}

          {dashboardPage === "add-case" && (
            <AddCase setCases={setCases} />
          )}

         {dashboardPage === "all-cases" && (
  <CaseList
    cases={cases}
    setCases={setCases}   // 🔥 pass this
    onEdit={(id) => {
      setSelectedCase(id);
      setDashboardPage("case-details");
    }}
  />
)}
          {dashboardPage === "complaints" && <ComplaintList />}
        </AdminDashboard>
      )}
    </div>
  );
}
