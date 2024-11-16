import { useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import { EXCERPT_MAX_LENGTH, TITLE_MAX_LENGTH } from "../../utils/constants";
import { useSelector } from "react-redux";
import { getJobExamplesListSelector } from "../../store/selectors/selectors";

interface EditJobProps {
  jobId: string;
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
  const job = useSelector(getJobExamplesListSelector).find(
    (job) => job._id === jobId
  );

  console.log("Este es el job que voy a editar: ", job);
  const handleSubmit = () => {};

  return (
    <main className="edit__job__form">
      <form
        className="job__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2>{t("admin.edit_job")}</h2>
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
