import { LIMIT_768, LIMIT_OVER_768, LIMIT_UNDER_768 } from "./constants";

export const updateLimitByScreenSize = (
  setLimit: React.Dispatch<React.SetStateAction<string>>,
  limitUnder768 = LIMIT_UNDER_768,
  limit768 = LIMIT_768,
  limitOver768 = LIMIT_OVER_768
) => {
  if (window.innerWidth < 768) {
    setLimit(limitUnder768);
  } else if (window.innerWidth === 768) {
    setLimit(limit768);
  } else {
    setLimit(limitOver768);
  }
};
