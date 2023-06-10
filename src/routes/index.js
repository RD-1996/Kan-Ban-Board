import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Login = React.lazy(() => import("../pages/login"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Register = React.lazy(() => import("../pages/register"));
const TaskManager = React.lazy(() => import("../pages/taskManager"));

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/tasks" element={<TaskManager />} />
      </Routes>
    </Router>
  );
};

export default Routing;
