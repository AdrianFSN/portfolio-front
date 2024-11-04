import JobPagesProps from "../../@types/JobPages";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
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

      {jobs && jobs.length > 0 && (
        <>
          <section className="caroussel">
            <JobsCaroussel
              items={jobs}
              autoPlay={true}
            />
          </section>
          <section className="examples__showcase">
            <JobExamplesList />
          </section>
        </>
      )}
    </main>
  );
};

export default Development;
