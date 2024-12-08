import React from "react";
import { useSpring, animated } from "@react-spring/web";
import styled from "styled-components";

interface SkillProps {
  title: string;
  amount: number;
}

const SkillContainer = styled.div`
  background: var(--bg-color);
  padding: 2rem;
  border: 2px solid var(--bg-color);
  border-radius: 10px;
  position: relative;
  text-align: center;

  h3 {
    font-size: 2.2rem;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
  }
`;

const BadgeContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  position: relative;
  font-size: 1.5rem;
`;

const Skill: React.FC<SkillProps> = ({ title, amount }) => {
  const styles = useSpring({
    value: amount,
    from: { value: 0 },
    config: { duration: 3000 },
  });

  const colorStyles = useSpring({
    stroke: styles.value.to((val) => {
      if (val < 20) return "var(--bg-color)";
      return "var(--main-brand-color)";
    }),
    config: { duration: 3000 },
  });

  // Calcular el perímetro del círculo
  const radius = 45;
  const strokeDasharray = 2 * Math.PI * radius; // Aproximadamente 282.74

  return (
    <SkillContainer>
      <h3>{title}</h3>
      <BadgeContainer>
        <animated.svg
          viewBox="0 0 120 120"
          style={{ width: "120%", height: "120%" }}
        >
          <circle
            cx="51"
            cy="51"
            r={radius}
            stroke="rgba(0, 0, 0, 0.2)"
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
            strokeWidth="6%"
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
            fontSize: "3.5rem",
          }}
        >
          {styles.value.to((val) => `${Math.round(val)}`)}
        </animated.div>
      </BadgeContainer>
    </SkillContainer>
  );
};

export default Skill;
