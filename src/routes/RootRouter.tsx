import { Routes, Route } from "react-router-dom";
import Bio from "../pages/bio/Bio";
import Development from "../pages/development/Development";
import Job from "../pages/jobExamples/Job";
import Login from "../pages/auth/Login";
const RootRouter = () => {
  return (
    <Routes>
      {/** Public Routes */}
      <Route
        path="/bio"
        element={<Bio />}
      />
      <Route
        path="/development"
        element={<Development category="development" />}
      />
      <Route
        path="/:id"
        element={<Job />}
      />
      <Route
        path="/session"
        element={<Login />}
      />
    </Routes>
  );
};

export default RootRouter;
