import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobsListErrorSelector,
  getJobsListLoadingSelector,
  getJobsListMessageSelector,
} from "../../store/selectors/selectors";
import JobExamplesListProps from "../../@types/jobExamplesListProps";
import {
  ORIGIN,
  IMG_THUMBNAILS_DB_PATH,
  JOB_ROUTES_URI,
} from "../../utils/constants";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import convertStringToIcon from "../../utils/convertStringToIcon";
import icons from "../../utils/icons";
import imgNotAvailable from "../../assets/img_not_available.jpg";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import { resetJobExamples } from "../../store/slices/jobExamplesSlice";
import launchPeriodFormatter from "../../utils/launchPeriodFormatter";

const JobExamplesList: React.FC<JobExamplesListProps> = ({ jobs }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const origin = ORIGIN;
  const successMessage = useSelector(getJobsListMessageSelector);
  const error = useSelector(getJobsListErrorSelector);
  const isLoading = useSelector(getJobsListLoadingSelector);
  const [alertMessage, setAlertMessage] = useState("");
  const [isEmptyList, setIsEmptyList] = useState(false);
  const navigate = useNavigate();
  const imgUrlPath = `${IMG_THUMBNAILS_DB_PATH}`;

  useEffect(() => {
    if (jobs && jobs.length === 0) {
      setIsEmptyList(true);
    } else {
      setIsEmptyList(false);
    }
  }, [jobs, jobs?.length]);

  useEffect(() => {
    if (error) {
      setAlertMessage(error as string);
    }
  }, [successMessage, error]);

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertMessage("");
    dispatch(resetJobExamples());
  };

  return (
    <>
      {isLoading && (
        <CustomPulseLoader
          isLoading={isLoading}
          $customHeight="100px"
        />
      )}
      {alertMessage && (
        <CustomAlert
          type={error ? "error" : "success"}
          onClick={handleCloseAlert}
        >
          {alertMessage}
        </CustomAlert>
      )}
      {!isEmptyList ? (
        <section className="porfolio__grid">
          <div className="porfolio__grid__panel">
            <ul className="porfolio__grid__panel__item__list">
              {jobs?.map((jobExample) => (
                <li key={jobExample._id}>
                  <picture
                    className="porfolio__item__picture"
                    onClick={() =>
                      navigate(`/${JOB_ROUTES_URI}/${jobExample._id}`)
                    }
                  >
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
                  <div className="porfolio__img__caption">
                    <h3>{jobExample.versions[0].title}</h3>
                  </div>
                  <div className="porfolio__icons__tech">
                    {jobExample.versions[0].technologies.map((tech) => {
                      const iconClass = convertStringToIcon(tech, icons);

                      return iconClass ? (
                        <span
                          key={tech}
                          className={`porfolio__icon ${iconClass}`}
                        />
                      ) : (
                        <span key={tech}> {tech}</span>
                      );
                    })}
                  </div>
                  <p className={jobExample.linkToUrl ? "" : "hidden"}>
                    <a
                      href={jobExample.linkToUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {jobExample.linkToUrl}
                    </a>
                  </p>
                  <p className={jobExample.linkToGitHub ? "" : "hidden"}>
                    <a
                      href={jobExample.linkToGitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {jobExample.linkToGitHub}
                    </a>
                  </p>
                  <p>
                    <strong>{t("generic.customer")}:</strong>{" "}
                    {jobExample.versions[0].customer}
                  </p>
                  <p>
                    <strong>{t("generic.date")} </strong>{" "}
                    {launchPeriodFormatter(jobExample.launchPeriod)}
                  </p>
                  <p>{jobExample.versions[0].info}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div>{successMessage}</div>
      )}
    </>
  );
};

export default JobExamplesList;
