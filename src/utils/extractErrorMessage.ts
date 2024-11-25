import { TFunction } from "i18next";

const extractErrorMessage = (error: unknown, t: TFunction): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "validationErrors" in error
  ) {
    const validationErrors = (error as { validationErrors: string[] })
      .validationErrors;
    if (Array.isArray(validationErrors)) {
      return validationErrors.join("\n");
    }
    return t("errors.unknown_validation");
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    return (error as { message: string }).message;
  }
  return t("errors.unknown_validation");
};

export default extractErrorMessage;
