export const CATEGORY_FILTER_URI = `?category=`;

export const JOB_EXAMPLES_API_URI = "/api/job-examples";
export const MESSAGES_API_URI = "/api/contact";
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
export const LANGUAGE_CODES: Record<string, string> = {
  en: "GB",
  es: "ES",
  fr: "FR",
};

export const ALLOWED_AUDIO_TYPES = ["audio/mpeg"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4"];
export const ALLOWED_PICTURES_TYPES = ["image/jpeg", "image/png", "image/gif"];
export const ALLOWED_FILES_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "audio/mpeg",
  "video/mp4",
];

// Validation lists
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
export const AUTH_ROUTES_PATH = "/session";
export const DEVELOPMENT_ROUTES_PATH = "/development";
export const LIVEOPS_ROUTES_PATH = "/live-ops";
export const WRITING_ROUTES_PATH = "/writing";
export const AUDIO_ROUTES_PATH = "/audio";
export const VIDEO_ROUTES_PATH = "/video";
export const DESIGN_ROUTES_PATH = "/design";
export const PHOTOGRAPHY_ROUTES_PATH = "/photography";
export const ABOUT_ME_ROUTES_PATH = "/bio";
export const CREATE_ROUTES_URI = "create";
export const JOB_ROUTES_URI = "job";
export const VERSION_ROUTES_URI = "version";
export const PICTURES_ROUTES_URI = "pictures";
export const VIDEOS_ROUTES_URI = "videos";
export const AUDIOS_ROUTES_URI = "audios";
export const TITLE_MAX_LENGTH = 50;
export const EXCERPT_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;

//Messages forms
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 50;
export const MESSAGE_MAX_LENGTH = 500;

//Contact paths and URI:
export const CONTACT_ROUTES_PATH = "/contact";
export const MESSAGES_ROUTES_PATH = "/messages";
