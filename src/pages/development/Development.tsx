import JobPagesProps from "../../@types/JobPages";
//import JobExamplesList from "../jobExamples/JobExamplesList";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
//import JobsCarrousel from "../jobExamples/JobsCarrousel";
import JobsCaroussel from "../jobExamples/JobsCaroussel";
import { JobExample } from "../../@types/jobExample";
import { getJobExamplesListSelector } from "../../store/selectors/selectors";
import JobExamplesList from "../jobExamples/JobExamplesList";

const Development: React.FC<JobPagesProps> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const jobs: JobExample[] | undefined = useSelector(
    getJobExamplesListSelector
  );

  useEffect(() => {
    dispatch(getJobExamplesListThunk(category));
  }, [category, dispatch]);

  return (
    <main className="porfolio__main">
      <h1>Development</h1>
      <section className="examples__showcase">
        {jobs && jobs.length > 0 && (
          <>
            <JobsCaroussel
              items={jobs}
              autoPlay={true}
            />
            <JobExamplesList />
          </>
        )}
      </section>
    </main>
  );
};

export default Development;
