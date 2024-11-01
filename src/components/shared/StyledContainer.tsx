import styled from "styled-components";
import { ReactNode, HTMLAttributes } from "react";

interface CustomStyleProps {
  $customDisplay?: string;
  $customPosition?: string;
  $customBackground?: string;
  $customBorder?: string;
  $customBorderRadius?: string;
  $customFlexDirection?: string;
  $customGap?: string;
  $customJustifyContent?: string;
  $customAlignItems?: string;
  $customTextAlign?: string;
  $customWidth?: string;
  $customHeight?: string;
  $customMargin?: string;
  $customPadding?: string;
  $customZIndex?: string;
  $customFontWeight?: number | string;
  $customColor?: string;
}

export interface StyledContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    CustomStyleProps {
  children: ReactNode;
  hidden?: boolean;
}

const StyledContainer: React.FC<StyledContainerProps> = ({
  children,
  hidden = false,
  ...props
}) => {
  return (
    <StyleContainer
      hidden={hidden}
      {...props}
    >
      {children}
    </StyleContainer>
  );
};

const StyleContainer = styled.div<CustomStyleProps & { hidden?: boolean }>`
  display: ${(props) =>
    props.hidden ? "none" : props.$customDisplay || "block"};
  position: ${(props) => props.$customPosition || "relative"};
  background: ${(props) => props.$customBackground || "transparent"};
  border: ${(props) => props.$customBorder || "none"};
  border-radius: ${(props) => props.$customBorderRadius || "8px"};
  flex-direction: ${(props) => props.$customFlexDirection || "column"};
  gap: ${(props) => props.$customGap || "10px"};
  justify-content: ${(props) => props.$customJustifyContent || "flex-start"};
  align-items: ${(props) => props.$customAlignItems || "center"};
  text-align: ${(props) => props.$customTextAlign || "left"};
  width: ${(props) => props.$customWidth || "100%"};
  height: ${(props) => props.$customHeight || "auto"};
  margin: ${(props) => props.$customMargin || "0"};
  padding: ${(props) => props.$customPadding || "0"};
  z-index: ${(props) => props.$customZIndex || "0"};
  font-weight: ${(props) => props.$customFontWeight || 400};
  color: ${(props) => props.$customColor || "var(--text-1)"};
`;

export default StyledContainer;
