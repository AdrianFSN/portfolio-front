import { useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import {
  EXCERPT_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  VALID_CATEGORIES,
} from "../../utils/constants";
import { useSelector } from "react-redux";
import { getJobDetailSelector } from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";

interface EditJobProps {
  jobId?: string;
}

const EditJob: React.FC<EditJobProps> = ({ jobId }) => {
  const { t } = useTranslation();
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
  const job = useSelector(getJobDetailSelector);

  console.log("Este es el job que voy a editar: ", job);

  const handleSubmit = () => {};

  return (
    <main className="edit__job__form">
      <h1>{t("admin.edit_job")}</h1>
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
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              name="Title"
              id="title"
              placeholder={t("admin.job_title")}
              max-length={TITLE_MAX_LENGTH}
            />
            <p>{`${inputExcerpt.length} / ${TITLE_MAX_LENGTH} ${t(
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
              value={inputExcerpt}
              onChange={(e) => setInputExcerpt(e.target.value)}
              name="Excerpt"
              id="excerpt"
              placeholder={t("admin.job_excerpt")}
              max-length={EXCERPT_MAX_LENGTH}
            />
            <p>{`${inputExcerpt.length} / ${EXCERPT_MAX_LENGTH} ${t(
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
              value={inputLaunchPeriod}
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
              value={inputCustomer}
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
              value={inputLinkToUrl}
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
              value={inputLinkToGithub}
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
              value={inputTechnologies}
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
          <div className="login__fieldset__field">
            <label
              className="form__label"
              htmlFor="mainPicture"
            >
              <h4>{t("admin.main_picture")}</h4>
            </label>
            <input
              className="form__input form__file"
              type="file"
              id="mainPicture"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setInputMainPicture(
                  file ? file.name : `${t("generic.no_file_chosen")}`
                );
              }}
              name="MainPicture"
              style={{ display: "none" }}
            />

            <label
              htmlFor="mainPicture"
              className="file-upload-label form__file__button"
            >
              {inputMainPicture || t("generic.choose_a_file")}
            </label>
          </div>
          <div className="login__fieldset__field">
            <label
              className="form__label"
              htmlFor="picture2"
            >
              <h4>{t("admin.picture2")}</h4>
            </label>
            <input
              className="form__input form__file"
              type="file"
              id="picture2"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setInputPicture2(
                  file ? file.name : `${t("generic.no_file_chosen")}`
                );
              }}
              name="Picture2"
              style={{ display: "none" }}
            />
            <div>
              <label
                htmlFor="picture2"
                className="file-upload-label form__file__button"
              >
                {inputPicture2 || t("generic.choose_a_file")}
              </label>
              <span>
                <input
                  type="checkbox"
                  id="deleteMainPicture"
                  name="DeleteMainPicture"
                  checked={false}
                />
                <label
                  htmlFor="deleteMainPicture"
                  className="form__label"
                >
                  {t("admin.delete_old_file")}
                </label>
              </span>
            </div>
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
    </main>
  );
};

export default EditJob;
