import { useEffect, useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import { EXCERPT_MAX_LENGTH, TITLE_MAX_LENGTH } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetailSelector } from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";
import { AppDispatch } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";

const EditJobVersions = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = false;
  const job = useSelector(getJobDetailSelector);
  const [toEditJobPictures, setToEditJobPictures] = useState("");
  const [toEditJob, setToEditJob] = useState("");
  const [toEditJobVideos, setToEditJobVideos] = useState("");
  const [toEditJobAudios, setToEditJobAudios] = useState("");

  const [versionsData, setVersionsData] = useState({
    title: "",
    technologies: [],
    info: "",
    customer: "",
    versionId: "",
  });

  useEffect(() => {
    if (job) {
      setToEditJobPictures(`/edit/job/${job._id}/pictures/${job.pictures._id}`);
      setToEditJob(`/edit/job/${job._id}`);
      setToEditJobVideos(`/edit/job/${job._id}/videos/${job.videos._id}`);
      setToEditJobAudios(`/edit/job/${job._id}/audios/${job.audios._id}`);
    }
  }, [job]);

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    console.log("Esto es versionsData: ", versionsData);
  }, [versionsData]);

  console.log("Este es el job que voy a editar: ", job);

  const handleVersionsOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = event.target;

    setVersionsData((prevFormData) => ({
      ...prevFormData,
      [name]: event.target.value,
      versionId: job.versions[0]._id,
    }));
  };

  const handleSubmit = () => {};

  return (
    <main className="edit__job__form">
      <h1>{t("admin.edit_job")}</h1>
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
                  className="form__input"
                  value={versionsData.info}
                  onChange={handleVersionsOnChange}
                  name="info"
                  id="excerpt"
                  placeholder={
                    job.versions[0].info
                      ? job.versions[0].info
                      : t("admin.job_excerpt")
                  }
                  max-length={EXCERPT_MAX_LENGTH}
                />
                <p>{`${versionsData.info.length} / ${EXCERPT_MAX_LENGTH} ${t(
                  "generic.characters"
                )}`}</p>
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
                "Submit"
              )}
            </RegularButton>
          </form>
        </>
      )}
    </main>
  );
};

export default EditJobVersions;
