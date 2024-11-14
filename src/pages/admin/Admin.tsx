import { useDispatch, useSelector } from "react-redux";
import "./Admin.css";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
import {
  getJobExamplesListSelector,
  getJobsListErrorSelector,
  getJobsListLoadingSelector,
} from "../../store/selectors/selectors";
import AdminJobsSection from "./AdminJobsSection";
import { VALID_CATEGORIES } from "../../utils/constants";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";

const Admin = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const jobsList = useSelector(getJobExamplesListSelector);
  const limit = "1000";
  const isLoading = useSelector(getJobsListLoadingSelector);
  const error = useSelector(getJobsListErrorSelector);

  useEffect(() => {
    dispatch(getJobExamplesListThunk({ limit: limit }));
  }, [dispatch]);

  return (
    <main className="main__admin">
      <h1>{t("admin.title")}</h1>
      {isLoading && <CustomPulseLoader isLoading={isLoading} />}
      {jobsList && jobsList.length > 0 ? (
        VALID_CATEGORIES.map((category) => (
          <>
            <h2>{t(`admin.${category}`)}</h2>
            <AdminJobsSection
              jobsList={jobsList}
              category={category}
            />
          </>
        ))
      ) : (
        <div>{t("generic.empty_section")}</div>
      )}
      {error && <p>{error}</p>}
      Aquí tienen que ir varias listas de jobs separadas por categorías. A esta
      página solo se puede acceder si estás logueado
    </main>
  );
};

export default Admin;
