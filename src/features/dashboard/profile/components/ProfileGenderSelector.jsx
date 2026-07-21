import { IconButton, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import BoyIcon from "@mui/icons-material/Boy";
import GirlIcon from "@mui/icons-material/Girl";

function GenderButton({ active, children, onClick }) {
  return (
    <IconButton
      type="button"
      onClick={onClick}
      sx={{
        width: 38,
        height: 38,
        borderRadius: "8px",
        border: (theme) =>
          active
            ? `1px solid ${theme.palette.dashboard.logoPrimary}`
            : `1px solid ${theme.palette.dashboard.chartBorder}`,
        color: (theme) =>
          active
            ? theme.palette.dashboard.logoPrimary
            : theme.palette.dashboard.textSecondary,
        bgcolor: (theme) =>
          active
            ? alpha(theme.palette.dashboard.logoPrimary, theme.palette.mode === "dark" ? 0.16 : 0.1)
            : theme.palette.dashboard.chartBackground,
        "&:hover": {
          bgcolor: (theme) =>
            active
              ? alpha(theme.palette.dashboard.logoPrimary, theme.palette.mode === "dark" ? 0.2 : 0.13)
              : theme.palette.dashboard.hoverItem.background,
        },
      }}
    >
      {children}
    </IconButton>
  );
}

export default function ProfileGenderSelector({ value, onChange }) {
  return (
    <Stack direction="row" justifyContent="flex-start" spacing={1} gap={1}>
      <GenderButton active={value === "female"} onClick={() => onChange("female")}>
        <GirlIcon sx={{ fontSize: 28 }} />
      </GenderButton>

      <GenderButton active={value === "male"} onClick={() => onChange("male")}>
        <BoyIcon sx={{ fontSize: 28 }} />
      </GenderButton>
    </Stack>
  );
}
