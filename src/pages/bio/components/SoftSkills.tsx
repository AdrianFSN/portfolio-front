import { SOFT_SKILLS_LIST } from "../../../utils/constants";
import "../Bio.css";
import { useTranslation } from "react-i18next";
import Skill from "./Skill";

const SoftSkills = () => {
  const { t } = useTranslation();
  return (
    <ul className="main__section__skills">
      {SOFT_SKILLS_LIST.map((skill) => (
        <li>
          <Skill
            title={`${t(`skill.${skill.title}`)}`}
            amount={skill.amount}
          />
        </li>
      ))}
    </ul>
  );
};

export default SoftSkills;
