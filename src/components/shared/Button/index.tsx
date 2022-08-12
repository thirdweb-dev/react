import { TwUiTheme } from "../../theme";
import styled from "@emotion/styled";
import color from "color";

export interface ButtonProps {}

export const Button = styled.button<ButtonProps>`
  border-radius: 8px;
  padding: 0.5rem 1rem;
  background: ${(props) => (props.theme as TwUiTheme).colors.accent};
  color: #fff;
  &:hover {
    background: ${(props) =>
      color((props.theme as TwUiTheme).colors.accent)
        .darken(0.1)
        .hex()};
  }
`;
