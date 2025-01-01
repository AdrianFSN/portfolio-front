import { useTranslation } from "react-i18next";
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
import launchPeriodFormatter from "../../utils/launchPeriodFormatter";
import MarkdownRenderer from "../../components/shared/MarkdownRenderer";

interface JobDetailProps {
  jobId: string;
  job: JobExample;
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId, job }) => {
  const { t } = useTranslation();
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
            <section
              className={
                jobVersion?.technologies && jobVersion?.technologies.length < 4
                  ? "porfolio__icons__tech__short"
                  : "porfolio__icons__tech"
              }
            >
              {jobVersion?.technologies.map((tech) => {
                const iconClass = convertStringToIcon(tech, icons);

                return iconClass ? (
                  <p
                    key={tech}
                    className={`porfolio__icon ${iconClass}`}
                  />
                ) : (
                  <p
                    className="tech__text"
                    key={tech}
                  >
                    {" "}
                    {tech}
                  </p>
                );
              })}
            </section>
          </div>
          <section className="job__detail__text__section">
            <section className="info__and__description">
              <MarkdownRenderer content={jobVersion?.info as string} />
              <MarkdownRenderer content={jobVersion?.description as string} />
            </section>
            <ul className="job__detail__list">
              <li className={jobVersion?.customer ? "" : "hidden"}>
                <strong>{t("generic.customer")}: </strong>
                {jobVersion?.customer}
              </li>
              <li>
                <strong>{t("generic.date")}: </strong>
                {launchPeriodFormatter(job.launchPeriod)}
              </li>
              <li>
                <strong>{t("generic.url")}: </strong>
                {job.linkToUrl ? (
                  <a
                    href={job.linkToUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{t("generic.go_to_url")} </strong>
                  </a>
                ) : (
                  t("generic.not_available")
                )}
              </li>
              <li>
                <strong>{t("generic.git_url")}: </strong>
                {job.linkToGitHub ? (
                  <a
                    href={job.linkToGitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{t("generic.go_to_git_url")} </strong>
                  </a>
                ) : (
                  t("generic.not_available")
                )}
              </li>
            </ul>
          </section>
        </section>
      </section>
    </main>
  );
};

export default JobDetail;
