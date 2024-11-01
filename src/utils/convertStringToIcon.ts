export interface Icons {
  [key: string]: string;
}

function convertStringToIcon(string: string, icons: Icons) {
  try {
    const lowerCaseString = string.toLowerCase();
    const iconKey = Object.keys(icons).find((key) => key === lowerCaseString);
    console.log("Esto es ObjectKeys: ", Object.keys(icons));
    console.log("Esto es string: ", string);
    console.log("Esto es string.toLowerCase: ", string.toLowerCase());
    console.log("Esto es icons: ", icons);
    console.log("Esto es iconKey: ", iconKey);
    return iconKey ? icons[iconKey] : undefined;
  } catch {
    return string;
  }
}

export default convertStringToIcon;
