import "./Home.css";
import PictureServer from "../../components/shared/PictureServer";
import {
  HOME_BIG_PICTURE,
  HOME_MEDIUM_PICTURE,
  HOME_SMALL_PICTURE,
  PUBLIC_ASSETS,
} from "../../utils/constants";

const Home = () => {
  return (
    <main className="home">
      <section className="picture">
        <PictureServer
          smallPic={HOME_SMALL_PICTURE}
          mediumPic={HOME_MEDIUM_PICTURE}
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
