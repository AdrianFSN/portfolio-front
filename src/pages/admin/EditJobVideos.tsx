import { useEffect, useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetailSelector } from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";
import { AppDispatch } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";

const EditJobVideos = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = false;
  const job = useSelector(getJobDetailSelector);
  const jobVideos = [
    {
      key: "mainVideo",
      current: job && job.videos.mainVideo ? job.videos.mainVideo : "",
      title: t("admin.main_video"),
    },
    {
      key: "video2",
      current: job && job.videos.video2 ? job.videos.video2 : "",
      title: t("admin.video2"),
    },
  ];

  const [toLocalizeJob, setToLocalizeJob] = useState("");
  const [toEditJob, setToEditJob] = useState("");
  const [toEditJobPictures, setToEditJobPictures] = useState("");
  const [toEditJobAudios, setToEditJobAudios] = useState("");

  const [videosData, setVideosData] = useState({
    mainVideo: null,
    video2: null,
    deleteMainVideo: false,
    deleteVideo2: false,
    collectionId: "",
  });

  useEffect(() => {
    if (job) {
      setToLocalizeJob(`/edit/job/${job._id}/version/${job.versions[0]._id}`);
      setToEditJob(`/edit/job/${job._id}`);
      setToEditJobPictures(`/edit/job/${job._id}/pictures/${job.pictures._id}`);
      setToEditJobAudios(`/edit/job/${job._id}/audios/${job.audios._id}`);
    }
  }, [job]);

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    console.log("Esto es videosData: ", videosData);
  }, [videosData]);

  console.log("Este es el job que voy a editar: ", job);

  useEffect(() => {
    if (videosData.mainVideo) {
      setVideosData((prevData) => ({
        ...prevData,
        deleteMainVideo: true,
      }));
    } else if (videosData.video2) {
      setVideosData((prevData) => ({
        ...prevData,
        deleteVideo2: true,
      }));
    }
  }, [videosData.mainVideo, videosData.video2]);

  const handleVideosOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = event.target;

    if (type === "checkbox") {
      setVideosData((prevFormData) => ({
        ...prevFormData,
        [name]: (event.target as HTMLInputElement).checked,
        collectionId: job.videos._id,
      }));
    } else if (type === "file") {
      const files = (event.target as HTMLInputElement).files;
      setVideosData((prevFormData) => ({
        ...prevFormData,
        [name]: files?.[0] || null,
        collectionId: job.videos._id,
      }));
    }
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
            <p onClick={() => navigate(toLocalizeJob)}>
              {t("admin.edit_job_version")}
            </p>
            <p onClick={() => navigate(toEditJobPictures)}>
              {t("admin.edit_job_pictures")}
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
                <h3>{t("admin.job_files")}</h3>
              </legend>
              {jobVideos.map((fileItem) => (
                <div
                  className="login__fieldset__field "
                  key={fileItem.key}
                >
                  <div className="file__section__container">
                    <label
                      className="form__label"
                      htmlFor={fileItem.key}
                    >
                      <h4>{fileItem.title}</h4>
                      {fileItem.current && (
                        <>
                          <p>{`${t("generic.current")}: ${
                            fileItem.current
                          }`}</p>
                          <span className="delete__former__file">
                            <input
                              type="checkbox"
                              name={`delete${fileItem.key
                                .charAt(0)
                                .toUpperCase()}${fileItem.key.slice(1)}`}
                              onChange={handleVideosOnChange}
                            />
                            {t("admin.delete_current_file")}
                          </span>
                        </>
                      )}
                    </label>

                    <input
                      className="form__input form__file"
                      type="file"
                      id={fileItem.key}
                      onChange={handleVideosOnChange}
                      name={fileItem.key}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor={fileItem.key}
                      className="file-upload-label form__file__button"
                    >
                      {t("generic.choose_a_file")}
                    </label>
                  </div>
                </div>
              ))}
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

export default EditJobVideos;
