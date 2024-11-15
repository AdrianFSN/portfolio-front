import { useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import { EXCERPT_MAX_CHARS, TITLE_MAX_CHARS } from "../../utils/constants";

interface EditJobProps {
  jobId: string;
}

const EditJob: React.FC<EditJobProps> = ({ jobId }) => {
  const { t } = useTranslation();
  const isLoading = false;
  const [inputTitle, setInputTitle] = useState("");
  const [inputExcerpt, setInputExcerpt] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

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
            <h3>{t("admin.edit_job")}</h3>
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
              max-length={50}
            />
            <p>{`${inputExcerpt.length} / ${EXCERPT_MAX_CHARS} ${t(
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
              max-length={200}
            />
            <p>{`${inputExcerpt.length} / ${EXCERPT_MAX_CHARS} ${t(
              "generic.characters"
            )}`}</p>
          </div>
        </fieldset>
        <RegularButton
          className="btn form__button"
          disabled={disableSubmit}
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
