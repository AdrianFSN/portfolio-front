import { Routes, Route } from "react-router-dom";
import Bio from "../pages/bio/Bio";
import JobExamplesList from "../pages/jobExamples/JobExamplesList";
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
        element={<JobExamplesList category="development" />}
      />
    </Routes>
  );
};

export default RootRouter;
