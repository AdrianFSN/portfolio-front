import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";
import {
  getJobDetailErrorSelector,
  getJobDetailLoadingSelector,
  getJobDetailSelector,
} from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { useParams } from "react-router-dom";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import JobDetail from "./JobDetail";

const Job = () => {
  const dispatch: AppDispatch = useDispatch();
  const jobId = useParams().id;
  const job = useSelector(getJobDetailSelector);
  const [error, setError] = useState("");
  const isLoading = useSelector(getJobDetailLoadingSelector);
  const isError = useSelector(getJobDetailErrorSelector);
  console.log("esto es jobId: ", jobId);
  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    if (isError) {
      setError(isError);
    }
  }, [isError]);

  return (
    <>
      {isLoading && (
        <CustomPulseLoader
          isLoading={isLoading}
          $customHeight="100px"
        />
      )}
      {jobId && job && !isError ? (
        <main className="porfolio">
          <JobDetail jobId={jobId} />
        </main>
      ) : (
        <main className="porfolio">
          <div>{error}</div>
        </main>
      )}
    </>
  );
};

export default Job;
