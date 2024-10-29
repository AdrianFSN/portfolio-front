import "../Bio.css";
import Skill from "./Skill";

const SoftSkills = () => {
  return (
    <ul className="main__section__skills">
      <li>
        <Skill
          title="Creativity"
          amount="97"
        />
      </li>
      {/* <li className="main__section__skills__container">
        <h3>Creatividad: 97</h3>
        <div className="main__section__skills__black__bar">
          <div className="main__section__skills__red__bar progress__bar__creativity creativity"></div>
        </div>
      </li> */}
      <li className="main__section__skills__container">
        <h3>Estrategia: 95</h3>
        <div className="main__section__skills__black__bar">
          <div className="main__section__skills__red__bar progress__bar__strategy strategy"></div>
        </div>
      </li>
      <li className="main__section__skills__container">
        <h3>Python: 75</h3>
        <div className="main__section__skills__black__bar">
          <div className="main__section__skills__red__bar progress__bar__python python"></div>
        </div>
      </li>
      <li className="main__section__skills__container">
        <h3>JavaScript: 60</h3>
        <div className="main__section__skills__black__bar">
          <div className="main__section__skills__red__bar progress__bar__javascript javascript"></div>
        </div>
      </li>
    </ul>
  );
};

export default SoftSkills;
