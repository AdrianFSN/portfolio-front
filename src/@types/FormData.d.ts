interface FormData {
  title: string;
  technologies: string[];
  launchPeriod: string;
  info: string;
  linkToUrl: string;
  linkToGitHub: string;
  customer: string;
  category: string[];
  mainPicture: File | null;
  picture2: File | null;
  picture3: File | null;
  picture4: File | null;
  picture5: File | null;
  mainAudio: File | null;
  audio2: File | null;
  mainVideo: File | null;
  video2: File | null;
  deleteMainPicture: boolean;
  deletePicture2: boolean;
  deletePicture3: boolean;
  deletePicture4: boolean;
  deletePicture5: boolean;
  deleteMainAudio: boolean;
  deleteAudio2: boolean;
  deleteMainVideo: boolean;
  deleteVideo2: boolean;
  [key: string]: string | boolean | string[] | File | null; // Índice para claves dinámicas
}
