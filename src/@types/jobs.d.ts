import { JobExample } from "./jobExample";

export default interface Jobs {
  data: {
    currentPage: number;
    jobExamples: JobExample[];
    totalJobs: number;
    totalPages: number;
  };
  message: string;
  state: string;
}
