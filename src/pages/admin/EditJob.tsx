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
  const [inputTitle, setInputTitle] = useState("");
  const [inputExcerpt, setInputExcerpt] = useState("");
  const [inputLaunchPeriod, setInputLaunchPeriod] = useState("");
  const [inputLinkToUrl, setInputLinkToUrl] = useState("");
  const [inputCustomer, setInputCustomer] = useState("");
  const [inputLinkToGithub, setInputLinkToGithub] = useState("");
  const [inputCategory, setInputCategory] = useState<string[]>([]);
  const [inputTechnologies, setInputTechnologies] = useState("");
  const [inputMainPicture, setInputMainPicture] = useState("");
  const [inputPicture2, setInputPicture2] = useState("");
  const [inputPicture3, setInputPicture3] = useState("");
  const [inputPicture4, setInputPicture4] = useState("");
  const [inputPicture5, setInputPicture5] = useState("");
  const [inputMainVideo, setInputMainVideo] = useState("");
  const [inputVideo2, setInputVideo2] = useState("");
  const [inputMainAudio, setInputMainAudio] = useState("");
  const [inputAudio2, setInputAudio2] = useState("");
  const [deleteMainPicture, setDeleteMainPicture] = useState(false);
  const [deletePicture2, setDeletePicture2] = useState(false);
  const [deletePicture3, setDeletePicture3] = useState(false);
  const [deletePicture4, setDeletePicture4] = useState(false);
  const [deletePicture5, setDeletePicture5] = useState(false);
  const [deleteMainVideo, setDeleteMainVideo] = useState(false);
  const [deleteVideo2, setDeleteVideo2] = useState(false);
  const [deleteMainAudio, setDeleteMainAudio] = useState(false);
  const [deleteAudio2, setDeleteAudio2] = useState(false);
  const job = useSelector(getJobDetailSelector);
  const jobFiles = [
    {
      key: "mainPicture",
      fileInput: inputMainPicture,
      current: job && job.pictures.mainPicture ? job.pictures.mainPicture : "",
      setFile: (fileName: string) => setInputMainPicture(fileName),
      title: t("admin.main_picture"),
      deletionFlag: deleteMainPicture,
      setDeletionFlag: (value: boolean) => setDeleteMainPicture(value),
    },
    {
      key: "picture2",
      fileInput: inputPicture2,
      current: job && job.pictures.picture2 ? job.pictures.picture2 : "",
      setFile: (fileName: string) => setInputPicture2(fileName),
      title: t("admin.picture2"),
      deletionFlag: deletePicture2,
      setDeletionFlag: (value: boolean) => setDeletePicture2(value),
    },
    {
      key: "picture3",
      fileInput: inputPicture3,
      current: job && job.pictures.picture3 ? job.pictures.picture3 : "",
      setFile: (fileName: string) => setInputPicture3(fileName),
      title: t("admin.picture3"),
      deletionFlag: deletePicture3,
      setDeletionFlag: (value: boolean) => setDeletePicture3(value),
    },
    {
      key: "picture4",
      fileInput: inputPicture4,
      current: job && job.pictures.picture4 ? job.pictures.picture4 : "",
      setFile: (fileName: string) => setInputPicture4(fileName),
      title: t("admin.picture4"),
      deletionFlag: deletePicture4,
      setDeletionFlag: (value: boolean) => setDeletePicture4(value),
    },
    {
      key: "picture5",
      fileInput: inputPicture5,
      current: job && job.pictures.picture5 ? job.pictures.picture5 : "",
      setFile: (fileName: string) => setInputPicture5(fileName),
      title: t("admin.picture5"),
      deletionFlag: deletePicture5,
      setDeletionFlag: (value: boolean) => setDeletePicture5(value),
    },
    {
      key: "mainVideo",
      fileInput: inputMainVideo,
      current: job && job.videos.mainVideo ? job.videos.mainVideo : "",
      setFile: (fileName: string) => setInputMainVideo(fileName),
      title: t("admin.main_video"),
      deletionFlag: deleteMainVideo,
      setDeletionFlag: (value: boolean) => setDeleteMainVideo(value),
    },
    {
      key: "video2",
      fileInput: inputVideo2,
      current: job && job.videos.video2 ? job.videos.video2 : "",
      setFile: (fileName: string) => setInputVideo2(fileName),
      title: t("admin.video2"),
      deletionFlag: deleteVideo2,
      setDeletionFlag: (value: boolean) => setDeleteVideo2(value),
    },
    {
      key: "mainAudio",
      fileInput: inputMainAudio,
      current: job && job.audios.mainAudio ? job.audios.mainAudio : "",
      setFile: (fileName: string) => setInputMainAudio(fileName),
      title: t("admin.main_audio"),
      deletionFlag: deleteMainAudio,
      setDeletionFlag: (value: boolean) => setDeleteMainAudio(value),
    },
    {
      key: "audio2",
      fileInput: inputAudio2,
      current: job && job.audios.audio2 ? job.audios.audio2 : "",
      setFile: (fileName: string) => setInputAudio2(fileName),
      title: t("admin.audio2"),
      deletionFlag: deleteAudio2,
      setDeletionFlag: (value: boolean) => setDeleteAudio2(value),
    },
  ];
  const [formData, setFormData] = useState({
    title: "",
    technologies: [],
    launchPeriod: "",
    info: "",
    linkToUrl: "",
    linkToGitHub: "",
    category: [],
    mainPicture: null,
    picture2: null,
    picture3: null,
    picture4: null,
    picture5: null,
    mainVideo: null,
    video2: null,
    mainAudio: null,
    audio2: null,
    deleteMainPicture: false,
    deletePicture2: false,
    deletePicture3: false,
    deletePicture4: false,
    deletePicture5: false,
    deleteMainVideo: false,
    deleteVideo2: false,
    deleteMainAudio: false,
    deleteAudio2: false,
  });

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  console.log("Este es el job que voy a editar: ", job);

  useEffect(() => {
    if (job) {
      setFormValues({
        title: inputTitle ? inputTitle : job.versions[0].title,
        technologies: inputTechnologies
          ? inputTechnologies
          : job.versions[0].technologies,
        launchPeriod: inputLaunchPeriod ? inputLaunchPeriod : job.launchPeriod,
        info: inputExcerpt ? inputExcerpt : job.versions[0].info,
        inputLinkToUrl: inputLinkToUrl ? inputLinkToUrl : job.linkToUrl,
        inputLinkToGitHub: inputLinkToGithub
          ? inputLinkToGithub
          : job.linkToGitHub,
      });
    }
  });

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
                value={inputTitle ? inputTitle : job.versions[0].title}
                onChange={(e) => setInputTitle(e.target.value)}
                name="Title"
                id="title"
                placeholder={t("admin.job_title")}
                max-length={TITLE_MAX_LENGTH}
              />
              <p>{`${
                inputTitle ? inputTitle.length : job.versions[0].title.length
              } / ${TITLE_MAX_LENGTH} ${t("generic.characters")}`}</p>
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
                value={inputExcerpt ? inputExcerpt : job.versions[0].info}
                onChange={(e) => setInputExcerpt(e.target.value)}
                name="Excerpt"
                id="excerpt"
                placeholder={t("admin.job_excerpt")}
                max-length={EXCERPT_MAX_LENGTH}
              />
              <p>{`${
                inputExcerpt ? inputExcerpt.length : job.versions[0].info.length
              } / ${EXCERPT_MAX_LENGTH} ${t("generic.characters")}`}</p>
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
                value={inputLaunchPeriod ? inputLaunchPeriod : job.launchPeriod}
                onChange={(e) => setInputLaunchPeriod(e.target.value)}
                name="LaunchPeriod"
                id="launchPeriod"
                placeholder={t("admin.launch_period")}
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
                value={inputCustomer ? inputCustomer : job.versions[0].customer}
                onChange={(e) => setInputCustomer(e.target.value)}
                name="Customer"
                id="customer"
                placeholder={t("admin.customer")}
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
                value={inputLinkToUrl ? inputLinkToUrl : job.linkToUrl}
                onChange={(e) => setInputLinkToUrl(e.target.value)}
                name="LinToUrl"
                id="linkToUrl"
                placeholder={t("admin.link_to_url")}
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
                value={inputLinkToGithub ? inputLinkToGithub : job.linkToGitHub}
                onChange={(e) => setInputLinkToGithub(e.target.value)}
                name="LinToGithub"
                id="linkToGithub"
                placeholder={t("admin.link_to_github")}
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
                value={inputCategory}
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setInputCategory(selectedOptions);
                }}
                name="Category"
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
                  inputTechnologies
                    ? inputTechnologies
                    : job.versions[0].technologies
                }
                onChange={(e) => setInputTechnologies(e.target.value)}
                name="Technologies"
                id="technologies"
                placeholder={t("admin.technologies")}
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
                            checked={fileItem.deletionFlag}
                            onChange={(e) => fileItem.setDeletionFlag(!e)}
                          />
                          {t("admin.delete_old_file")}
                        </span>
                      </>
                    )}
                  </label>

                  <input
                    className="form__input form__file"
                    type="file"
                    id={fileItem.key}
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      fileItem.setFile(
                        file ? file.name : `${t("generic.no_file_chosen")}`
                      );
                    }}
                    name={fileItem.key}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor={fileItem.key}
                    className="file-upload-label form__file__button"
                  >
                    {fileItem.fileInput || t("generic.choose_a_file")}
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
