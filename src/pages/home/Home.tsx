import "./Home.css";
import { useTranslation } from "react-i18next";
import PictureServer from "../../components/shared/PictureServer";
import {
  AUDIO_ROUTES_PATH,
  DEVELOPMENT_ROUTES_PATH,
  HOME_BIG_PICTURE,
  HOME_MEDIUM_PICTURE,
  HOME_SMALL_PICTURE,
  LIVEOPS_ROUTES_PATH,
  LOGO_LIGHT_MEDIUM_PICTURE,
  LOGO_LIGHT_PICTURE,
  LOGO_LIGHT_SMALL_PICTURE,
  PUBLIC_ASSETS,
  VIDEO_ROUTES_PATH,
  WRITING_ROUTES_PATH,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";

interface category {
  title: string;
  to: string;
}

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const categories = [
    {
      title: t("generic.development"),
      to: DEVELOPMENT_ROUTES_PATH,
    },
    {
      title: t("generic.liveOps"),
      to: LIVEOPS_ROUTES_PATH,
    },
    {
      title: t("generic.writing"),
      to: WRITING_ROUTES_PATH,
    },
    {
      title: t("generic.video"),
      to: VIDEO_ROUTES_PATH,
    },
    {
      title: t("generic.audio"),
      to: AUDIO_ROUTES_PATH,
    },
  ];
  return (
    <div className="home__layout">
      <main className="home">
        <section className="home__navigator">
          <PictureServer
            smallPic={LOGO_LIGHT_SMALL_PICTURE}
            mediumPic={LOGO_LIGHT_MEDIUM_PICTURE}
            bigPic={LOGO_LIGHT_PICTURE}
            className="home__logo"
            imgPath={PUBLIC_ASSETS}
            alt="A Ese logo"
          ></PictureServer>
          <ul className="home__navigator__list">
            {categories.map((category: category) => {
              return (
                <li
                  key={category.title}
                  onClick={() => navigate(category.to)}
                >
                  {category.title}
                </li>
              );
            })}
          </ul>
        </section>
        <section className="picture">
          <PictureServer
            smallPic={HOME_SMALL_PICTURE}
            mediumPic={HOME_MEDIUM_PICTURE}
            bigPic={HOME_BIG_PICTURE}
            className=""
            imgPath={PUBLIC_ASSETS}
            overlayClassName="home__picture__overlay"
            alt="AS home picture"
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
