import { useSelector } from "react-redux";
import {
  getJobDetailMessageSelector,
  getJobDetailSelector,
} from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { IMAGES_DB_PATH, ORIGIN } from "../../utils/constants";
import convertStringToIcon from "../../utils/convertStringToIcon";
import icons from "../../utils/icons";

interface JobDetailProps {
  jobId: string;
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId }) => {
  const origin = ORIGIN;
  const job = useSelector(getJobDetailSelector);
  const jobMessage = useSelector(getJobDetailMessageSelector);
  const imgUrlPath = IMAGES_DB_PATH;
  const jobVersion = job ? job.versions[0] : undefined;

  return (
    <>
      {job ? (
        <section key={jobId}>
          <section>
            <picture>
              <img
                src={`${imgUrlPath}${job.pictures.mainPicture}`}
                alt={job.versions[0].title}
                crossOrigin={origin}
              />
            </picture>
          </section>
          <section>
            <h3>{jobVersion?.title}</h3>
            <div>
              <p>{jobVersion?.info}</p>
              <ul>
                <li className={job.linkToUrl ? "" : "hidden"}>
                  <a
                    href={job.linkToUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {job.linkToUrl}
                  </a>
                </li>
                <li className={job.linkToGitHub ? "" : "hidden"}>
                  <a
                    href={job.linkToGitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {job.linkToGitHub}
                  </a>
                </li>
                <li className={jobVersion?.customer ? "" : "hidden"}>
                  <strong>Customer: </strong>
                  {jobVersion?.customer}
                </li>
                <li>
                  <strong>Date: </strong>
                  {job.launchPeriod}
                </li>
              </ul>
              <div
                className={
                  jobVersion?.technologies &&
                  jobVersion?.technologies.length > 0
                    ? ""
                    : "hidden"
                }
              >
                {jobVersion?.technologies.map((tech) => {
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
            </div>
          </section>
        </section>
      ) : (
        <div>{jobMessage}</div>
      )}
    </>
  );
};

export default JobDetail;
