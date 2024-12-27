import "./styles/normalize.css";
import "./styles/common.css";
import "./styles/components.css";
import "./styles/portfolio.css";
import "./styles/fonts.css";
import RootRouter from "./routes/RootRouter";
import { useEffect } from "react";
import storage from "./utils/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedSelector,
  getStartSessionCountdown,
} from "./store/selectors/AuthSelectors/authSelectors";
import { logout, setAuthorizationHeader } from "./api/client";
import { AppDispatch } from "./store/store";
import { resetLogin } from "./store/slices/loginSlice";
import { ADMIN_SESSION_LENGTH, AUTH_ROUTES_PATH } from "./utils/constants";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = storage.get("authToken") || null;
  const userIsLogged = useSelector(getIsLoggedSelector);
  const startSessionCountdown = useSelector(getStartSessionCountdown);

  useEffect(() => {
    if (userIsLogged && accessToken) {
      setAuthorizationHeader(accessToken);
    }
  }, [userIsLogged, accessToken]);

  useEffect(() => {
    if (startSessionCountdown) {
      const sessionTimeout = setTimeout(() => {
        logout();
        dispatch(resetLogin());
        navigate(AUTH_ROUTES_PATH);
      }, ADMIN_SESSION_LENGTH);
      return () => clearTimeout(sessionTimeout);
    }
  }, [startSessionCountdown, dispatch, navigate]);

  return (
    <>
      <RootRouter />
    </>
  );
}

export default App;
