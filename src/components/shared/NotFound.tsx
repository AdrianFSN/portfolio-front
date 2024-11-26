import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <main className="porfolio">
      <div className="not__found">{t("generic.page_not_found")}</div>
    </main>
  );
};

export default NotFound;
