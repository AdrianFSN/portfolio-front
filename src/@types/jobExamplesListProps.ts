import { JobExample } from "./jobExample";

export default interface JobExamplesListProps {
  category?: string;
  jobs?: JobExample[] | undefined;
}
