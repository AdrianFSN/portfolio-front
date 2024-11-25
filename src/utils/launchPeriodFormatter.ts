import i18n from "i18next";

export default function launchPeriodFormatter(launchPeriod: string) {
  const currentLanguage = i18n.language;

  const [year, month] = launchPeriod.split("/").map(Number);

  const quarter = Math.ceil(month / 3);

  const quarterLabel = currentLanguage === "en" ? `Q${quarter}` : `T${quarter}`;
  return `${year} - ${quarterLabel}`;
}
