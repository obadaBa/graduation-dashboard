import { IconButton, Stack } from "@mui/material";
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
        border: active ? "1px solid #5583FF" : "1px solid #DFDFDF",
        color: active ? "#5583FF" : "#A1A1A1",
        bgcolor: active ? "#F3F6FF" : "#FFFFFF",
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
