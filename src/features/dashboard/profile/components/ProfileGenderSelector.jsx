import { IconButton, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";

function GenderButton({ active, color, children, onClick }) {
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
            ? `1px solid ${color}`
            : `1px solid ${theme.palette.dashboard.chartBorder}`,
        color: (theme) =>
          active
            ? color
            : theme.palette.dashboard.textSecondary,
        bgcolor: (theme) =>
          active
            ? alpha(color, theme.palette.mode === "dark" ? 0.18 : 0.1)
            : theme.palette.dashboard.chartBackground,
        "&:hover": {
          bgcolor: (theme) =>
            active
              ? alpha(color, theme.palette.mode === "dark" ? 0.24 : 0.14)
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
      <GenderButton
        active={value === "female"}
        color="#FF4DB3"
        onClick={() => onChange("female")}
      >
        <FemaleRoundedIcon sx={{ fontSize: 27 }} />
      </GenderButton>

      <GenderButton
        active={value === "male"}
        color="#19A7FF"
        onClick={() => onChange("male")}
      >
        <MaleRoundedIcon sx={{ fontSize: 27 }} />
      </GenderButton>
    </Stack>
  );
}
