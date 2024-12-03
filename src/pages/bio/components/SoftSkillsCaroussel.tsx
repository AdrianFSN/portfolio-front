import { SOFT_SKILLS_LIST } from "../../../utils/constants";
import "../Bio.css";
import { useTranslation } from "react-i18next";
import Skill from "./Skill";
import useCaroussel from "../../../hooks/useCarousel";

interface SkillInterface {
  title: string;
  amount: number;
}

const SoftSkills = () => {
  const { t } = useTranslation();
  const { currentItem, currentIndex, animationClass, next, prev } =
    useCaroussel(SOFT_SKILLS_LIST, 3000, false);
  return (
    <>
      <section className="main__section__skills">
        <div className={animationClass}>
          <Skill
            title={`${t(`skill.${(currentItem as SkillInterface).title}`)}`}
            amount={(currentItem as SkillInterface).amount}
          />
        </div>
        <section className="caroussel__middle__block">
          <div className="caroussel__controls">
            <i
              className="fa-solid fa-chevron-left"
              onClick={prev}
            ></i>
            {currentIndex + 1} / {SOFT_SKILLS_LIST.length}
            <i
              className="fa-solid fa-chevron-right"
              onClick={next}
            ></i>
          </div>
        </section>
      </section>
    </>
  );
};

export default SoftSkills;
