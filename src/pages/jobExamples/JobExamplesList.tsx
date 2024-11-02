import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
import { AppDispatch } from "../../store/store";
import {
  getJobExamplesListSelector,
  getJobsListLoadingSelector,
  getJobsListMessageSelector,
  getJobsListStateSelector,
} from "../../store/selectors/selectors";
import { JobExample } from "../../@types/jobExample";
import { ORIGIN, IMG_THUMBNAILS_DB_PATH } from "../../utils/constants";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import convertStringToIcon from "../../utils/convertStringToIcon";
import icons from "../../utils/icons";

interface JobExamplesListProps {
  category: string;
}

const JobExamplesList: React.FC<JobExamplesListProps> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const jobsList: JobExample[] | undefined = useSelector(
    getJobExamplesListSelector
  );
  const origin = ORIGIN;
  const jobsMessage = useSelector(getJobsListMessageSelector);
  const jobsState = useSelector(getJobsListStateSelector);
  const [isError, setIsError] = useState(false);
  const isLoading = useSelector(getJobsListLoadingSelector);

  const imgUrlPath = `${IMG_THUMBNAILS_DB_PATH}`;

  useEffect(() => {
    dispatch(getJobExamplesListThunk(category));
  }, [category, dispatch]);

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
              {jobsList?.map((jobExample) => (
                <li key={jobExample._id}>
                  <picture className="porfolio__item__picture">
                    <source
                      media="(max-width: 767px)"
                      srcSet={`${imgUrlPath}${encodeURIComponent(
                        jobExample.pictures.mainPicture
                      )}`}
                    />

                    <img
                      src={`${imgUrlPath}${encodeURIComponent(
                        jobExample.pictures.mainPicture
                      )}`}
                      alt={jobExample.versions[0].title}
                      crossOrigin={origin}
                    />
                  </picture>
                  <div className="porfolio__img__caption">
                    <h3>{jobExample.versions[0].title}</h3>
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
                    <p>{jobExample.linkToUrl ? jobExample.linkToUrl : ""}</p>
                    <p>
                      {jobExample.linkToGitHub ? jobExample.linkToGitHub : ""}
                    </p>
                    <p>{jobExample.versions[0].info}</p>
                  </div>
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
