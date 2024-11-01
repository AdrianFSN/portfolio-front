export interface Icons {
  [key: string]: string;
}

function convertStringToIcon(string: string, icons: Icons) {
  try {
    const lowerCaseString = string.toLowerCase();
    const iconKey = Object.keys(icons).find((key) => key === lowerCaseString);
    return iconKey ? icons[iconKey] : undefined;
  } catch {
    return string;
  }
}

export default convertStringToIcon;
