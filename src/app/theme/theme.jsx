import { createTheme } from "@mui/material";
import ElMessiriBold from "../fonts/ElMessiri-Bold.ttf";
import ElMessiriMedium from "../fonts/ElMessiri-Medium.ttf";
import ElMessiriRegular from "../fonts/ElMessiri-Regular.ttf";
import ElMessiriSemiBold from "../fonts/ElMessiri-SemiBold.ttf";

export const createAppTheme = (mode) => {
  const appFontFamily = '"El Messiri", sans-serif';

  return createTheme({
    direction: "rtl",
    palette: {
      mode,
      ...(mode === "light"
        ? {
            app: {
              form: {
                background: "#F9F9F9",
                border: "#DFDFDF",
              },
            },
            auth: {
              title: "#4275FF",
              loginTitle: "#FFFFFF",
              textlogo: "#263238",
              fixedContainer: "#EEF2FF",
              fieldLabel: "#121212",
              divider: "#C3C3C3",
              loginText: "#8D8D8D",
              button: "#4275FF",
              buttonText: "#FFFFFF",
            },
          }
        : {
            app: {
              form: {
                background: "#2E2E2E",
                border: "#484848",
              },
            },
            auth: {
              title: "#7298FF",
              loginTitle: "#C0C0C0",
              textlogo: "#DDDDDD",
              fixedContainer: "#2F2F2F",
              fieldLabel: "#C0C0C0",
              divider: "#484848",
              loginText: "#C0C0C0",
              button: "#7298FF",
              buttonText: "#121212",
            },
          }),
    },
    typography: {
      fontFamily: appFontFamily,
      allVariants: {
        fontFamily: appFontFamily,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "@font-face": [
            {
              fontFamily: "El Messiri",
              src: `url(${ElMessiriRegular}) format("truetype")`,
              fontWeight: 400,
              fontStyle: "normal",
              fontDisplay: "swap",
            },
            {
              fontFamily: "El Messiri",
              src: `url(${ElMessiriMedium}) format("truetype")`,
              fontWeight: 500,
              fontStyle: "normal",
              fontDisplay: "swap",
            },
            {
              fontFamily: "El Messiri",
              src: `url(${ElMessiriSemiBold}) format("truetype")`,
              fontWeight: 600,
              fontStyle: "normal",
              fontDisplay: "swap",
            },
            {
              fontFamily: "El Messiri",
              src: `url(${ElMessiriBold}) format("truetype")`,
              fontWeight: 700,
              fontStyle: "normal",
              fontDisplay: "swap",
            },
          ],
          "html, body, #root": {
            fontFamily: appFontFamily,
          },
          "*": {
            fontFamily: appFontFamily,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: appFontFamily,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: appFontFamily,
          },
          input: {
            fontFamily: appFontFamily,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontFamily: appFontFamily,
          },
          input: {
            fontFamily: appFontFamily,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: appFontFamily,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontFamily: appFontFamily,
          },
        },
      },
    },
  });
};
