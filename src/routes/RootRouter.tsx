import { Routes, Route } from "react-router-dom";
import Bio from "../pages/bio/Bio";
const RootRouter = () => {
  return (
    <Routes>
      {/** Public Routes */}
      <Route
        path="/"
        element={<Bio />}
      />
    </Routes>
  );
};

export default RootRouter;
