import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#4840BB",
  secondary: "#B0F623", // gray

  mainGray: "#B3B3B3",
  backgroundColor: "#E5E5E5",
  buttonGradient: ["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"],

  //pdm
  inputFieldBorder: "rgba(195, 211, 212, 0.9)",
  inputFieldBackgroundColor: "rgba(242, 242, 242, 0.4)",
  inputFieldPlaceholder: "#9AA3AE",
  lightBlue: '#C0FAEB',
  warn: "#ba4848",

  // colors
  black: "#181725",
  textBlack: "#1C1939CC",
  white: "#FFFFFF",
  darkBlue: '#4840BB',
  tertiary: "#7C7C7C",
  realBlack: "#000000",
  buttonGray: "#E6E6E6",

  line: '#444444',
  lightGrey: '#F3EBFC',
  keypad: '#1C1939',


  //Menu
  homeMenu: "rgba(162, 197, 93, 0.15)",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
    fontFamily: "Rubik_700Bold",
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36, fontFamily: "Rubik_500Medium" },
  h2: { fontSize: SIZES.h2, lineHeight: 30, fontFamily: "Rubik_400Regular" },
  h3: { fontSize: SIZES.h3, lineHeight: 22, fontFamily: "Rubik_400Regular" },
  h4: { fontSize: SIZES.h4, lineHeight: 22, fontFamily: "Rubik_400Regular" },
  body1: { fontSize: SIZES.body1, lineHeight: 36, fontFamily: "Inter_700Bold" },
  body2: {
    fontSize: SIZES.body2,
    lineHeight: 30,
    fontFamily: "Inter_600SemiBold",
  },
  body3: {
    fontSize: SIZES.body3,
    lineHeight: 22,
    fontFamily: "Inter_500Medium",
  },
  body4: {
    fontSize: SIZES.body4,
    lineHeight: 22,
    fontFamily: "Inter_400Regular",
  },
  body5: {
    fontSize: SIZES.body5,
    lineHeight: 22,
    fontFamily: "Inter_400Regular",
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
