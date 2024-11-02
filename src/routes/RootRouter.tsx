import { Routes, Route } from "react-router-dom";
import Bio from "../pages/bio/Bio";
import Development from "../pages/development/Development";
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
    </Routes>
  );
};

export default RootRouter;
