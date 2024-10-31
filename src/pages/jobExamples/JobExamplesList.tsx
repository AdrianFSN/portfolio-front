import { useEffect } from "react";
//import JobExample from "../../@types/jobExample";
import { useDispatch, useSelector } from "react-redux";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
import { AppDispatch } from "../../store/store";
import {
  getJobExamplesListSelector,
  getJobsListMessageSelector,
  getJobsListStateSelector,
} from "../../store/selectors/selectors";
import { JobExample } from "../../@types/jobExample";
import { IMAGES_DB_PATH } from "../../utils/constants";
//import Jobs from "../../@types/jobs";
//import { JobExample } from "../../@types/jobExample";

interface JobExamplesListProps {
  category: string;
}

const JobExamplesList: React.FC<JobExamplesListProps> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const jobsList: JobExample[] | undefined = useSelector(
    getJobExamplesListSelector
  );
  const origin = import.meta.env.VITE_API_BASE_URL;
  const jobsMessage = useSelector(getJobsListMessageSelector);
  const jobsState = useSelector(getJobsListStateSelector);
  console.log("Esto es jobsList: ", jobsList);
  console.log("Esto es jobsMessage ", jobsMessage);
  console.log("Esto es jobsState: ", jobsState);
  const imgURL = `${IMAGES_DB_PATH}`;
  //const imagenica = `${jobsList[0].pictures.mainPicture}`;
  console.log("Esto es imgURL: ", imgURL);
  //console.log("Esto es imagenica: ", imagenica);
  //console.log("Esto es la ruta de la img: ", `${imgURL}${imagenica}`);
  //const [jobExamplesList, setJobExamplesList] = useState<JobExample[]>([]);

  useEffect(() => {
    dispatch(getJobExamplesListThunk(category));
  }, [category, dispatch]);
  return (
    <div className="portfolio__main">
      <section className="portfolio__grid">
        <div>
          <h1>Development</h1>
        </div>
        <div className="portfolio__grid__panel">
          <ul className="portfolio__grid__panel__item__list">
            {jobsList?.map((jobExample) => (
              <li key={jobExample._id}>
                <picture className="portfolio__item__picture">
                  <source
                    media="(max-width: 767px)"
                    srcSet={`${imgURL}${encodeURIComponent(
                      jobExample.pictures.mainPicture
                    )}`}
                  />

                  <img
                    src={`${imgURL}${encodeURIComponent(
                      jobExample.pictures.mainPicture
                    )}`}
                    alt="hola"
                    crossOrigin={origin}
                  />
                </picture>
                <div className="portfolio__img__caption">
                  <h3>{jobExample.versions[0].title}</h3>
                  <p>{jobExample.versions[0].technologies}</p>
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
    </div>
  );
};

export default JobExamplesList;
