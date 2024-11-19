import { useEffect, useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import {
  EXCERPT_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  VALID_CATEGORIES,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetailSelector } from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";
import { AppDispatch } from "../../store/store";
import { useParams } from "react-router-dom";

const EditJob = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = false;
  const job = useSelector(getJobDetailSelector);
  const jobFiles = [
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
  const [textData, setTextData] = useState({
    launchPeriod: "",
    linkToUrl: "",
    linkToGitHub: "",
    category: [],
  });

  const [versionsData, setVersionsData] = useState({
    title: "",
    technologies: [],
    info: "",
    customer: "",
    versionId: "",
  });

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

  const [videosData, setVideosData] = useState({
    mainVideo: null,
    video2: null,
    deleteMainVideo: false,
    deleteVideo2: false,
    collectionId: "",
  });

  const [audiosData, setAudiosData] = useState({
    mainAudio: null,
    audio2: null,
    deleteMainAudio: false,
    deleteAudio2: false,
    collectionId: "",
  });

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    console.log("Esto es textData: ", textData);
    console.log("Esto es picturesData: ", picturesData);
    console.log("Esto es videosData: ", videosData);
    console.log("Esto es audiosData: ", audiosData);
    console.log("Esto es versionsData: ", versionsData);
  }, [textData, versionsData, picturesData, audiosData, videosData]);

  console.log("Este es el job que voy a editar: ", job);

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
    }
  };

  const handleSubmit = () => {};

  return (
    <main className="edit__job__form">
      <h1>{t("admin.edit_job")}</h1>
      {job && (
        <form
          className="job__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="form__fieldset">
            <legend>
              <h3>{t("admin.descriptive_info")}</h3>
            </legend>
            <div className="login__fieldset__field">
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
            <div className="login__fieldset__field">
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
            <div className="login__fieldset__field">
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
                  job.launchPeriod ? job.launchPeriod : t("admin.launch_period")
                }
              />
            </div>
            <div className="login__fieldset__field">
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
            <div className="login__fieldset__field">
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
            <div className="login__fieldset__field">
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
            <div className="login__fieldset__field">
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
            <div className="login__fieldset__field">
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
          <fieldset className="form__fieldset">
            <legend>
              <h3>{t("admin.job_files")}</h3>
            </legend>
            {jobFiles.map((fileItem) => (
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
                        <p>{`${t("generic.current")}: ${fileItem.current}`}</p>
                        <span className="delete__former__file">
                          <input
                            type="checkbox"
                            name={`delete${fileItem.key
                              .charAt(0)
                              .toUpperCase()}${fileItem.key.slice(1)}`}
                            onChange={(event) => {
                              if (
                                fileItem.key.toLowerCase().includes("picture")
                              ) {
                                handlePicturesOnChange(event);
                              } else if (
                                fileItem.key.toLowerCase().includes("audio")
                              ) {
                                handleAudiosOnChange(event);
                              } else {
                                handleVideosOnChange(event);
                              }
                            }}
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
                    onChange={(event) => {
                      if (fileItem.key.toLowerCase().includes("picture")) {
                        handlePicturesOnChange(event);
                      } else if (fileItem.key.toLowerCase().includes("audio")) {
                        handleAudiosOnChange(event);
                      } else {
                        handleVideosOnChange(event);
                      }
                    }}
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
      )}
    </main>
  );
};

export default EditJob;
