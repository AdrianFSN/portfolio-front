import { useSelector } from "react-redux";
import { getJobExamplesListSelector } from "../../store/selectors/selectors";
import { JobExample } from "../../@types/jobExample";
import { useState, useEffect } from "react";
import CarouselControls from "../../components/shared/caroussel/CarouselControls";
import { IMG_THUMBNAILS_DB_PATH, ORIGIN } from "../../utils/constants";
import convertStringToIcon from "../../utils/convertStringToIcon";
import icons from "../../utils/icons";
import getCircularIndex from "../../utils/getCircularIndex";

const JobsCarrousel = () => {
  const jobs: JobExample[] | undefined = useSelector(
    getJobExamplesListSelector
  );
  const origin = ORIGIN;
  const imgUrlPath = `${IMG_THUMBNAILS_DB_PATH}`;
  const [pointer, setPointer] = useState(0);
  const [displayedJobs, setDisplayedJobs] = useState<JobExample[]>([]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setDisplayedJobs([
        jobs[getCircularIndex(pointer - 1, jobs.length)],
        jobs[getCircularIndex(pointer, jobs.length)],
        jobs[getCircularIndex(pointer + 1, jobs.length)],
      ]);
    }
  }, [pointer, jobs]);

  return (
    <>
      {jobs && jobs.length > 0 && (
        <section>
          <section>
            <ul className="">
              {displayedJobs.map((job) => (
                <li key={job._id}>
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet={`${imgUrlPath}${encodeURIComponent(
                        job.pictures.mainPicture
                      )}`}
                    />
                    <img
                      src={`${imgUrlPath}${encodeURIComponent(
                        job.pictures.mainPicture
                      )}`}
                      alt={job.versions[0].title}
                      crossOrigin={origin}
                    />
                  </picture>
                  <div className="porfolio__img__caption">
                    <h3>{job.versions[0].title}</h3>
                    <div className="porfolio__icons__tech">
                      {job.versions[0].technologies.map((tech) => {
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
                    <p>
                      {job.linkToUrl && (
                        <a
                          href={job.linkToUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {job.linkToUrl}
                        </a>
                      )}
                    </p>
                    <p>
                      {job.linkToGitHub && (
                        <a
                          href={job.linkToGitHub}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {job.linkToGitHub}
                        </a>
                      )}
                    </p>
                    <p>{job.versions[0].info}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <CarouselControls
              pointer={pointer}
              itemsLength={jobs.length}
              setPointer={setPointer}
            />
          </section>
        </section>
      )}
    </>
  );
};

export default JobsCarrousel;
