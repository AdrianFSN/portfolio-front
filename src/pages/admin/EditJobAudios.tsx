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
  AUDIOS_DB_PATH,
  EDIT_ROUTES_PATH,
  ORIGIN,
} from "../../utils/constants";
import {
  getJobAudiosErrorSelector,
  getJobAudiosLoadingSelector,
  getJobAudiosMessageSelector,
} from "../../store/selectors/editJobsSelectors/editJobAudiosSelectors";
import { resetJobAudios } from "../../store/slices/jobAudiosSlice";
import { updateJobAudiosThunk } from "../../store/thunks/editJobAudiosThunk";
import { resetJobDetail } from "../../store/slices/jobDetailSlice";
import CustomAlert from "../../components/shared/alert/CustomAlert";

const EditJobAudios = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const toEditPage = EDIT_ROUTES_PATH;
  const origin = ORIGIN;
  const job = useSelector(getJobDetailSelector);
  const jobAudios = [
    {
      key: "mainAudio",
      current: job && job.audios.mainAudio ? job.audios.mainAudio : "",
      title: t("admin.main_audio"),
    },
    {
      key: "audio2",
      current: job && job.audios.audio2 ? job.audios.audio2 : "",
      title: t("admin.audio2"),
    },
  ];

  const [toLocalizeJob, setToLocalizeJob] = useState("");
  const [toEditJob, setToEditJob] = useState("");
  const [toEditJobVideos, setToEditJobVideos] = useState("");
  const [toEditJobPictures, setToEditJobPictures] = useState("");
  const error = useSelector(getJobAudiosErrorSelector);
  const successMessage = useSelector(getJobAudiosMessageSelector);
  const isLoading = useSelector(getJobAudiosLoadingSelector);
  const [alertMessage, setAlertMessage] = useState("");
  const [fileNames, setFileNames] = useState<Record<string, string | null>>({
    mainAudio: null,
    audio2: null,
  });

  const [audiosData, setAudiosData] = useState({
    mainAudio: null,
    audio2: null,
    deleteMainAudio: false,
    deleteAudio2: false,
    collectionId: "",
  });

  useEffect(() => {
    if (job) {
      setAudiosData((prevValues) => ({
        ...prevValues,
        collectionId: job.audios._id,
      }));
    }
  }, [job]);

  useEffect(() => {
    if (!error && successMessage) {
      setAlertMessage(successMessage);
    } else {
      setAlertMessage(error as string);
    }
  }, [successMessage, error]);

  useEffect(() => {
    if (job) {
      setToLocalizeJob(`/edit/job/${job._id}/version/${job.versions[0]._id}`);
      setToEditJob(`/edit/job/${job._id}`);
      setToEditJobVideos(`/edit/job/${job._id}/videos/${job.videos._id}`);
      setToEditJobPictures(`/edit/job/${job._id}/pictures/${job.pictures._id}`);
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
        collectionId: job.audios._id,
      }));
    } else if (type === "file") {
      const files = (event.target as HTMLInputElement).files;
      setAudiosData((prevFormData) => ({
        ...prevFormData,
        [name]: files?.[0] || null,
        collectionId: job.audios._id,
      }));
      setFileNames((prevFileNames) => ({
        ...prevFileNames,
        [name]: files?.[0]?.name || null,
      }));
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
      }));
      setFileNames((prevFileNames) => ({
        ...prevFileNames,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(resetJobAudios());
    await dispatch(
      updateJobAudiosThunk({
        audiosId: job.audios._id,
        formData: audiosData,
      })
    );
  };

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (successMessage) {
      setAlertMessage("");
      dispatch(resetJobAudios());
      dispatch(resetJobDetail());
      navigate(toEditPage);
    } else {
      setAlertMessage("");
      dispatch(resetJobAudios());
    }
  };

  const handleToEditPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(resetJobDetail());
    dispatch(resetJobAudios());
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
                      {fileItem.current && !fileNames[fileItem.key] && (
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
                      {fileNames[fileItem.key] && (
                        <div className="form__file__is__uploaded">
                          <p>{`${t("generic.uploaded_file")}: ${
                            fileNames[fileItem.key]
                          }`}</p>
                          <p
                            data-name={fileItem.key}
                            onClick={handleResetUploadFile}
                            className="form__cancel__upload"
                          >
                            {t("generic.cancel_upload")}
                          </p>
                        </div>
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
