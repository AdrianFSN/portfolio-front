import { useEffect, useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import { EDIT_ROUTES_PATH, VALID_CATEGORIES } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetailSelector } from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";
import { AppDispatch } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import { AxiosError } from "axios";
import { updateJobBasics } from "./adminService";
import StandardResponseInterface from "../../@types/StandardResponse";
import extractErrorMessage from "../../utils/extractErrorMessage";

const EditJob = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const toEditPage = EDIT_ROUTES_PATH;
  const job = useSelector(getJobDetailSelector);
  const [toLocalizeJob, setToLocalizeJob] = useState("");
  const [toEditJobImages, setToEditJobImages] = useState("");
  const [toEditJobVideos, setToEditJobVideos] = useState("");
  const [toEditJobAudios, setToEditJobAudios] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  interface TextDataInterface {
    launchPeriod: string;
    linkToUrl: string;
    linkToGitHub: string;
    category: string[];
  }
  const [textData, setTextData] = useState<TextDataInterface>({
    launchPeriod: "",
    linkToUrl: "",
    linkToGitHub: "",
    category: [],
  });

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    if (job) {
      setToLocalizeJob(
        `${EDIT_ROUTES_PATH}/job/${job._id}/version/${job.versions[0]._id}`
      );
      setToEditJobImages(
        `${EDIT_ROUTES_PATH}/job/${job._id}/pictures/${job.pictures._id}`
      );
      setToEditJobVideos(
        `${EDIT_ROUTES_PATH}/job/${job._id}/videos/${job.videos._id}`
      );
      setToEditJobAudios(
        `${EDIT_ROUTES_PATH}/job/${job._id}/audios/${job.audios._id}`
      );
    }
  }, [job]);

  useEffect(() => {
    if (job) {
      setTextData((prevData) => ({
        ...prevData,
        launchPeriod: job.launchPeriod || "",
        linktoUrl: job.linkToUrl || "",
        linkToGitHub: job.linkToGitHub || "",
        category: job.category || [],
      }));
    }
  }, [job]);

  const handleTextOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = event.target;

    if (event.target instanceof HTMLSelectElement) {
      const selectedValues = Array.from(event.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setTextData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedValues,
      }));
    } else {
      setTextData((prevFormData) => ({
        ...prevFormData,
        [name]: event.target.value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await updateJobBasics(job._id, textData);
      setAlertMessage(
        (response as unknown as StandardResponseInterface).message
      );
      setError(null);
    } catch (error) {
      setError(error as AxiosError);
      setAlertMessage(extractErrorMessage(error, t));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!error) {
      setAlertMessage("");
      navigate(toEditPage);
    } else {
      setAlertMessage("");
    }
  };

  const handleToEditPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(toEditPage);
  };

  return (
    <main className="edit__job__form">
      <h1>{t("admin.edit_job")}</h1>
      {alertMessage && (
        <CustomAlert
          type={error ? "error" : "success"}
          onClick={handleCloseAlert}
        >
          {alertMessage}
        </CustomAlert>
      )}
      {job && (
        <>
          <h2>{job.versions[0].title}</h2>
          <div className="job__edit__navigate__links">
            <p onClick={() => navigate(toLocalizeJob)}>
              {t("admin.edit_job_version")}
            </p>
            <p onClick={() => navigate(toEditJobImages)}>
              {t("admin.edit_job_pictures")}
            </p>
            <p onClick={() => navigate(toEditJobVideos)}>
              {t("admin.edit_job_videos")}
            </p>
            <p onClick={() => navigate(toEditJobAudios)}>
              {t("admin.edit_job_audios")}
            </p>
          </div>
          <form
            className="job__form"
            noValidate
            onSubmit={handleSubmit}
          >
            <fieldset className="form__fieldset">
              <legend>
                <h3>{t("admin.context_info")}</h3>
              </legend>
              <div className="form__fieldset__field">
                <label
                  className="form__label"
                  htmlFor="launchPeriod"
                >
                  <h4>{t("admin.launch_period")}</h4>
                </label>
                <input
                  className="form__input"
                  type="text"
                  value={textData.launchPeriod}
                  onChange={handleTextOnChange}
                  name="launchPeriod"
                  id="launchPeriod"
                  placeholder={
                    job.launchPeriod
                      ? job.launchPeriod
                      : t("admin.launch_period")
                  }
                />
              </div>

              <div className="form__fieldset__field">
                <label
                  className="form__label"
                  htmlFor="linkToUrl"
                >
                  <h4>{t("admin.link_to_url")}</h4>
                </label>
                <input
                  className="form__input"
                  type="text"
                  value={textData.linkToUrl}
                  onChange={handleTextOnChange}
                  name="linkToUrl"
                  id="linkToUrl"
                  placeholder={
                    job.linkToUrl ? job.linkToUrl : t("admin.link_to_url")
                  }
                />
              </div>
              <div className="form__fieldset__field">
                <label
                  className="form__label"
                  htmlFor="linkToGitHub"
                >
                  <h4>{t("admin.link_to_github")}</h4>
                </label>
                <input
                  className="form__input"
                  type="text"
                  value={textData.linkToGitHub}
                  onChange={handleTextOnChange}
                  name="linkToGitHub"
                  id="linkToGitHub"
                  placeholder={
                    job.linkToGitHub
                      ? job.linkToGitHub
                      : t("admin.link_to_github")
                  }
                />
              </div>
            </fieldset>
            <fieldset className="form__fieldset">
              <legend>
                <h3>{t("admin.job_type")}</h3>
              </legend>
              <div className="form__fieldset__field">
                <label
                  className="form__label"
                  htmlFor="category"
                >
                  <h4>{t("admin.category")}</h4>
                </label>
                <select
                  className="form__select"
                  value={textData.category}
                  onChange={handleTextOnChange}
                  name="category"
                  id="category"
                  multiple
                >
                  {VALID_CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {t(`admin.${category}`)}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <div className="form__submit__cancel__buttons">
              <RegularButton
                className="btn form__button"
                type="submit"
              >
                {isLoading ? (
                  <CustomPulseLoader
                    isLoading={isLoading}
                    $customHeight="100%"
                  />
                ) : (
                  t("generic.submit")
                )}
              </RegularButton>
              <RegularButton
                className="btn form__button"
                $skin="danger"
                onClick={handleToEditPage}
              >
                {t("generic.cancel")}
              </RegularButton>
            </div>
          </form>
        </>
      )}
    </main>
  );
};

export default EditJob;
