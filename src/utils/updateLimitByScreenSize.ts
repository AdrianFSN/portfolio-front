import { LIMIT_OVER_769, LIMIT_UNDER_769 } from "./constants";

export const updateLimitByScreenSize = (
  setLimit: React.Dispatch<React.SetStateAction<string>>
) => {
  if (window.innerWidth < 769) {
    setLimit(LIMIT_UNDER_769);
  } else if (window.innerWidth > 769) {
    setLimit(LIMIT_OVER_769);
  }
};
