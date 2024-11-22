import { useTranslation } from "react-i18next";
import { useEffect } from "react";
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
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const jobId = useParams().id;
  const job = useSelector(getJobDetailSelector);

  const isLoading = useSelector(getJobDetailLoadingSelector);
  const error = useSelector(getJobDetailErrorSelector);

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetailThunk({ jobId }));
    }
  }, [jobId, dispatch]);

  return (
    <>
      {isLoading && (
        <CustomPulseLoader
          isLoading={isLoading}
          $customHeight="100px"
        />
      )}
      {jobId && job ? (
        !error && (
          <main className="porfolio">
            <JobDetail
              jobId={jobId}
              job={job}
            />
          </main>
        )
      ) : (
        <main className="porfolio">
          <div className="not__found">{t("job.job_not_found")}</div>
        </main>
      )}
    </>
  );
};

export default Job;
