interface JobExampleVersion {
  _id: string;
  language: string;
  title: string;
  technologies: string[];
  info: string;
  customer: string;
}

interface JobExamplePictures {
  _id: string;
  mainPicture: string;
  picture2: string;
}

interface JobExampleVideos {
  _id: string;
  mainVideo: string;
  video2: string;
}

interface JobExampleAudios {
  _id: string;
  mainAudio: string;
  audio2: string;
}

export default interface JobExample {
  _id: string;
  versions: JobExampleVersion[];
  launchPeriod: string;
  linkToUrl: string;
  category: string[];
  owner: string;
  pictures: JobExamplePictures;
  videos: JobExampleVideos;
  audios: JobExampleAudios;
  createdAt: string;
  updatedAt: string;
}
