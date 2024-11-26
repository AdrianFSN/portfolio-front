import { Routes, Route, Outlet, Navigate } from "react-router-dom";
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
import {
  ABOUT_ME_ROUTES_PATH,
  AUDIOS_ROUTES_URI,
  AUTH_ROUTES_PATH,
  CREATE_ROUTES_URI,
  DEVELOPMENT_ROUTES_PATH,
  EDIT_ROUTES_PATH,
  JOB_ROUTES_URI,
  PICTURES_ROUTES_URI,
  VERSION_ROUTES_URI,
  VIDEOS_ROUTES_URI,
} from "../utils/constants";
import CreateJob from "../pages/admin/CreateJob";
import RequireAuth from "../components/RequireAuth";
import NotFound from "../components/shared/NotFound";
const RootRouter = () => {
  return (
    <Routes>
      {/** Public Routes */}
      <Route
        path={ABOUT_ME_ROUTES_PATH}
        element={<Bio />}
      />
      <Route
        path={DEVELOPMENT_ROUTES_PATH}
        element={<Development category="development" />}
      />
      <Route
        path={`/${JOB_ROUTES_URI}/:id`}
        element={<Job />}
      />
      <Route
        path={AUTH_ROUTES_PATH}
        element={<Login />}
      />

      <Route
        path="/404"
        element={<NotFound />}
      />
      <Route
        path="*"
        element={<Navigate to="/404" />}
      />

      {/** Private Routes */}
      <Route
        path={EDIT_ROUTES_PATH}
        element={
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        }
      >
        <Route
          index
          element={<Admin />}
        />
        <Route
          path={CREATE_ROUTES_URI}
          element={<CreateJob />}
        />
        <Route
          path={`${JOB_ROUTES_URI}/:jobId`}
          element={<EditJob />}
        />
        <Route
          path={`${JOB_ROUTES_URI}/:jobId/${VERSION_ROUTES_URI}/:versionId`}
          element={<EditJobVersions />}
        />
        <Route
          path={`${JOB_ROUTES_URI}/:jobId/${PICTURES_ROUTES_URI}/:collectionId`}
          element={<EditJobPictures />}
        />
        <Route
          path={`${JOB_ROUTES_URI}/:jobId/${VIDEOS_ROUTES_URI}/:collectionId`}
          element={<EditJobVideos />}
        />
        <Route
          path={`${JOB_ROUTES_URI}/:jobId/${AUDIOS_ROUTES_URI}/:collectionId`}
          element={<EditJobAudios />}
        />
      </Route>
    </Routes>
  );
};

export default RootRouter;
