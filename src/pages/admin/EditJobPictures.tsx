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

const EditJobPictures = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = false;
  const job = useSelector(getJobDetailSelector);
  const jobPictures = [
    {
      key: "mainPicture",
      current: job && job.pictures.mainPicture ? job.pictures.mainPicture : "",
      title: t("admin.main_picture"),
    },
    {
      key: "picture2",
      current: job && job.pictures.picture2 ? job.pictures.picture2 : "",
      title: t("admin.picture2"),
    },
    {
      key: "picture3",
      current: job && job.pictures.picture3 ? job.pictures.picture3 : "",
      title: t("admin.picture3"),
    },
    {
      key: "picture4",
      current: job && job.pictures.picture4 ? job.pictures.picture4 : "",
      title: t("admin.picture4"),
    },
    {
      key: "picture5",
      current: job && job.pictures.picture5 ? job.pictures.picture5 : "",
      title: t("admin.picture5"),
    },
  ];

  const [toLocalizeJob, setToLocalizeJob] = useState("");
  const [toEditJob, setToEditJob] = useState("");
  const [toEditJobVideos, setToEditJobVideos] = useState("");
  const [toEditJobAudios, setToEditJobAudios] = useState("");

  const [picturesData, setPicturesData] = useState({
    mainPicture: null,
    picture2: null,
    picture3: null,
    picture4: null,
    picture5: null,
    deleteMainPicture: false,
    deletePicture2: false,
    deletePicture3: false,
    deletePicture4: false,
    deletePicture5: false,
    collectionId: "",
  });

  useEffect(() => {
    if (job) {
      setToLocalizeJob(`/edit/job/${job._id}/version/${job.versions[0]._id}`);
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
    console.log("Esto es picturesData: ", picturesData);
  }, [picturesData]);

  console.log("Este es el job que voy a editar: ", job);

  useEffect(() => {
    if (picturesData.mainPicture) {
      setPicturesData((prevData) => ({
        ...prevData,
        deleteMainPicture: true,
      }));
    } else if (picturesData.picture2) {
      setPicturesData((prevData) => ({
        ...prevData,
        deletePicture2: true,
      }));
    } else if (picturesData.picture3) {
      setPicturesData((prevData) => ({
        ...prevData,
        deletePicture3: true,
      }));
    } else if (picturesData.picture4) {
      setPicturesData((prevData) => ({
        ...prevData,
        deletePicture4: true,
      }));
    } else if (picturesData.picture5) {
      setPicturesData((prevData) => ({
        ...prevData,
        deletePicture5: true,
      }));
    }
  }, [
    picturesData.mainPicture,
    picturesData.picture2,
    picturesData.picture3,
    picturesData.picture4,
    picturesData.picture5,
  ]);

  const handlePicturesOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type } = event.target;

    if (type === "checkbox") {
      setPicturesData((prevFormData) => ({
        ...prevFormData,
        [name]: (event.target as HTMLInputElement).checked,
        collectionId: job.pictures._id,
      }));
    } else if (type === "file") {
      const files = (event.target as HTMLInputElement).files;
      setPicturesData((prevFormData) => ({
        ...prevFormData,
        [name]: files?.[0] || null,
        collectionId: job.pictures._id,
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
                <h3>{t("admin.job_files")}</h3>
              </legend>
              {jobPictures.map((fileItem) => (
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
                              onChange={handlePicturesOnChange}
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
                      onChange={handlePicturesOnChange}
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

export default EditJobPictures;
