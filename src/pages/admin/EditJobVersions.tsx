import { useEffect, useState } from "react";

import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import {
  DESCRIPTION_MAX_LENGTH,
  EDIT_ROUTES_PATH,
  EXCERPT_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetailSelector } from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";
import { AppDispatch } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import { AxiosError } from "axios";
import { updateJobVersion } from "./adminService";
import StandardResponseInterface from "../../@types/StandardResponse";
import extractErrorMessage from "../../utils/extractErrorMessage";
import { resetJobDetail } from "../../store/slices/jobDetailSlice";
import { setAllowSwitchLanguage } from "../../store/slices/allowSwitchLanguageSlice";

const EditJobVersions = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const toEditPage = EDIT_ROUTES_PATH;
  const job = useSelector(getJobDetailSelector);
  const [toEditJobPictures, setToEditJobPictures] = useState("");
  const [toEditJob, setToEditJob] = useState("");
  const [toEditJobVideos, setToEditJobVideos] = useState("");
  const [toEditJobAudios, setToEditJobAudios] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  interface VersionDataInterface {
    title: string;
    technologies: string[];
    info: string;
    description: string;
    customer: string;
    versionId: string;
    language: string;
  }

  const [versionsData, setVersionsData] = useState<VersionDataInterface>({
    title: "",
    technologies: [],
    info: "",
    customer: "",
    description: "",
    versionId: "",
    language: "",
  });

  useEffect(() => {
    dispatch(setAllowSwitchLanguage(false));
  }, [dispatch]);

  useEffect(() => {
    if (job) {
      setToEditJobPictures(
        `${EDIT_ROUTES_PATH}/job/${job._id}/pictures/${job.pictures._id}`
      );
      setToEditJob(`${EDIT_ROUTES_PATH}/job/${job._id}`);
      setToEditJobVideos(
        `${EDIT_ROUTES_PATH}/job/${job._id}/videos/${job.videos._id}`
      );
      setToEditJobAudios(
        `${EDIT_ROUTES_PATH}/job/${job._id}/audios/${job.audios._id}`
      );
    }
  }, [job]);

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    if (job) {
      setVersionsData((prevData) => ({
        ...prevData,
        title: job.versions[0].title || "",
        technologies: job.versions[0].technologies || [],
        info: job.versions[0].info || "",
        description: job.versions[0].description || "",
        customer: job.versions[0].customer || "",
        versionId: job.versions[0]._id || "",
        language: job.versions[0].language || "",
      }));
    }
  }, [job]);

  useEffect(() => {
    if (
      versionsData.title.length > TITLE_MAX_LENGTH ||
      versionsData.info.length > EXCERPT_MAX_LENGTH ||
      versionsData.description.length > DESCRIPTION_MAX_LENGTH
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [versionsData.info, versionsData.title, versionsData.description]);

  useEffect(() => {
    if (versionsData.info.length > EXCERPT_MAX_LENGTH) {
      setError(new Error(`${t("errors.excerpt_too_long")}`) as AxiosError);
    } else if (versionsData.title.length > TITLE_MAX_LENGTH) {
      setError(new Error(`${t("errors.title_too_long")}`) as AxiosError);
    } else if (versionsData.description.length > DESCRIPTION_MAX_LENGTH) {
      setError(new Error(`${t("errors.description_too_long")}`) as AxiosError);
    } else {
      setError(null);
    }
  }, [t, versionsData.info, versionsData.title, versionsData.description]);

  useEffect(() => {
    if (error) {
      const errorMessage = extractErrorMessage(error, t);
      setAlertMessage(errorMessage);
    } else {
      setAlertMessage("");
    }
  }, [error, t]);

  const handleVersionsOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setVersionsData((prevFormData) => {
      if (name === "technologies") {
        return {
          ...prevFormData,
          [name]: value.split(",").map((tech) => tech.trim()), // Divide por comas y elimina espacios
        };
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      const response = await updateJobVersion(
        job.versions[0]._id,
        versionsData
      );
      setAlertMessage(
        (response as unknown as StandardResponseInterface).message
      );
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertMessage("");
    if (!error) {
      dispatch(setAllowSwitchLanguage(true));
      dispatch(resetJobDetail());
      navigate(toEditPage);
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
            <p onClick={() => navigate(toEditJob)}>{t("admin.edit_job")}</p>
            <p onClick={() => navigate(toEditJobPictures)}>
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
                <h3>{t("admin.descriptive_info")}</h3>
              </legend>
              <div className="form__fieldset__field">
                <label
                  className="form__label"
                  htmlFor="title"
                >
                  <h4>{t("admin.job_title")}</h4>
                </label>
                <input
                  className="form__input"
                  type="text"
                  value={versionsData.title}
                  onChange={handleVersionsOnChange}
                  name="title"
                  id="title"
                  placeholder={
                    job.versions[0].title
                      ? job.versions[0].title
                      : t("admin.job_title")
                  }
                  max-length={TITLE_MAX_LENGTH}
                />
                <p>{`${versionsData.title.length} / ${TITLE_MAX_LENGTH} ${t(
                  "generic.characters"
                )}`}</p>
              </div>
              <div className="form__fieldset__field">
                <label
                  className="form__label"
                  htmlFor="excerpt"
                >
                  <h4>{t("admin.job_excerpt")}</h4>
                </label>
                <textarea
                  className="form__textarea"
                  value={versionsData.info}
                  onChange={handleVersionsOnChange}
                  name="info"
                  id="info"
                  max-length={EXCERPT_MAX_LENGTH}
                />
                <p>{`${versionsData.info.length} / ${EXCERPT_MAX_LENGTH} ${t(
                  "generic.characters"
                )}`}</p>
              </div>
              <div className="form__fieldset__field">
                <label
                  className="form__label"
                  htmlFor="description"
                >
                  <h4>{t("admin.job_description")}</h4>
                </label>
                <textarea
                  className="form__textarea"
                  value={versionsData.description}
                  onChange={handleVersionsOnChange}
                  name="description"
                  id="description"
                  max-length={DESCRIPTION_MAX_LENGTH}
                />
                <p>{`${
                  versionsData.description?.length
                } / ${DESCRIPTION_MAX_LENGTH} ${t("generic.characters")}`}</p>
              </div>
            </fieldset>
            <fieldset className="form__fieldset">
              <legend>
                <h3>{t("admin.context_info")}</h3>
              </legend>
              <div className="form__fieldset__field">
                <label
                  className="form__label"
                  htmlFor="customer"
                >
                  <h4>{t("admin.customer")}</h4>
                </label>
                <input
                  className="form__input"
                  type="text"
                  value={versionsData.customer}
                  onChange={handleVersionsOnChange}
                  name="customer"
                  id="customer"
                  placeholder={
                    job.versions[0].customer
                      ? job.versions[0].customer
                      : t("admin.customer")
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
                  htmlFor="technologies"
                >
                  <h4>{t("admin.technologies")}</h4>
                </label>
                <input
                  className="form__input"
                  type="text"
                  value={
                    Array.isArray(versionsData.technologies)
                      ? versionsData.technologies.join(", ")
                      : versionsData.technologies
                  }
                  onChange={handleVersionsOnChange}
                  name="technologies"
                  id="technologies"
                  placeholder={
                    Array.isArray(job.versions[0].technologies)
                      ? job.versions[0].technologies.join(", ")
                      : job.versions[0].technologies || t("admin.technologies")
                  }
                />
              </div>
            </fieldset>

            <div className="form__submit__cancel__buttons">
              <RegularButton
                className="btn form__button"
                type="submit"
                disabled={disableSubmit}
              >
                {isLoading ? (
                  <CustomPulseLoader
                    isLoading={isLoading}
                    $customHeight="100%"
                    $customBackground="transparent"
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

export default EditJobVersions;
