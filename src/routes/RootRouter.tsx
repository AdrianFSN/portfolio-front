import React, { Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Bio from "../pages/bio/Bio";
import Job from "../pages/jobExamples/Job";
import Login from "../pages/auth/Login";
const Admin = React.lazy(() => import("../pages/admin/Admin"));
const CreateJob = React.lazy(() => import("../pages/admin/CreateJob"));
const EditJob = React.lazy(() => import("../pages/admin/EditJob"));
const EditJobVersions = React.lazy(
  () => import("../pages/admin/EditJobVersions"),
);
const EditJobPictures = React.lazy(
  () => import("../pages/admin/EditJobPictures"),
);
const EditJobVideos = React.lazy(() => import("../pages/admin/EditJobVideos"));
const EditJobAudios = React.lazy(() => import("../pages/admin/EditJobAudios"));
const MessagesList = React.lazy(() => import("../pages/admin/GetMessages"));

import {
  ABOUT_ME_ROUTES_PATH,
  AUDIO_ROUTES_PATH,
  AUDIOS_ROUTES_URI,
  AUTH_ROUTES_PATH,
  CONTACT_ROUTES_PATH,
  CREATE_ROUTES_URI,
  DESIGN_ROUTES_PATH,
  DEVELOPMENT_ROUTES_PATH,
  EDIT_ROUTES_PATH,
  JOB_ROUTES_URI,
  LIVEOPS_ROUTES_PATH,
  MESSAGES_ROUTES_PATH,
  PHOTOGRAPHY_ROUTES_PATH,
  PICTURES_ROUTES_URI,
  VALID_CATEGORIES,
  VERSION_ROUTES_URI,
  VIDEO_ROUTES_PATH,
  VIDEOS_ROUTES_URI,
  WRITING_ROUTES_PATH,
} from "../utils/constants";
import RequireAuth from "../components/RequireAuth";
import NotFound from "../components/shared/NotFound";
import PortfolioSubject from "../pages/PortfolioSubject/PortfolioSubject";
import CreateNewMessage from "../pages/contact/ContactForm";
import CustomPulseLoader from "../components/shared/spinner/CustomPulseLoader";
import Home from "../pages/home/Home";
import Layout from "../components/Layout";

const subjectsPaths = [
  DEVELOPMENT_ROUTES_PATH,
  AUDIO_ROUTES_PATH,
  LIVEOPS_ROUTES_PATH,
  DESIGN_ROUTES_PATH,
  PHOTOGRAPHY_ROUTES_PATH,
  VIDEO_ROUTES_PATH,
  WRITING_ROUTES_PATH,
];

const RootRouter = () => {
  return (
    <Suspense
      fallback={
        <CustomPulseLoader
          isLoading={true}
          $customWidth="100vw"
          $customHeight="100vh"
        />
      }
    >
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          {/** Public Routes */}
          <Route
            path={ABOUT_ME_ROUTES_PATH}
            element={<Bio />}
          />

          <Route
            path="/prueba-eekox"
            element={
              <iframe
                src="https://eekox.com/search"
                title="Buscador de Eekox"
                style={{
                  display: "block",
                  width: "100%",
                  height: "85vh",
                  border: 0,
                }}
              />
            }
          />

          <Route
            path={CONTACT_ROUTES_PATH}
            element={<CreateNewMessage />}
          />

          {VALID_CATEGORIES.map((category, index) => {
            const path = subjectsPaths[index];
            return (
              path && (
                <Route
                  key={category}
                  path={path}
                  element={<PortfolioSubject category={category} />}
                />
              )
            );
          })}

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
          <Route
            path={MESSAGES_ROUTES_PATH}
            element={
              <RequireAuth>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route
              index
              element={<MessagesList />}
            />
          </Route>
        </Route>
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
