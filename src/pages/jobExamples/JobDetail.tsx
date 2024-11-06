import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getJobDetailThunk } from "../../store/thunks/jobDetailThunk";

interface JobDetailProps {
  jobId: string;
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobDetailThunk({ jobId }));
  });

  return <section key={jobId}>Hola</section>;
};

export default JobDetail;
