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
  getjobsCarousselMessageSelector,
  getjobsCarousselSelector,
  getJobsListCurrentPageSelector,
  getJobsListMessageSelector,
  getJobsListTotalPagesSelector,
} from "../../store/selectors/selectors";
import JobExamplesList from "../jobExamples/JobExamplesList";
import PageController from "../../components/shared/controllers/PageController";
import { LIMIT_DEFAULT } from "../../utils/constants";
import { updateLimitByScreenSize } from "../../utils/updateLimitByScreenSize";
import { getJobsCarousselThunk } from "../../store/thunks/jobsCarousselThunk";

const Development: React.FC<JobPagesProps> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const jobsCaroussel = useSelector(getjobsCarousselSelector);
  const jobs: JobExample[] | undefined = useSelector(
    getJobExamplesListSelector
  );
  const jobsMessages = useSelector(getJobsListMessageSelector);
  const jobsCurrentPage = useSelector(getJobsListCurrentPageSelector);
  const jobsTotalPages = useSelector(getJobsListTotalPagesSelector);
  const carousselMessages = useSelector(getjobsCarousselMessageSelector);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_DEFAULT);

  useEffect(() => {
    updateLimitByScreenSize(setLimit);
    const handleResize = () => updateLimitByScreenSize(setLimit);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(getJobsCarousselThunk({ category }));
  }, [category, dispatch]);

  useEffect(() => {
    dispatch(
      getJobExamplesListThunk({ category, page: page?.toString(), limit })
    );
  }, [category, dispatch, page, limit]);

  const handleNextPage = () => {
    setPage(((page as number) % jobsTotalPages) + 1);
  };
  const handlePrevPage = () => {
    setPage((((page as number) - 2 + jobsTotalPages) % jobsTotalPages) + 1);
  };

  return (
    <main className="porfolio__main">
      <h1>Development</h1>
      {jobsCaroussel && jobsCaroussel.length > 0 ? (
        <section className="caroussel">
          <JobsCaroussel
            items={jobsCaroussel}
            autoPlay={true}
          />
        </section>
      ) : (
        <div className="caroussel">
          <p>{carousselMessages}</p>
        </div>
      )}

      {jobs && jobs.length > 0 ? (
        <>
          <section className="jobs__collection__title">
            <h2>Jobs Collection</h2>
          </section>
          <section className="examples__showcase">
            <PageController
              page={page}
              limit={limit}
              prev={handlePrevPage}
              next={handleNextPage}
              currentPage={jobsCurrentPage}
              totalPages={jobsTotalPages}
            >
              <JobExamplesList jobs={jobs} />
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
