import { useTranslation } from "react-i18next";
import BioDescription from "./components/BioDescription";
import BioPicture from "./components/BioPicture";
import SoftSkills from "./components/SoftSkills";

const Bio = () => {
  const { t } = useTranslation();
  return (
    <main className="main">
      <h1> {t("bio.title")}</h1>
      <section
        className="main__section__bio"
        id="bio"
      >
        <BioDescription />
      </section>
      <section className="main__section__bio">
        <BioPicture />
      </section>
      <section className="main__section__skills__intro">
        <SoftSkills />
      </section>
    </main>
  );
};

export default Bio;
