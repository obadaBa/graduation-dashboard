import { Switch } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { useColorMode } from "../../../../../app/theme/colorModeContext";

export default function HomeThemeSwitch() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === "dark";

    return (
   
      <Switch
        checked={isDark}
        onChange={toggleColorMode}
        icon={
          <LightModeRoundedIcon
            sx={{ fontSize: 24, color: theme.palette.dashboard.logoPrimary }}
          />
        }
        checkedIcon={<DarkModeRoundedIcon sx={{ fontSize: 24, color: "#FFFFFF" }} />}
        sx={{
          width: 62,
          height: 36,
          p: 0,
          "& .MuiSwitch-switchBase": {
            p: "5px",
            transitionDuration: "250ms",
            "&.Mui-checked": {
              transform: "translateX(26px)",
              color: "#FFFFFF",
              "& + .MuiSwitch-track": {
                bgcolor: theme.palette.dashboard.logoPrimary,
                opacity: 1,
              },
            },
          },
          "& .MuiSwitch-thumb": {
            width: 26,
            height: 26,
            boxShadow: "none",
            bgcolor: isDark ? theme.palette.dashboard.surface : "#F3F6FF",
          },
          "& .MuiSwitch-track": {
            borderRadius: 999,
            opacity: 1,
            bgcolor: isDark
              ? alpha(theme.palette.dashboard.logoPrimary, 0.22)
              : alpha(theme.palette.primary.main, 0.12),
          },
        }}
      />
  
  );
}
