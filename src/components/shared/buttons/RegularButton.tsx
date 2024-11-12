interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const RegularButton: React.FC<ButtonInterface> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default RegularButton;
