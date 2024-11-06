import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";
import {
  getJobDetailLoadingSelector,
  getJobDetailMessageSelector,
  getJobDetailSelector,
  getJobDetailStateSelector,
} from "../../store/selectors/JobExamplesSelectors/jobDetailSelectors";
import { IMAGES_DB_PATH, ORIGIN } from "../../utils/constants";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";

interface JobDetailProps {
  jobId: string;
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId }) => {
  const dispatch: AppDispatch = useDispatch();
  const origin = ORIGIN;
  const job = useSelector(getJobDetailSelector);
  const jobMessage = useSelector(getJobDetailMessageSelector);
  const jobState = useSelector(getJobDetailStateSelector);
  const [isError, setIsError] = useState(false);
  const isLoading = useSelector(getJobDetailLoadingSelector);
  const imgUrlPath = IMAGES_DB_PATH;

  useEffect(() => {
    dispatch(getJobDetailThunk({ jobId }));
  }, [jobId, dispatch]);

  useEffect(() => {
    if (jobState === "error") {
      setIsError(true);
    }
  }, [jobState]);

  return (
    <>
      {isLoading && (
        <CustomPulseLoader
          isLoading={isLoading}
          $customHeight="100px"
        />
      )}
      {!isError && job ? (
        <section>
          <ul>
            <li key={job._id}>
              <h3>{job.versions[0].title}</h3>
            </li>
          </ul>
        </section>
      ) : (
        <div>{jobMessage}</div>
      )}
    </>
  );
};

export default JobDetail;
