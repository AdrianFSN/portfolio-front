import Layout from "./components/Layout";
import "./styles/normalize.css";
import "./styles/common.css";
import "./styles/components.css";
import "./styles/portfolio.css";
import "./styles/fonts.css";
import RootRouter from "./routes/RootRouter";

function App() {
  return (
    <>
      <Layout>
        <RootRouter />
      </Layout>
    </>
  );
}

export default App;
