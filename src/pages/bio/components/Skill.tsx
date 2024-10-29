interface SkillProps {
  title: string;
  amount: string;
}

const Skill = ({ title, amount }: SkillProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{amount}</div>
    </div>
  );
};

export default Skill;
