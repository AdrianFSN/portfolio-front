import "../jobExamples/jobExamples.css";
import JobPagesProps from "../../@types/JobPages";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
import JobsCaroussel from "../jobExamples/JobsCaroussel";
import { JobExample } from "../../@types/jobExample";
import {
  getJobExamplesListSelector,
  getJobsListCurrentPageSelector,
  getJobsListMessageSelector,
  getJobsListTotalPagesSelector,
} from "../../store/selectors/selectors";
import JobExamplesList from "../jobExamples/JobExamplesList";
import PageController from "../../components/shared/controllers/PageController";

const Development: React.FC<JobPagesProps> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const jobs: JobExample[] | undefined = useSelector(
    getJobExamplesListSelector
  );
  const jobsMessages = useSelector(getJobsListMessageSelector);
  const jobsCurrentPage = useSelector(getJobsListCurrentPageSelector);
  const jobsTotalPages = useSelector(getJobsListTotalPagesSelector);
  const [page, setPage] = useState(1);
  const limit = "1";

  useEffect(() => {
    dispatch(
      getJobExamplesListThunk({ category, page: page?.toString(), limit })
    );
  }, [category, dispatch, page, limit]);

  const handleNextPage = () => {
    setPage((page % jobsTotalPages) + 1);
  };
  const handlePrevPage = () => {
    setPage(((page - 2 + jobsTotalPages) % jobsTotalPages) + 1);
  };

  return (
    <main className="porfolio__main">
      <h1>Development</h1>

      {jobs && jobs.length > 0 ? (
        <>
          <section className="caroussel">
            <JobsCaroussel
              items={jobs}
              autoPlay={true}
            />
          </section>
          <section className="jobs__collection__title">
            <h2>Jobs Collection</h2>
          </section>
          <section className="examples__showcase">
            <PageController
              page={page ? page : 1}
              limit={limit ? limit : "5"}
              prev={handlePrevPage}
              next={handleNextPage}
              currentPage={jobsCurrentPage}
              totalPages={jobsTotalPages}
            >
              <JobExamplesList />
            </PageController>
          </section>
        </>
      ) : (
        <div className="jobs__messages">
          <p>{jobsMessages}</p>
        </div>
      )}
    </main>
  );
};

export default Development;
