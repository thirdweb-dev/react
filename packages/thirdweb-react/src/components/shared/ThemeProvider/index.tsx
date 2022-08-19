import {
  AccentColor,
  ColorMode,
  darkModeTheme,
  lightModeTheme,
} from "../../theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { PropsWithChildren, useMemo } from "react";

export interface ThemeProviderProps {
  colorMode?: ColorMode;
  accentColor?: AccentColor;
}

export const ThemeProvider: React.FC<PropsWithChildren<ThemeProviderProps>> = ({
  colorMode,
  accentColor,
  children,
}) => {
  const theme = useMemo(() => {
    const t = colorMode === "light" ? lightModeTheme : darkModeTheme;

    return {
      ...t,
      colors: { ...t.colors, accent: accentColor || t.colors.accent },
    };
  }, [accentColor, colorMode]);

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};
