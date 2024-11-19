import { useEffect, useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import { VALID_CATEGORIES } from "../../utils/constants";
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

  const [textData, setTextData] = useState({
    launchPeriod: "",
    linkToUrl: "",
    linkToGitHub: "",
    category: [],
  });

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    console.log("Esto es textData: ", textData);
  }, [textData]);

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

  const handleSubmit = () => {};

  return (
    <main className="edit__job__form">
      <h1>{t("admin.edit_job")}</h1>
      {job && (
        <>
          <h2>{job.versions[0].title}</h2>
          <form
            className="job__form"
            noValidate
            onSubmit={handleSubmit}
          >
            <fieldset className="form__fieldset">
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
                  value={textData.launchPeriod}
                  onChange={handleTextOnChange}
                  name="launchPeriod"
                  id="launchPeriod"
                  placeholder={
                    job.launchPeriod
                      ? job.launchPeriod
                      : t("admin.launch_period")
                  }
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
                  value={textData.linkToUrl}
                  onChange={handleTextOnChange}
                  name="linkToUrl"
                  id="linkToUrl"
                  placeholder={
                    job.linkToUrl ? job.linkToUrl : t("admin.link_to_url")
                  }
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
              <div className="form__fieldset__field">
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

export default EditJob;
