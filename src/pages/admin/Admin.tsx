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
import {
  CREATE_ROUTES_URI,
  EDIT_ROUTES_PATH,
  VALID_CATEGORIES,
} from "../../utils/constants";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import RegularButton from "../../components/shared/buttons/RegularButton";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const toCreateJob = `${EDIT_ROUTES_PATH}/${CREATE_ROUTES_URI}`;
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
      <div className="create__button__container">
        <p>{t("admin.new_job_intro")}</p>
        <RegularButton
          className="create__button"
          $skin="danger"
          onClick={() => navigate(toCreateJob)}
        >
          {t("admin.create_job")}
        </RegularButton>
      </div>
      {isLoading && <CustomPulseLoader isLoading={isLoading} />}
      {jobsList && jobsList.length > 0 ? (
        VALID_CATEGORIES.map((category) => (
          <div key={category}>
            <h2>{t(`admin.${category}`)}</h2>
            <AdminJobsSection
              jobsList={jobsList}
              category={category}
            />
          </div>
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
