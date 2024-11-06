import { Routes, Route } from "react-router-dom";
import Bio from "../pages/bio/Bio";
import Development from "../pages/development/Development";
import JobDetail from "../pages/jobExamples/JobDetail";
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
        element={<JobDetail jobId="6728ac9868aab87668d8239e" />}
      />
    </Routes>
  );
};

export default RootRouter;
