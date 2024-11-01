export interface Icons {
  [key: string]: string;
}

function convertStringToIcon(string: string, icons: Icons) {
  try {
    const matchString = Object.keys(icons).filter(
      (key) => icons[key] === string
    );
    return matchString;
  } catch {
    return string;
  }
}

export default convertStringToIcon;
