import { useEffect } from "react";
//import JobExample from "../../@types/jobExample";
import { useDispatch } from "react-redux";
import { getJobExamplesListThunk } from "../../store/thunks/jobExamplesListThunk";
import { AppDispatch } from "../../store/store";

interface JobExamplesListProps {
  category: string;
}

const JobExamplesList: React.FC<JobExamplesListProps> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  //const [jobExamplesList, setJobExamplesList] = useState<JobExample[]>([]);

  useEffect(() => {
    dispatch(getJobExamplesListThunk(category));
  }, [category, dispatch]);
  return (
    <>
      <h2>Hola desde el componente JobExampleList</h2>
      <ul>
        {/* {jobExamplesList.map((jobExample) => (
          <li key={jobExample._id}>
            <h3>{jobExample.versions[0]?.title}</h3>
            <p>Cliente: {jobExample.versions[0]?.customer}</p>
            <p>Lanzamiento: {jobExample.launchPeriod}</p>
            <a href={jobExample.linkToUrl}>Visitar proyecto</a>
          </li>
        ))} */}
      </ul>
    </>
  );
};

export default JobExamplesList;
