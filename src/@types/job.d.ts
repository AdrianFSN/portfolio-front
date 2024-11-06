import { JobExample } from "./jobExample";

export default interface Job {
  data: JobExample;
  message: string;
  state: string;
}
