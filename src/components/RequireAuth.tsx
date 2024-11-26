import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedSelector } from "../store/selectors/AuthSelectors/authSelectors";
import { AUTH_ROUTES_PATH } from "../utils/constants";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const isLogged = useSelector(getIsLoggedSelector);

  return isLogged ? (
    children
  ) : (
    <Navigate
      to={AUTH_ROUTES_PATH}
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
