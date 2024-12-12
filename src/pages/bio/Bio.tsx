import { useTranslation } from "react-i18next";
import BioDescription from "./components/BioDescription";
import SoftSkills from "./components/SoftSkills";
import PictureServer from "../../components/shared/PictureServer";
import {
  BIO_PICTURE_BIG,
  BIO_PICTURE_MEDIUM,
  BIO_PICTURE_SMALL,
  PUBLIC_ASSETS,
} from "../../utils/constants";

const Bio = () => {
  const { t } = useTranslation();
  return (
    <main className="main">
      <h1> {t("bio.title")}</h1>
      <section className="intro__and__picture">
        <section
          className="main__section__bio"
          id="bio"
        >
          <BioDescription />
        </section>
        <section className="main__section__bio">
          <PictureServer
            className="main__info__picture"
            smallPic={BIO_PICTURE_SMALL}
            mediumPic={BIO_PICTURE_MEDIUM}
            bigPic={BIO_PICTURE_BIG}
            imgPath={PUBLIC_ASSETS}
            overlayClassName="bio__picture__overlay"
            alt="Adrián Sotés picture"
          />
        </section>
      </section>
      <h2>{t("bio.soft_skills")}</h2>
      <section className="main__section__skills__intro">
        <SoftSkills />
      </section>
    </main>
  );
};

export default Bio;
