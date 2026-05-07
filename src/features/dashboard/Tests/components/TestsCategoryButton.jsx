import { Box, Stack, Typography } from "@mui/material";

export default function TestsCategoryButton({
  title,
  count,
  color,
  active,
  onClick,
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        width: "100%",
        height: 56,
        px: 2,
        borderRadius: "12px",
        border: active ? "2px solid #5583FF" : "1px solid #DFDFDF",
        bgcolor: "#FFFFFF",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        font: "inherit",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} gap={1}>
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: color }} />
        <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 800 }}>
          {title}
        </Typography>
      </Stack>

      <Box
        sx={{
          minWidth: 24,
          height: 16,
          px: 0.8,
          borderRadius: "999px",
          bgcolor: active ? "#5583FF" : "#B8B8B8",
          color: "#FFFFFF",
          fontSize: 11,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 0.25,
        }}
      >
        {count}
      </Box>
    </Box>
  );
}
