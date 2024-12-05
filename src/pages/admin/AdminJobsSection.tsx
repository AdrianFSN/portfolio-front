import { useTranslation } from "react-i18next";
import { JobExample } from "../../@types/jobExample";
import {
  EDIT_ROUTES_PATH,
  IMG_THUMBNAILS_DB_PATH,
  ORIGIN,
} from "../../utils/constants";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteJobThunk } from "../../store/thunks/jobDetailThunk";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
import {
  getJobDetailErrorSelector,
  getJobDetailLoadingSelector,
  getJobDetailMessageSelector,
} from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import { useEffect, useState } from "react";
import { resetJobDetail } from "../../store/slices/jobDetailSlice";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import RegularButton from "../../components/shared/buttons/RegularButton";
import imgNotAvailable from "../../assets/thumb_img_not_available.jpg";
import { useNavigate } from "react-router-dom";

interface AdminJobsSectionProps {
  jobsList: JobExample[];
  category: string;
}

const AdminJobsSection: React.FC<AdminJobsSectionProps> = ({
  jobsList,
  category,
}) => {
  const { t } = useTranslation();
  const imgUrlPath = `${IMG_THUMBNAILS_DB_PATH}`;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const origin = ORIGIN;
  const filteredList = jobsList
    ? jobsList.filter((jobExample) => jobExample.category.includes(category))
    : [];
  const error = useSelector(getJobDetailErrorSelector);
  const successMessage = useSelector(getJobDetailMessageSelector);
  const isLoading = useSelector(getJobDetailLoadingSelector);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [jobToDelete, setJobToDelete] = useState("");
  const [jobToEdit, setJobToEdit] = useState("");
  const toEditForm = `${EDIT_ROUTES_PATH}/job/${jobToEdit}`;

  useEffect(() => {
    if (!error && successMessage) {
      setAlertMessage(successMessage);
    } else {
      setAlertMessage(error as string);
    }
  }, [successMessage, error]);

  useEffect(() => {
    if (jobToEdit) {
      navigate(toEditForm);
      setJobToEdit("");
    }
  }, [jobToEdit, navigate, toEditForm]);

  const handleConfirmDeleteJob = (jobId: string) => {
    setConfirmDeletion(true);
    setJobToDelete(jobId);
  };

  const handleDeleteJob = async (jobId: string) => {
    await dispatch(deleteJobThunk({ jobId }));
    await dispatch(getJobExamplesListThunk({ limit: "1000" }));
    setConfirmDeletion(false);
  };

  const handleEditJob = (jobId: string) => {
    setJobToEdit(jobId);
  };

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertMessage("");
    dispatch(resetJobDetail());
  };

  return (
    <section>
      {alertMessage && (
        <CustomAlert
          type={error ? "error" : "success"}
          onClick={handleCloseAlert}
        >
          {alertMessage}
        </CustomAlert>
      )}
      {isLoading && <CustomPulseLoader isLoading={isLoading} />}
      {!isLoading && filteredList && filteredList.length > 0 ? (
        <section>
          <ul>
            {filteredList.map((jobExample) => (
              <li key={jobExample._id}>
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={
                      jobExample.pictures.mainPicture
                        ? `${imgUrlPath}${encodeURIComponent(
                            jobExample.pictures.mainPicture
                          )}`
                        : imgNotAvailable
                    }
                  />
                  <img
                    src={
                      jobExample.pictures.mainPicture
                        ? `${imgUrlPath}${encodeURIComponent(
                            jobExample.pictures.mainPicture
                          )}`
                        : imgNotAvailable
                    }
                    alt={jobExample.versions[0].title}
                    crossOrigin={origin}
                  />
                </picture>
                <p>{jobExample.versions[0].title}</p>
                <section className="admin__edit__icons_container">
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => handleEditJob(jobExample._id)}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleConfirmDeleteJob(jobExample._id)}
                  ></i>
                </section>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p>{t("generic.empty_section")}</p>
      )}
      {confirmDeletion && (
        <section className="confirm__delete__job__overlay">
          <div className="overlay__content">
            <div className="overlay__message">
              {t("generic.confirm_deletion")}
            </div>
            <span className="overlay__buttons">
              <RegularButton onClick={() => setConfirmDeletion(false)}>
                {t("generic.cancel")}
              </RegularButton>{" "}
              <RegularButton
                $skin="danger"
                onClick={() => handleDeleteJob(jobToDelete)}
              >
                {t("generic.yes")}
              </RegularButton>
            </span>
          </div>
        </section>
      )}
    </section>
  );
};
export default AdminJobsSection;
