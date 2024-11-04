import { useEffect } from "react";
import usePagination from "../../../hooks/usePagination";

interface PageControllerProps {
  children: React.ReactNode;
  page: number;
  limit: number;
  prev: () => void;
  next: () => void;
  currentPage: number;
  totalPages: number;
}

const PageController: React.FC<PageControllerProps> = ({
  children,
  page,
  limit,
  prev,
  next,
  currentPage,
  totalPages,
}) => {
  const { setPaginationParams } = usePagination(page, limit);

  useEffect(() => {
    setPaginationParams();
  }, [page, limit, setPaginationParams]);

  return (
    <section>
      <i
        className="fa-solid fa-chevron-left"
        onClick={currentPage > 1 ? prev : undefined}
        style={{
          opacity: currentPage > 1 ? 1 : 0.5,
          cursor: currentPage > 1 ? "pointer" : "default",
        }}
      ></i>
      <div>
        {children}
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
      </div>
      <i
        className="fa-solid fa-chevron-right"
        onClick={currentPage < totalPages ? next : undefined}
        style={{
          opacity: currentPage < totalPages ? 1 : 0.5,
          cursor: currentPage < totalPages ? "pointer" : "default",
        }}
      ></i>
    </section>
  );
};

export default PageController;
