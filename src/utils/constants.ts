export const CATEGORY_FILTER_URI = `?category=`;

export const JOB_EXAMPLES_API_URI = "/api/job-examples";
export const PICTURES_COLLECTION_API_URI = "/api/pictures-collection";
export const VIDEOS_COLLECTION_API_URI = "/api/videos-collection";
export const AUDIOS_COLLECTION_API_URI = "/api/audios-collection";
export const VERSION_API_URI = "/api/version";

export const IMAGES_DB_PATH = `${
  import.meta.env.VITE_API_BASE_URL
}uploads/image/`;

export const VIDEOS_DB_PATH = `${
  import.meta.env.VITE_API_BASE_URL
}uploads/video/`;

export const AUDIOS_DB_PATH = `${
  import.meta.env.VITE_API_BASE_URL
}uploads/audio/`;

export const MAIN_THUMBNAILS_DB_PATH = `${
  import.meta.env.VITE_API_BASE_URL
}uploads/image/thumbnails/`;

export const IMG_THUMBNAILS_DB_PATH = `${
  import.meta.env.VITE_API_BASE_URL
}uploads/image/thumbnails/thumbnail_`;

export const ORIGIN = import.meta.env.VITE_API_BASE_URL;

export const LIMIT_DEFAULT = "4";
export const LIMIT_UNDER_769 = "1";
export const LIMIT_OVER_769 = "2";

export const SESSION_LOGIN_API_URI = "/api/session";

// Collections related lists
export const PICTURES_COLLECTION_FIELDS = [
  "mainPicture",
  "picture2",
  "picture3",
  "picture4",
  "picture5",
];

export const VIDEOS_COLLECTION_FIELDS = ["mainVideo", "video2"];
export const AUDIOS_COLLECTION_FIELDS = ["mainAudio", "audio2"];
export const LOCALIZABLE_LANGUAGES = ["en", "es", "fr"];

// Valdiation lists
export const VALID_CATEGORIES = [
  "development",
  "audio",
  "liveOps",
  "design",
  "photography",
  "video",
  "writing",
];

// Job detail
export const EDIT_ROUTES_PATH = "/edit";
export const TITLE_MAX_LENGTH = 60;
export const EXCERPT_MAX_LENGTH = 200;
