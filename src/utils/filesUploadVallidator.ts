interface FileUploadValidatorParams {
  validators: string[];
  file: File;
  message: string;
}

function fileUploadValidator({
  validators,
  file,
  message,
}: FileUploadValidatorParams): string | null {
  if (!validators.includes(file.type)) {
    return message;
  }
  return null;
}

export default fileUploadValidator;
