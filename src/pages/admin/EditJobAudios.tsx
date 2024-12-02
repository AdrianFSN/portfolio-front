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
  ALLOWED_AUDIO_TYPES,
  AUDIOS_DB_PATH,
  EDIT_ROUTES_PATH,
  JOB_ROUTES_URI,
  ORIGIN,
  PICTURES_ROUTES_URI,
  VERSION_ROUTES_URI,
  VIDEOS_ROUTES_URI,
} from "../../utils/constants";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import FileInterface from "../../@types/FileInterface";
import { AxiosError } from "axios";
import { updateJobAudios } from "./adminService";
import StandardResponseInterface from "../../@types/StandardResponse";
import extractErrorMessage from "../../utils/extractErrorMessage";
import fileUploadValidator from "../../utils/filesUploadVallidator";
import { resetAllowSwitchLanguage } from "../../store/slices/allowSwitchLanguageSlice";

const EditJobAudios = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const toEditPage = EDIT_ROUTES_PATH;
  const origin = ORIGIN;
  const job = useSelector(getJobDetailSelector);
  const [jobAudios, setJobAudios] = useState<FileInterface[]>([
    {
      key: "mainAudio",
      current: job && job.audios.mainAudio ? job.audios.mainAudio : "",
      preview: "",
      title: t("admin.main_audio"),
    },
    {
      key: "audio2",
      current: job && job.audios.audio2 ? job.audios.audio2 : "",
      preview: "",
      title: t("admin.audio2"),
    },
  ]);

  const [toLocalizeJob, setToLocalizeJob] = useState("");
  const [toEditJob, setToEditJob] = useState("");
  const [toEditJobVideos, setToEditJobVideos] = useState("");
  const [toEditJobPictures, setToEditJobPictures] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fileNames: Record<string, string | null> = {
    mainAudio: null,
    audio2: null,
  };

  const [audiosData, setAudiosData] = useState({
    mainAudio: null,
    audio2: null,
    deleteMainAudio: false,
    deleteAudio2: false,
    collectionId: "",
  });

  useEffect(() => {
    dispatch(resetAllowSwitchLanguage());
  }, [dispatch]);

  useEffect(() => {
    if (job) {
      setAudiosData((prevValues) => ({
        ...prevValues,
        collectionId: job.audios._id,
      }));
    }
  }, [job]);

  useEffect(() => {
    if (job) {
      setToLocalizeJob(
        `${EDIT_ROUTES_PATH}/${JOB_ROUTES_URI}/${job._id}/${VERSION_ROUTES_URI}/${job.versions[0]._id}`
      );
      setToEditJob(`${EDIT_ROUTES_PATH}/${JOB_ROUTES_URI}/${job._id}`);
      setToEditJobVideos(
        `${EDIT_ROUTES_PATH}/${JOB_ROUTES_URI}/${job._id}/${VIDEOS_ROUTES_URI}/${job.videos._id}`
      );
      setToEditJobPictures(
        `${EDIT_ROUTES_PATH}/${JOB_ROUTES_URI}/${job._id}/${PICTURES_ROUTES_URI}/${job.pictures._id}`
      );
    }
  }, [job]);

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    if (audiosData.mainAudio) {
      setAudiosData((prevData) => ({
        ...prevData,
        deleteMainAudio: true,
      }));
    } else if (audiosData.audio2) {
      setAudiosData((prevData) => ({
        ...prevData,
        deleteAudio2: true,
      }));
    }
  }, [audiosData.mainAudio, audiosData.audio2]);

  const handleAudiosOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = event.target;

    if (type === "checkbox") {
      setAudiosData((prevFormData) => ({
        ...prevFormData,
        [name]: (event.target as HTMLInputElement).checked,
      }));
    } else if (type === "file") {
      const files = (event.target as HTMLInputElement).files;

      if (files?.[0]) {
        const file = files[0];
        const validationMessage = fileUploadValidator({
          validators: ALLOWED_AUDIO_TYPES,
          file,
          message: t("errors.not_valid_audio_file"),
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

        setAudiosData((prevFormData) => ({
          ...prevFormData,
          [name]: file,
        }));

        setJobAudios((prevJobAudios) =>
          prevJobAudios.map((fileItem) =>
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
      setAudiosData((prevFormData) => ({
        ...prevFormData,
        [name]: null,
        [`delete${name.charAt(0).toUpperCase()}${name.slice(1)}`]: false,
      }));
      setJobAudios((prevJobFiles) =>
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
      const response = await updateJobAudios(job.audios._id, audiosData);
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
    setError(null);
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
            <p onClick={() => navigate(toEditJobVideos)}>
              {t("admin.edit_job_videos")}
            </p>
            <p onClick={() => navigate(toEditJobPictures)}>
              {t("admin.edit_job_pictures")}
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
              {jobAudios.map((fileItem) => (
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
                            <audio
                              controls
                              src={`${AUDIOS_DB_PATH}${fileItem.current}`}
                              crossOrigin={origin}
                            ></audio>
                            <p>{`${t("generic.current")}: ${
                              fileItem.current
                            }`}</p>
                            <span className="delete__former__file">
                              <input
                                type="checkbox"
                                name={`delete${fileItem.key
                                  .charAt(0)
                                  .toUpperCase()}${fileItem.key.slice(1)}`}
                                onChange={handleAudiosOnChange}
                              />
                              {t("admin.delete_current_file")}
                            </span>
                          </>
                        )}

                      {fileItem.preview && (
                        <>
                          <audio
                            controls
                            src={fileItem.preview}
                          ></audio>
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
                      onChange={handleAudiosOnChange}
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

export default EditJobAudios;
