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

export const PAGE_DEFAULT = 1;
export const LIMIT_DEFAULT = "4";
export const LIMIT_UNDER_769 = "1";
export const LIMIT_OVER_769 = "4";
export const MESSAGES_LIST_LIMIT_DEFAULT = "4";
export const MESSAGES_LIST_LIMIT_UNDER_769 = "4";
export const MESSAGES_LIST_LIMIT_OVER_769 = "10";

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
export const EXCERPT_MAX_LENGTH = 150;
export const DESCRIPTION_MAX_LENGTH = 500;

//Messages forms
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 50;
export const MESSAGE_MAX_LENGTH = 500;
export const NOT_ALLOWED_HTML_TAGS = [
  "script", // Para evitar ejecución de scripts maliciosos
  "iframe", // Evita inserción de iframes maliciosos
  "embed", // Bloquea contenido multimedia embebido inseguro
  "object", // Evita ejecución de objetos externos
  "applet", // Evita ejecución de applets
  "link", // Bloquea enlaces que podrían cargar estilos inseguros
  "meta", // Evita manipulación de meta-información
  "style", // Previene estilos maliciosos
  "form", // Evita la creación de formularios secundarios
  "input", // Evita entradas ocultas o manipuladoras
  "button", // Evita la inserción de botones maliciosos
  "textarea", // Evita inserción de campos adicionales
  "select", // Bloquea menús desplegables
  "option", // Bloquea opciones en menús
  "svg", // Puede usarse para ataques como XSS
  "base", // Modifica la URL base del documento, peligroso para redirecciones
];

//Contact paths and URI:
export const CONTACT_ROUTES_PATH = "/contact";
export const MESSAGES_ROUTES_PATH = "/messages";

//Skills lists
export const SOFT_SKILLS_LIST = [
  {
    title: "constructivity",
    amount: 99,
  },
  {
    title: "proactivity",
    amount: 96,
  },
  {
    title: "creativity",
    amount: 97,
  },
  {
    title: "collaborative",
    amount: 98,
  },
  {
    title: "resilience",
    amount: 95,
  },
  {
    title: "strategy",
    amount: 95,
  },
  {
    title: "communication",
    amount: 96,
  },
  {
    title: "multicultural_team_player",
    amount: 94,
  },
];

// External links
export const AS_LINKEDIN = "https://www.linkedin.com/in/adriansotes/";
export const AS_GIT_HUB = "https://github.com/AdrianFSN";

// Admin session length
export const ADMIN_SESSION_LENGTH = 2 * 60 * 60 * 1000;

// PictureServer
export const NOT_FOUND_SMALL_PICTURE = "404_small.jpg";
export const NOT_FOUND_MEDIUM_PICTURE = "404_medium.jpg";
export const NOT_FOUND_BIG_PICTURE = "404_big.jpg";
export const HOME_SMALL_PICTURE = "home_small.jpg";
export const HOME_MEDIUM_PICTURE = "home_medium.jpg";
export const HOME_BIG_PICTURE = "home_big.jpg";
export const LOGO_LIGHT_PICTURE = "Logo_A_Ese_Light.png";
export const LOGO_LIGHT_MEDIUM_PICTURE = "Logo_A_Ese_Light_medium.png";
export const LOGO_LIGHT_SMALL_PICTURE = "Logo_A_Ese_Light_small.png";

// Public > assets
export const PUBLIC_ASSETS = "/assets/";
