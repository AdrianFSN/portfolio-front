import { useTranslation } from "react-i18next";
import "../Bio.css";
import MarkdownRenderer from "../../../components/shared/MarkdownRenderer";

const BioDescription = () => {
  const { t } = useTranslation();
  return (
    <div className="main__info__bio">
      <div className="main__info__bio__text">
        <MarkdownRenderer content={t("bio.introduction")} />
        <MarkdownRenderer content={t("bio.career")} />
        <MarkdownRenderer content={t("bio.goal")} />
        <MarkdownRenderer content={t("bio.location")} />
      </div>
    </div>
  );
};

export default BioDescription;
