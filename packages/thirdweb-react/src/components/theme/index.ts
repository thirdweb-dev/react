export const lightModeTheme = {
  colors: {
    accent: "#A855F7",
    background: "#fff",
    text: "#000",
  },
};

export const darkModeTheme: TwUiTheme = {
  colors: {
    accent: "#A855F7",
    background: "#000",
    text: "#fff",
  },
};

export type TwUiTheme = typeof lightModeTheme;

export type ColorMode = "light" | "dark";

export type AccentColor = string;
