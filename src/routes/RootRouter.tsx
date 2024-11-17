import { Routes, Route, Outlet } from "react-router-dom";
import Bio from "../pages/bio/Bio";
import Development from "../pages/development/Development";
import Job from "../pages/jobExamples/Job";
import Login from "../pages/auth/Login";
import Admin from "../pages/admin/Admin";
import EditJob from "../pages/admin/EditJob";
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

      {/** Private Routes */}
      {/*  <Route
        path="/admin"
        element={<Admin />}
      /> */}
      <Route
        path="/admin"
        element={<Outlet />}
      >
        <Route
          index
          element={<Admin />}
        />
        <Route
          path=":jobId"
          element={<EditJob />}
        />
      </Route>
    </Routes>
  );
};

export default RootRouter;
