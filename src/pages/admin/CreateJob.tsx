import { useEffect, useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_PICTURES_TYPES,
  ALLOWED_VIDEO_TYPES,
  AUDIOS_COLLECTION_FIELDS,
  DESCRIPTION_MAX_LENGTH,
  EDIT_ROUTES_PATH,
  EXCERPT_MAX_LENGTH,
  PICTURES_COLLECTION_FIELDS,
  TITLE_MAX_LENGTH,
  VALID_CATEGORIES,
  VIDEOS_COLLECTION_FIELDS,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import { createJob } from "./adminService";
import { AxiosError } from "axios";
import StandardResponseInterface from "../../@types/StandardResponse";
import extractErrorMessage from "../../utils/extractErrorMessage";
import fileUploadValidator from "../../utils/filesUploadVallidator";

const CreateJob = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toEditPage = EDIT_ROUTES_PATH;
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [jobFiles, setJobFiles] = useState([
    {
      key: "mainPicture",
      current: "",
      preview: "",
      title: t("admin.main_picture"),
    },
    {
      key: "picture2",
      current: "",
      preview: "",
      title: t("admin.picture2"),
    },
    {
      key: "picture3",
      current: "",
      preview: "",
      title: t("admin.picture3"),
    },
    {
      key: "picture4",
      current: "",
      preview: "",
      title: t("admin.picture4"),
    },
    {
      key: "picture5",
      current: "",
      preview: "",
      title: t("admin.picture5"),
    },
    {
      key: "mainVideo",
      current: "",
      preview: "",
      title: t("admin.main_video"),
    },
    {
      key: "video2",
      current: "",
      preview: "",
      title: t("admin.video2"),
    },
    {
      key: "mainAudio",
      current: "",
      preview: "",
      title: t("admin.main_audio"),
    },
    {
      key: "audio2",
      current: "",
      preview: "",
      title: t("admin.audio2"),
    },
  ]);

  interface CreateJobInterface {
    launchPeriod: string;
    linkToUrl: string;
    linkToGitHub: string;
    category: string[];
    title: string;
    technologies: string[];
    info: string;
    description: string;
    customer: string;
    mainPicture: null;
    picture2: null;
    picture3: null;
    picture4: null;
    picture5: null;
    mainAudio: null;
    audio2: null;
    mainVideo: null;
    video2: null;
  }

  const [formData, setFormData] = useState<CreateJobInterface>({
    launchPeriod: "",
    linkToUrl: "",
    linkToGitHub: "",
    category: [],
    title: "",
    technologies: [],
    info: "",
    description: "",
    customer: "",
    mainPicture: null,
    picture2: null,
    picture3: null,
    picture4: null,
    picture5: null,
    mainVideo: null,
    video2: null,
    mainAudio: null,
    audio2: null,
  });

  useEffect(() => {
    if (
      formData.title.length > TITLE_MAX_LENGTH ||
      formData.info.length > EXCERPT_MAX_LENGTH ||
      formData.description.length > DESCRIPTION_MAX_LENGTH
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [formData.info, formData.title, formData.description]);

  useEffect(() => {
    if (formData.info.length > EXCERPT_MAX_LENGTH) {
      setError(new Error(`${t("errors.excerpt_too_long")}`) as AxiosError);
    } else if (formData.title.length > TITLE_MAX_LENGTH) {
      setError(new Error(`${t("errors.title_too_long")}`) as AxiosError);
    } else if (formData.description.length > DESCRIPTION_MAX_LENGTH) {
      setError(new Error(`${t("errors.description_too_long")}`) as AxiosError);
    } else {
      setError(null);
    }
  }, [t, formData.info, formData.title, formData.description]);

  useEffect(() => {
    if (error) {
      const errorMessage = extractErrorMessage(error, t);
      setAlertMessage(errorMessage);
    } else {
      setAlertMessage("");
    }
  }, [error, t]);

  const handleFormOnChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;

    if (event.target instanceof HTMLSelectElement) {
      const selectedValues = Array.from(event.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedValues,
      }));
    } else if (name === "technologies") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.split(",").map((tech) => tech.trim()),
      }));
    } else if (type === "file") {
      const files = (event.target as HTMLInputElement).files;

      if (files?.[0]) {
        const file = files[0];

        if (PICTURES_COLLECTION_FIELDS.includes(name)) {
          const validationMessage = fileUploadValidator({
            validators: ALLOWED_PICTURES_TYPES,
            file,
            message: t("errors.not_valid_picture_file"),
          });

          if (validationMessage) {
            setAlertMessage(validationMessage);
            setError(new Error() as AxiosError);
            return;
          }
        } else if (VIDEOS_COLLECTION_FIELDS.includes(name)) {
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
        } else if (AUDIOS_COLLECTION_FIELDS.includes(name)) {
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
        }

        const previewURL = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : file.type.startsWith("video/") || file.type.startsWith("audio/")
          ? URL.createObjectURL(file)
          : "";

        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: file,
        }));

        setJobFiles((prevJobFiles) =>
          prevJobFiles.map((fileItem) =>
            fileItem.key === name
              ? { ...fileItem, current: file.name, preview: previewURL }
              : fileItem
          )
        );
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: event.target.value,
      }));
    }
  };

  const handleResetUploadFile = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    const name = (event.target as HTMLParagraphElement).dataset.name; // Obtén el atributo "name"
    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: null,
      }));

      setJobFiles((prevJobFiles) =>
        prevJobFiles.map((file) =>
          file.key === name ? { ...file, current: "", preview: "" } : file
        )
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await createJob(formData);
      setAlertMessage(
        (response as unknown as StandardResponseInterface).message
      );
      setError(null);
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
      navigate(toEditPage);
    }
  };

  const handleToEditPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(toEditPage);
  };

  return (
    <main className="edit__job__form">
      <h1>{t("admin.create_job")}</h1>
      {alertMessage && (
        <CustomAlert
          type={error ? "error" : "success"}
          onClick={handleCloseAlert}
        >
          {alertMessage}
        </CustomAlert>
      )}
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
              value={formData.title}
              onChange={handleFormOnChange}
              name="title"
              id="title"
              placeholder={t("admin.job_title")}
              max-length={TITLE_MAX_LENGTH}
            />
            <p>{`${formData.title.length} / ${TITLE_MAX_LENGTH} ${t(
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
              value={formData.info}
              onChange={handleFormOnChange}
              name="info"
              id="info"
              placeholder={t("admin.job_excerpt")}
            />
            <p>{`${formData.info.length} / ${EXCERPT_MAX_LENGTH} ${t(
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
              value={formData.description}
              onChange={handleFormOnChange}
              name="description"
              id="description"
              placeholder={t("admin.job_excerpt")}
              max-length={DESCRIPTION_MAX_LENGTH}
            />
            <p>{`${formData.description.length} / ${DESCRIPTION_MAX_LENGTH} ${t(
              "generic.characters"
            )}`}</p>
          </div>
        </fieldset>
        <fieldset className="form__fieldset last__fieldset">
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
              value={formData.launchPeriod}
              onChange={handleFormOnChange}
              name="launchPeriod"
              id="launchPeriod"
              placeholder={t("admin.launch_period")}
            />
          </div>
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
              value={formData.customer}
              onChange={handleFormOnChange}
              name="customer"
              id="customer"
              placeholder={t("admin.customer")}
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
              value={formData.linkToUrl}
              onChange={handleFormOnChange}
              name="linkToUrl"
              id="linkToUrl"
              placeholder={t("admin.link_to_url")}
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
              value={formData.linkToGitHub}
              onChange={handleFormOnChange}
              name="linkToGitHub"
              id="linkToGitHub"
              placeholder={t("admin.link_to_github")}
            />
          </div>
        </fieldset>
        <fieldset className="form__fieldset last__fieldset">
          <legend>
            <h3>{t("admin.job_type")}</h3>
          </legend>
          <div className="form__fieldset__field">
            <label
              className="form__label"
              htmlFor="category"
            >
              <h4>{t("generic.category")}</h4>
            </label>
            <select
              className="form__select"
              value={formData.category}
              onChange={handleFormOnChange}
              name="category"
              id="category"
              multiple
            >
              {VALID_CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {t(`generic.${category}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="form__fieldset__field">
            <label
              className="form__label"
              htmlFor="technologies"
            >
              <h4>{t("admin.technologies")}</h4>
            </label>
            <input
              className="form__input last__input"
              type="text"
              value={
                Array.isArray(formData.technologies)
                  ? formData.technologies.join(", ")
                  : formData.technologies
              }
              onChange={handleFormOnChange}
              name="technologies"
              id="technologies"
              placeholder={t("admin.technologies")}
            />
          </div>
        </fieldset>
        <fieldset className="form__fieldset last__fieldset">
          <legend>
            <h3>{t("admin.job_files")}</h3>
          </legend>
          {jobFiles.map((fileItem) => (
            <div
              className="form__fieldset__field last__input "
              key={fileItem.key}
            >
              <div className="file__section__container">
                <label
                  className="form__label"
                  htmlFor={fileItem.key}
                >
                  <h4>{fileItem.title}</h4>
                  {fileItem.preview && (
                    <div className="form__file__is__uploaded">
                      {fileItem.preview.startsWith("blob:") &&
                      fileItem.current &&
                      fileItem.current.endsWith(".mp4") ? (
                        <video
                          controls
                          src={fileItem.preview}
                        />
                      ) : fileItem.preview.startsWith("blob:") &&
                        fileItem.current &&
                        fileItem.current.endsWith(".mp3") ? (
                        <audio
                          controls
                          src={fileItem.preview}
                        />
                      ) : (
                        <img
                          src={fileItem.preview}
                          alt={`${fileItem.title} preview`}
                        />
                      )}
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

                {!fileItem.current && (
                  <>
                    <input
                      className="form__input form__file"
                      type="file"
                      id={fileItem.key}
                      onChange={handleFormOnChange}
                      name={fileItem.key}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor={fileItem.key}
                      className="file-upload-label form__file__button"
                    >
                      {t("generic.choose_a_file")}
                    </label>
                  </>
                )}
              </div>
            </div>
          ))}
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
    </main>
  );
};

export default CreateJob;
