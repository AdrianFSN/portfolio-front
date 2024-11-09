import { useSelector } from "react-redux";
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
    <>
      <section key={jobId}>
        {job && jobFiles.length > 0 && (
          <section>
            <JobDetailCaroussel
              items={jobFiles}
              autoPlay={false}
            />
          </section>
        )}
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
                jobVersion?.technologies && jobVersion?.technologies.length > 0
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
    </>
  );
};

export default JobDetail;
