export interface JobExampleVersion {
  _id: string;
  language: string;
  title: string;
  technologies: string[];
  info: string;
  customer: string;
}

export interface Pictures {
  _id: string;
  mainPicture: string;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;
}

export interface Videos {
  _id: string;
  mainVideo: string;
  video2: string;
}

export interface Audios {
  _id: string;
  audio2: string;
  mainAudio: string;
}

export interface JobExample {
  _id: string;
  versions: JobExampleVersion[];
  launchPeriod: string;
  linkToUrl: string;
  linkToGitHub: string;
  category: string[];
  owner: string;
  pictures: Pictures;
  videos: Videos;
  audios: Audios;
  createdAt: string;
  updatedAt: string;
}

export interface JobExamplesData {
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  jobExamples: JobExample[];
}

export default interface ResponseInterface {
  state: string;
  message: string;
  data: JobExamplesData;
}
