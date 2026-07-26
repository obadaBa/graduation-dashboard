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
            dashboard: {
              pageBackground: "#F8FAFF",
              drawerBackground: "#FFFFFF",
              surface: "#FFFFFF",
              chartBackground: "#FFFFFF",
              chartTextPrimary: "#263238",
              chartTextSecondary: "#6B7280",
              chartGrid: "#E6EAF2",
              chartBorder: "#ECECEC",
              border: "rgba(72, 84, 159, 0.12)",
              shadow: "0 6px 18px rgba(29, 41, 57, 0.08)",
              textPrimary: "#263238",
              textSecondary: "#A1A1A1",
              mutedChip: {
                background: "#F4F4F4",
                border: "#D8D8D8",
                color: "#858585",
              },
              logoPrimary: "#5583FF",
              activeItem: {
                color: "#5583FF",
                background: "#F3F6FF",
              },
              inactiveItem: {
                color: "#A1A1A1",
              },
              hoverItem: {
                background: "rgba(85, 131, 255, 0.06)",
              },
              logout: {
                color: "#FF4D4F",
                background: "rgba(255, 77, 79, 0.08)",
              },
              divider: "#DFDFDF",
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
            dashboard: {
              pageBackground: "#181A20",
              drawerBackground: "#20232B",
              surface: "#252A33",
              chartBackground: "#2F2F2F",
              chartTextPrimary: "#F4F7FB",
              chartTextSecondary: "#B8C0CC",
              chartGrid: "rgba(255, 255, 255, 0.18)",
              chartBorder: "rgba(255, 255, 255, 0.42)",
              border: "rgba(255, 255, 255, 0.1)",
              shadow: "0 6px 18px rgba(0, 0, 0, 0.35)",
              textPrimary: "#F3F6FF",
              textSecondary: "#AAB2C0",
              mutedChip: {
                background: "#2A2E36",
                border: "rgba(255, 255, 255, 0.18)",
                color: "#AAB2C0",
              },
              logoPrimary: "#7298FF",
              activeItem: {
                color: "#7298FF",
                background: "rgba(114, 152, 255, 0.16)",
              },
              inactiveItem: {
                color: "#AAB2C0",
              },
              hoverItem: {
                background: "rgba(114, 152, 255, 0.1)",
              },
              logout: {
                color: "#FF7A7A",
                background: "rgba(255, 122, 122, 0.12)",
              },
              divider: "rgba(255, 255, 255, 0.12)",
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
