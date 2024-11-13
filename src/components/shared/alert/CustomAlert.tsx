import styled from "styled-components";

interface CustomAlertProps {
  type: "success" | "error";
  children: React.ReactNode;
}

const AlertContainer = styled.div<CustomAlertProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ type }) =>
    type === "error" ? "var(--error-color)" : "var(--success-color)"};
  color: var(--main-text-color);
  border-radius: 3px;
  padding: 1rem;
  text-align: center;
  z-index: 20;
`;

const CustomAlert: React.FC<CustomAlertProps> = ({ type, children }) => {
  return <AlertContainer type={type}>{children}</AlertContainer>;
};

export default CustomAlert;
