import Layout from "./components/Layout";
import "./styles/normalize.css";
import "./styles/common.css";
import "./styles/components.css";
import "./styles/portfolio.css";
import "./styles/fonts.css";
import RootRouter from "./routes/RootRouter";
import { useEffect } from "react";
import storage from "./utils/storage";
import { useSelector } from "react-redux";
import { getIsLoggedSelector } from "./store/selectors/AuthSelectors/authSelectors";
import { setAuthorizationHeader } from "./api/client";

function App() {
  const accessToken = storage.get("authToken") || null;

  const userIsLogged = useSelector(getIsLoggedSelector);

  useEffect(() => {
    if (userIsLogged && accessToken) {
      setAuthorizationHeader(accessToken);
    }
  }, [userIsLogged, accessToken]);

  return (
    <>
      <Layout>
        <RootRouter />
      </Layout>
    </>
  );
}

export default App;
