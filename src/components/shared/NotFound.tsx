import "./NotFound.css";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <main className="page__not__found">
      <h1>{t("generic.page_not_found")}</h1>
      <div className="not__found">{t("generic.page_not_found")}</div>
    </main>
  );
};

export default NotFound;
