import { TwUiTheme } from "../../theme";
import { PropsOf } from "@emotion/react";
import styled from "@emotion/styled";
import color from "color";
import { PropsWithChildren } from "react";

const BaseButton = styled.button`
  border-radius: 0.5em;
  padding: 0.75em 1.25em;
  font-size: 1em;
  font-weight: 600;
  color: #fff;
  border: 2px solid ${(props) => (props.theme as TwUiTheme).colors.accent};
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
  &:focus {
    outline: 2px solid ${(props) => (props.theme as TwUiTheme).colors.accent};
    outline-offset: 1px;
  }
`;

const SolidButton = styled(BaseButton)`
  background: ${(props) => (props.theme as TwUiTheme).colors.accent};
  &:hover {
    background: ${(props) =>
      color((props.theme as TwUiTheme).colors.accent)
        .darken(0.1)
        .hex()};
  }
  &:disabled {
    background: ${(props) =>
      color((props.theme as TwUiTheme).colors.accent)
        .darken(0.1)
        .hex()};
  }
`;

const OutlineButton = styled(BaseButton)`
  background: transparent;
  &:hover {
    background: ${(props) =>
      color((props.theme as TwUiTheme).colors.background)
        .alpha(0.5)
        .hexa()};
  }
`;

export interface ButtonProps extends PropsOf<typeof BaseButton> {
  variant?: "solid" | "outline";
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant,
  rightElement,
  leftElement,
  ...restProps
}) => {
  const Btn = variant === "outline" ? OutlineButton : SolidButton;

  return (
    <Btn {...restProps}>
      {leftElement}
      {children}
      {rightElement}
    </Btn>
  );
};
