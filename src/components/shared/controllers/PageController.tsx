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
    <section>
      <i
        className="fa-solid fa-chevron-left"
        onClick={handlePrevPage}
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
        onClick={handleNextPage}
        /* style={{
          opacity: currentPage < totalPages ? 1 : 0.5,
          cursor: currentPage < totalPages ? "pointer" : "default",
        }} */
      ></i>
    </section>
  );
};

export default PageController;
