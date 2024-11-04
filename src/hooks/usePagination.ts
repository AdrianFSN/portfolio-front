import { useLocation, useNavigate } from "react-router-dom";

const usePagination = (page: number, limit: number) => {
  const location = useLocation();
  const navigate = useNavigate();

  const setPaginationParams = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());
    navigate({ search: searchParams.toString() });
  };
  return { setPaginationParams };
};

export default usePagination;
