import BioDescription from "./components/BioDescription";
import BioPicture from "./components/BioPicture";
import SoftSkills from "./components/SoftSkills";

const Bio = () => {
  return (
    <main className="main">
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
