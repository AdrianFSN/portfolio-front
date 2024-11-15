import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getJobsListLoadingSelector,
  getJobsListMessageSelector,
  getJobsListStateSelector,
} from "../../store/selectors/selectors";
import JobExamplesListProps from "../../@types/jobExamplesListProps";
import { ORIGIN, IMG_THUMBNAILS_DB_PATH } from "../../utils/constants";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import convertStringToIcon from "../../utils/convertStringToIcon";
import icons from "../../utils/icons";
import imgNotAvailable from "../../assets/img_not_available.jpg";

const JobExamplesList: React.FC<JobExamplesListProps> = ({ jobs }) => {
  const origin = ORIGIN;
  const jobsMessage = useSelector(getJobsListMessageSelector);
  const jobsState = useSelector(getJobsListStateSelector);
  const [isError, setIsError] = useState(false);
  const isLoading = useSelector(getJobsListLoadingSelector);

  const imgUrlPath = `${IMG_THUMBNAILS_DB_PATH}`;

  useEffect(() => {
    if (jobsState === "error") {
      setIsError(true);
    }
  }, [jobsState]);

  return (
    <>
      {isLoading && (
        <CustomPulseLoader
          isLoading={isLoading}
          $customHeight="100px"
        />
      )}
      {!isError ? (
        <section className="porfolio__grid">
          <div className="porfolio__grid__panel">
            <ul className="porfolio__grid__panel__item__list">
              {jobs?.map((jobExample) => (
                <li key={jobExample._id}>
                  <picture className="porfolio__item__picture">
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
                    <strong>Customer:</strong> {jobExample.versions[0].customer}
                  </p>
                  <p>
                    <strong>Date: </strong> {jobExample.launchPeriod}
                  </p>
                  <p>{jobExample.versions[0].info}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div>{jobsMessage}</div>
      )}
    </>
  );
};

export default JobExamplesList;
