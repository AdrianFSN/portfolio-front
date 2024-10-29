import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface SkillProps {
  title: string;
  amount: number;
}

const SkillContainer = styled.div`
  background: var(--bg-color);
  padding: 1em;
  border-radius: 10px;
  position: relative;
  text-align: center;
`;

const BadgeContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  position: relative;
`;

const Skill: React.FC<SkillProps> = ({ title, amount }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(amount);
  }, [amount]);

  return (
    <SkillContainer>
      <h3>{title}</h3>
      <BadgeContainer>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            textSize: "2em",
            pathColor: "var(--main-brand-color)",
            textColor: "var(--main-text-color)",
            trailColor: "var(--main-text-color)",
            strokeWidth: 30,
          })}
        />
      </BadgeContainer>
    </SkillContainer>
  );
};

export default Skill;
