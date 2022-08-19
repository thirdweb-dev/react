import {
  AccentColor,
  ColorMode,
  darkModeTheme,
  lightModeTheme,
} from "../../theme";
import {
  ThemeProvider as EmotionThemeProvider,
  useTheme,
} from "@emotion/react";
import { PropsWithChildren } from "react";

export interface ThemeProviderProps {
  colorMode?: ColorMode;
  accentColor?: AccentColor;
}

export const ThemeProvider: React.FC<PropsWithChildren<ThemeProviderProps>> = ({
  colorMode,
  accentColor,
  children,
}) => {
  const prevTheme = useTheme();

  const theme = colorMode === "light" ? lightModeTheme : darkModeTheme;
  if (accentColor) {
    theme.colors.accent = accentColor;
  }

  return (
    <EmotionThemeProvider theme={{ ...prevTheme, ...theme }}>
      {children}
    </EmotionThemeProvider>
  );
};
