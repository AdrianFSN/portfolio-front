import "./Home.css";
import PictureServer from "../../components/shared/PictureServer";
import { HOME_BIG_PICTURE, PUBLIC_ASSETS } from "../../utils/constants";

const Home = () => {
  return (
    <main className="home">
      <section className="picture">
        <PictureServer
          smallPic={HOME_BIG_PICTURE}
          mediumPic={HOME_BIG_PICTURE}
          bigPic={HOME_BIG_PICTURE}
          className=""
          imgPath={PUBLIC_ASSETS}
          alt="AS home picture"
        />
      </section>
    </main>
  );
};

export default Home;
