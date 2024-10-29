import "../Bio.css";
import Skill from "./Skill";

const SoftSkills = () => {
  return (
    <ul className="main__section__skills">
      <li>
        <Skill
          title="Creativity"
          amount={97}
        />
      </li>
      <li>
        <Skill
          title="Strategy"
          amount={95}
        />
      </li>
      <li>
        <Skill
          title="Communication"
          amount={96}
        />
      </li>
      <li>
        <Skill
          title="Multicultural Team Player"
          amount={94}
        />
      </li>
    </ul>
  );
};

export default SoftSkills;
