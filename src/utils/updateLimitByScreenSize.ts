import { LIMIT_OVER_769, LIMIT_UNDER_769 } from "./constants";

export const updateLimitByScreenSize = (
  setLimit: React.Dispatch<React.SetStateAction<string>>,
  limitUnder769 = LIMIT_UNDER_769,
  limitOver769 = LIMIT_OVER_769
) => {
  if (window.innerWidth < 769) {
    setLimit(limitUnder769);
  } else {
    setLimit(limitOver769);
  }
};
