import { useEffect, useState } from "react";
import "./EditJob.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetailSelector } from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";
import { AppDispatch } from "../../store/store";
import { useParams } from "react-router-dom";

const EditJobAudios = () => {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = false;
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
    console.log("Esto es videosData: ", audiosData);
  }, [audiosData]);

  console.log("Este es el job que voy a editar: ", job);

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
                              onChange={handleAudiosOnChange}
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

export default EditJobAudios;
