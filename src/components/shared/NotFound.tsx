import PictureServer from "./PictureServer";
import {
  NOT_FOUND_BIG_PICTURE,
  NOT_FOUND_MEDIUM_PICTURE,
  NOT_FOUND_SMALL_PICTURE,
  PUBLIC_ASSETS,
} from "../../utils/constants";
import "./NotFound.css";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <main className="page__not__found">
      <h1>{t("generic.page_not_found")}</h1>
      <section className="not__found">
        <PictureServer
          smallPic={NOT_FOUND_SMALL_PICTURE}
          mediumPic={NOT_FOUND_MEDIUM_PICTURE}
          bigPic={NOT_FOUND_BIG_PICTURE}
          className=""
          imgPath={PUBLIC_ASSETS}
          alt="Not found image"
        />
      </section>
    </main>
  );
};

export default NotFound;
