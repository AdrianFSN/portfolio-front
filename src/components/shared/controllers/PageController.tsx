import { useTranslation } from "react-i18next";
import "./PageController.css";

interface PageControllerProps {
  children: React.ReactNode;
  page?: number;
  limit?: string;
  prev: () => void;
  next: () => void;
  currentPage: number;
  totalPages: number;
}

const PageController: React.FC<PageControllerProps> = ({
  children,
  prev,
  next,
  currentPage,
  totalPages,
}) => {
  const { t } = useTranslation();
  const handlePrevPage = () => {
    if (currentPage > 1) {
      prev();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      next();
    }
  };

  return (
    <section className="page__controller">
      <i
        className="page__controller__controls fa-solid fa-chevron-left"
        onClick={handlePrevPage}
        style={{
          opacity: currentPage > 1 ? 1 : 0.2,
          cursor: currentPage > 1 ? "pointer" : "default",
          color:
            currentPage > 1
              ? "var(--main-brand-color"
              : "var(--main-text-color)",
        }}
      ></i>
      <div>
        {children}
        <span>{`${t("generic.page")} ${currentPage} ${t(
          "generic.of"
        )} ${totalPages}`}</span>
      </div>
      <i
        className="page__controller__controls fa-solid fa-chevron-right"
        onClick={handleNextPage}
        style={{
          opacity: currentPage < totalPages ? 1 : 0.2,
          cursor: currentPage < totalPages ? "pointer" : "default",
          color:
            currentPage < totalPages
              ? "var(--main-brand-color"
              : "var(--main-text-color)",
        }}
      ></i>
    </section>
  );
};

export default PageController;
