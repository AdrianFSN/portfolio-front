import { useSelector } from "react-redux";
import "./JobDetail.css";
import {
  getJobDetailAudiosSelector,
  getJobDetailImagesSelector,
  getJobDetailVideosSelector,
} from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import convertStringToIcon from "../../utils/convertStringToIcon";
import icons from "../../utils/icons";
import { useEffect, useState } from "react";
import { JobExample } from "../../@types/jobExample";
import JobDetailCaroussel from "./JobDetailCaroussel";

interface JobDetailProps {
  jobId: string;
  job: JobExample;
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId, job }) => {
  const pictures = useSelector(getJobDetailImagesSelector);
  const audios = useSelector(getJobDetailAudiosSelector);
  const videos = useSelector(getJobDetailVideosSelector);
  const jobVersion = job ? job.versions[0] : undefined;
  const [jobFiles, setJobFiles] = useState<string[]>([]);

  useEffect(() => {
    if ((job && job.pictures) || job.videos || job.audios) {
      setJobFiles([...pictures, ...videos, ...audios]);
    }
  }, [pictures, videos, audios, job]);

  console.log("Esto es jobFiles: ", jobFiles);

  return (
    <main className="porfolio__main">
      <section key={jobId}>
        {job && jobFiles.length > 0 && (
          <section>
            <JobDetailCaroussel
              items={jobFiles}
              autoPlay={false}
            />
          </section>
        )}
        <section className="job__detail">
          <h3>{jobVersion?.title}</h3>

          <div
            className={
              jobVersion?.technologies && jobVersion?.technologies.length > 0
                ? ""
                : "hidden"
            }
          >
            <div className="porfolio__icons__tech">
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
          <div className="job__detail__text__section">
            <p>{jobVersion?.info}</p>
            <ul className="job__detail__list">
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
          </div>
        </section>
      </section>
    </main>
  );
};

export default JobDetail;
