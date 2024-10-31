import { useTranslation } from "react-i18next";
import "../Bio.css";

const BioDescription = () => {
  const { t } = useTranslation();
  return (
    <div className="main__info__bio">
      <h1> {t("bio.title")}</h1>
      <div className="main__info__bio__text">
        <p>{t("bio.introduction")}</p>
        <p>{t("bio.career")}</p>
        <p>{t("bio.goal")}</p>
      </div>
    </div>
  );
};

export default BioDescription;
