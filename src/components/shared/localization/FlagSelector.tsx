import Flag from "react-world-flags";
import styled from "styled-components";

interface StyledFlagInterface {
  code: string;
  $customWidth: string;
  $customHeight: string;
  onClick?: () => void;
}

interface FlagSelectorProps {
  countryCode: string;
  customWidth: string;
  customHeight: string;
  onClick?: () => void;
}

const StyledFlag: React.FC<StyledFlagInterface> = styled(Flag)`
  width: ${(props) => props.$customWidth || "50px"};
  height: ${(props) => props.$customHeight || "30px"};
  object-fit: cover;
`;

const FlagSelector: React.FC<FlagSelectorProps> = ({
  countryCode,
  customWidth,
  customHeight,
  onClick,
}) => {
  return (
    <StyledFlag
      onClick={onClick}
      code={countryCode}
      $customWidth={customWidth}
      $customHeight={customHeight}
    />
  );
};

export default FlagSelector;
