import { TwUiTheme } from "../../theme";
import { PropsOf } from "@emotion/react";
import styled from "@emotion/styled";
import color from "color";
import { PropsWithChildren } from "react";

const MenuItemBase = styled.li`
  display: flex;
  padding: 0.5em 1em;
  align-items: center;
  gap: 0.5em;
  &:hover,
  &[data-focus] {
    cursor: pointer;
    background: ${(props) =>
      color((props.theme as TwUiTheme).colors.text)
        .alpha(0.15)
        .hexa()};
  }
  font-family: sans-serif;
  > svg {
    flex-shrink: 0;
    height: 1.5em;
    width: 1.5em;
  }
`;

export interface MenuItemProps extends PropsOf<typeof MenuItemBase> {
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
}

export const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({
  children,
  leftElement,
  rightElement,
  ...restProps
}) => {
  return (
    <MenuItemBase {...restProps}>
      {leftElement}
      {children}
      {rightElement}
    </MenuItemBase>
  );
};
