import { TwUiTheme } from "../../theme";
import { PropsOf } from "@emotion/react";
import styled from "@emotion/styled";
import color from "color";
import { PropsWithChildren } from "react";

interface BaseButtonProps {
  hasRightElement?: boolean;
  hasLeftElement?: boolean;
}

const BaseButton = styled.button<BaseButtonProps>`
  border-radius: 0.5em;
  padding: 0.75em 1.25em;
  padding-right: ${(props) => (props.hasRightElement ? "0.75em" : "1.25em")};
  padding-left: ${(props) => (props.hasLeftElement ? "0.75em" : "1.25em")};
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  gap: 0.5em;
  align-items: center;
  color: ${(props) => {
    const theme = props.theme as TwUiTheme;
    return color(theme.colors.accent).isDark() ? "#fff" : "#000";
  }};
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
    background: ${(props) => {
      const col = color((props.theme as TwUiTheme).colors.accent);

      if (col.hex() === "#000000") {
        return "#262627";
      }
      if (col.luminosity() < 0.2) {
        return col.lighten(0.1).hex();
      }
      return col.darken(0.1).hex();
    }};
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

export interface ButtonProps
  extends Omit<
    PropsOf<typeof BaseButton>,
    "hasRightElement" | "hasLeftElement"
  > {
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
    <Btn
      {...restProps}
      hasRightElement={!!rightElement}
      hasLeftElement={!!leftElement}
    >
      {leftElement}
      {children}
      {rightElement}
    </Btn>
  );
};
