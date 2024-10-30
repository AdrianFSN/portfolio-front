import { useEffect, useState } from "react";
import { getJobExamplesList } from "./jobExampleService";
import JobExample from "../../@types/jobExample";

interface JobExamplesListProps {
  category: string;
}

const JobExamplesList: React.FC<JobExamplesListProps> = ({ category }) => {
  //const dispatch = useDispatch;
  const [jobExamplesList, setJobExamplesList] = useState<JobExample[]>([]);

  useEffect(() => {
    const fetchJobExamples = async () => {
      try {
        const data = await getJobExamplesList(category);
        setJobExamplesList(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobExamples();
  }, [category]);
  return (
    <>
      <h2>Hola desde el componente JobExampleList</h2>
      <ul>
        {jobExamplesList.map((jobExample) => (
          <li key={jobExample._id}>
            <h3>{jobExample.versions[0]?.title}</h3>
            <p>Cliente: {jobExample.versions[0]?.customer}</p>
            <p>Lanzamiento: {jobExample.launchPeriod}</p>
            <a href={jobExample.linkToUrl}>Visitar proyecto</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default JobExamplesList;
