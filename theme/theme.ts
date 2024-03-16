import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";

export const theme = {
  colors: {
    primary: "#FFF",
    secondary: "#00f29f",
    tertiary: "#c2c2c2",
    tertiaryLight: "#606060",
    backgroundBlue: "#090D38",
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
