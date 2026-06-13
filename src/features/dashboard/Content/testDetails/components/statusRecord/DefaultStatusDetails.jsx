import { Typography } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusOwnerBlock from "./StatusOwnerBlock";
import StatusTimeBlock from "./StatusTimeBlock";

export default function DefaultStatusDetails({ description }) {
  return (
    <StatusDetailsShell>
      <StatusOwnerBlock />

      <Typography
        sx={{
          mt: 2.2,
          color: "#8F8F8F",
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.75,
          maxWidth: 560,
          textAlign: "right",
        }}
      >
        {description}
      </Typography>

      <StatusTimeBlock sx={{ mt: 2.35 }} />
    </StatusDetailsShell>
  );
}
