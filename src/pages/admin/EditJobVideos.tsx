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
import {
  ALLOWED_VIDEO_TYPES,
  AUDIOS_ROUTES_URI,
  EDIT_ROUTES_PATH,
  JOB_ROUTES_URI,
  ORIGIN,
  VERSION_ROUTES_URI,
  VIDEOS_DB_PATH,
  VIDEOS_ROUTES_URI,
} from "../../utils/constants";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import FileInterface from "../../@types/FileInterface";
import { AxiosError } from "axios";
import StandardResponseInterface from "../../@types/StandardResponse";
import extractErrorMessage from "../../utils/extractErrorMessage";
import { updateJobVideos } from "./adminService";
import fileUploadValidator from "../../utils/filesUploadVallidator";

const EditJobVideos = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const toEditPage = EDIT_ROUTES_PATH;
  const origin = ORIGIN;
  const job = useSelector(getJobDetailSelector);
  const [jobVideos, setJobVideos] = useState<FileInterface[]>([
    {
      key: "mainVideo",
      current: job && job.videos.mainVideo ? job.videos.mainVideo : "",
      preview: "",
      title: t("admin.main_video"),
    },
    {
      key: "video2",
      current: job && job.videos.video2 ? job.videos.video2 : "",
      preview: "",
      title: t("admin.video2"),
    },
  ]);

  const [toLocalizeJob, setToLocalizeJob] = useState("");
  const [toEditJob, setToEditJob] = useState("");
  const [toEditJobPictures, setToEditJobPictures] = useState("");
  const [toEditJobAudios, setToEditJobAudios] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fileNames: Record<string, string | null> = {
    mainVideo: null,
    video2: null,
  };

  const [videosData, setVideosData] = useState({
    mainVideo: null,
    video2: null,
    deleteMainVideo: false,
    deleteVideo2: false,
    collectionId: "",
  });

  useEffect(() => {
    if (job) {
      setVideosData((prevValues) => ({
        ...prevValues,
        collectionId: job.videos._id,
      }));
    }
  }, [job]);

  useEffect(() => {
    if (job) {
      setToLocalizeJob(
        `${EDIT_ROUTES_PATH}/${JOB_ROUTES_URI}/${job._id}/${VERSION_ROUTES_URI}/${job.versions[0]._id}`
      );
      setToEditJob(`${EDIT_ROUTES_PATH}/${JOB_ROUTES_URI}/${job._id}`);
      setToEditJobPictures(
        `${EDIT_ROUTES_PATH}/${JOB_ROUTES_URI}/${job._id}/${VIDEOS_ROUTES_URI}/${job.videos._id}`
      );
      setToEditJobAudios(
        `${EDIT_ROUTES_PATH}/${JOB_ROUTES_URI}/${job._id}/${AUDIOS_ROUTES_URI}/${job.audios._id}`
      );
    }
  }, [job]);

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

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
      if (files?.[0]) {
        const file = files[0];

        const validationMessage = fileUploadValidator({
          validators: ALLOWED_VIDEO_TYPES,
          file,
          message: t("errors.not_valid_video_file"),
        });

        if (validationMessage) {
          setAlertMessage(validationMessage);
          setError(new Error() as AxiosError);
          return;
        }

        const previewURL = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : file.type.startsWith("video/") || file.type.startsWith("audio/")
          ? URL.createObjectURL(file)
          : "";

        setVideosData((prevFormData) => ({
          ...prevFormData,
          [name]: file,
        }));

        setJobVideos((prevJobPictures) =>
          prevJobPictures.map((fileItem) =>
            fileItem.key === name
              ? { ...fileItem, preview: previewURL }
              : fileItem
          )
        );
      }
    }
  };

  const handleResetUploadFile = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    const name = (event.target as HTMLParagraphElement).dataset.name; // Obtén el atributo "name"
    if (name) {
      setVideosData((prevFormData) => ({
        ...prevFormData,
        [name]: null,
        [`delete${name.charAt(0).toUpperCase()}${name.slice(1)}`]: false,
      }));
      setJobVideos((prevJobFiles) =>
        prevJobFiles.map((file) =>
          file.key === name ? { ...file, preview: "" } : file
        )
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      const response = await updateJobVideos(job.videos._id, videosData);
      setAlertMessage(
        (response as unknown as StandardResponseInterface).message
      );
    } catch (error) {
      setError(error as AxiosError);
      setAlertMessage(extractErrorMessage(error, t));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertMessage("");
    if (!error) {
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
                      {!fileItem.preview &&
                        fileItem.current &&
                        !fileNames[fileItem.key] && (
                          <>
                            <video
                              controls
                              src={`${VIDEOS_DB_PATH}${fileItem.current}`}
                              crossOrigin={origin}
                            ></video>
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
                      {fileItem.preview && (
                        <>
                          <video
                            controls
                            src={fileItem.preview}
                          ></video>
                          <p>{t("generic.uploaded_file")}</p>
                          <p
                            data-name={fileItem.key}
                            onClick={handleResetUploadFile}
                            className="form__cancel__upload"
                          >
                            {t("generic.cancel_upload")}
                          </p>
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

export default EditJobVideos;
