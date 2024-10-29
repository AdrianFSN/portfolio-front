import React from "react";
//import "react-circular-progressbar/dist/styles.css";
import { useSpring, animated } from "@react-spring/web";
import styled from "styled-components";

interface SkillProps {
  title: string;
  amount: number;
}

const SkillContainer = styled.div`
  background: var(--bg-color);
  padding: 2em;
  border-radius: 10px;
  position: relative;
  text-align: center;

  h3 {
    font-size: 2.2em;
    margin-bottom: 0.2em;
    margin-top: 0.2em;
  }
`;

const BadgeContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  position: relative;
  font-size: 1.5em;
`;

const Skill: React.FC<SkillProps> = ({ title, amount }) => {
  const styles = useSpring({
    value: amount,
    from: { value: 0 },
    config: { duration: 1500 },
  });

  const colorStyles = useSpring({
    stroke: styles.value.to((val) => {
      if (val < 40) return "var(--bg-color)";
      return "var(--main-brand-color)";
    }),
    config: { duration: 1500 },
  });

  // Calcular el perímetro del círculo
  const radius = 45;
  const strokeDasharray = 2 * Math.PI * radius; // Aproximadamente 282.74

  return (
    <SkillContainer>
      <h3>{title}</h3>
      <BadgeContainer>
        <animated.svg
          viewBox="0 0 100 100"
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="var(--main-text-color)"
            strokeWidth="10%"
            fill="none"
          />
          <animated.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={styles.value.to(
              (val) => strokeDasharray - (strokeDasharray * val) / 100
            )}
            strokeWidth="5"
            strokeLinecap="butt"
            style={{
              stroke: colorStyles.stroke, // Aplica el color animado aquí
            }}
          />
        </animated.svg>
        <animated.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "2em",
          }}
        >
          {styles.value.to((val) => `${Math.round(val)}`)}
        </animated.div>
      </BadgeContainer>
    </SkillContainer>
  );
};

export default Skill;
