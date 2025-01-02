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
      console.log("He pasado por validationErrors: ", validationErrors);
      return validationErrors.join("\n");
    }
    return t("errors.unknown_validation");
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    console.log("Esto es error.message: ", error.message);
    return (error as { message: string }).message;
  }
  return t("errors.unknown_validation");
};

export default extractErrorMessage;
