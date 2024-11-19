import { Routes, Route, Outlet } from "react-router-dom";
import Bio from "../pages/bio/Bio";
import Development from "../pages/development/Development";
import Job from "../pages/jobExamples/Job";
import Login from "../pages/auth/Login";
import Admin from "../pages/admin/Admin";
import EditJob from "../pages/admin/EditJob";
import EditJobVersions from "../pages/admin/EditJobVersions";
import EditJobPictures from "../pages/admin/EditJobPictures";
import EditJobVideos from "../pages/admin/EditJobVideos";
import EditJobAudios from "../pages/admin/EditJobAudios";
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
        path="/job/:id"
        element={<Job />}
      />
      <Route
        path="/session"
        element={<Login />}
      />

      {/** Private Routes */}
      <Route
        path="/edit"
        element={<Outlet />}
      >
        <Route
          index
          element={<Admin />}
        />
        <Route
          path="job/:jobId"
          element={<EditJob />}
        />
        <Route
          path="job/:jobId/version/:versionId"
          element={<EditJobVersions />}
        />
        <Route
          path="job/:jobId/pictures/:collectionId"
          element={<EditJobPictures />}
        />
        <Route
          path="job/:jobId/videos/:collectionId"
          element={<EditJobVideos />}
        />
        <Route
          path="job/:jobId/audios/:collectionId"
          element={<EditJobAudios />}
        />
      </Route>
    </Routes>
  );
};

export default RootRouter;
