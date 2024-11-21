import styled from "styled-components";

interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  $skin?: "danger";
}

const StyledButton: React.FC<ButtonInterface> = styled.button`
  background-color: ${({ $skin }) =>
    $skin === "danger" ? "var(--main-brand-color)" : "var(--main-text-color)"};
  color: ${({ $skin }) =>
    $skin === "danger"
      ? "var(--main-text-color)"
      : "var(--secondary-text-color)"};
  text-decoration: none;
  font-weight: bolder;
  border: none;
  border-radius: 3px;
  padding: 1rem;
  transition: background-color 0.7s linear, color 0.7s linear;

  @media (hover: hover) {
    &hover {
      background-color: var(--main-text-color);
      color: var(--secondary-text-color);
    }
  }
`;

const RegularButton: React.FC<ButtonInterface> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default RegularButton;
