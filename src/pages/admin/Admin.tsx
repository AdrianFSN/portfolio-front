import { useDispatch, useSelector } from "react-redux";
import "./Admin.css";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
import { getJobExamplesListSelector } from "../../store/selectors/selectors";
import AdminJobsSection from "./AdminJobsSection";

const Admin = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const jobsList = useSelector(getJobExamplesListSelector);
  const limit = "1000";

  useEffect(() => {
    dispatch(getJobExamplesListThunk({ limit: limit }));
  }, [dispatch]);

  return (
    <main className="main__admin">
      <h1>{t("admin.title")}</h1>
      <h2>{t("admin.development")}</h2>
      <AdminJobsSection
        jobsList={jobsList}
        category="development"
      />
      <h2>{t("admin.audio")}</h2>
      <AdminJobsSection
        jobsList={jobsList}
        category="audio"
      />
      <h2>{t("admin.liveOps")}</h2>
      <AdminJobsSection
        jobsList={jobsList}
        category="liveOps"
      />
      Aquí tienen que ir varias listas de jobs separadas por categorías. A esta
      página solo se puede acceder si estás logueado
    </main>
  );
};

export default Admin;
