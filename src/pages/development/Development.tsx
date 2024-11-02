import JobPagesProps from "../../@types/JobPages";
//import JobExamplesList from "../jobExamples/JobExamplesList";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
import JobsCarrousel from "../jobExamples/JobsCarrousel";

const Development: React.FC<JobPagesProps> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobExamplesListThunk(category));
  }, [category, dispatch]);

  return (
    <main className="porfolio__main">
      <h1>Development</h1>
      <section className="examples__showcase">
        <JobsCarrousel />
      </section>
    </main>
  );
};

export default Development;
