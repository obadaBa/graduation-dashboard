import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Stack, Typography } from "@mui/material";

export default function ContentStatsPanel({
  stats,
  showInfoIcon = true,
  borderSide = "left",
  sx,
}) {
  const borderStyles = {
    left: { borderLeft: "1px solid #D8D8D8" },
    right: { borderRight: "1px solid #D8D8D8" },
    none: {},
  };

  return (
    <Box
      sx={{
        height: "100%",
        px: 2.4,
        py: 2.2,
        ...borderStyles[borderSide],
        ...sx,
      }}
    >
      {showInfoIcon && (
        <InfoOutlinedIcon sx={{ fontSize: 20, color: "#263238", mt: 0.25 }} />
      )}
      <Stack spacing={3.5} sx={{ height: "100%" }} gap={3}>
        {stats.map((item, index) => (
          <Box key={item.id} sx={{ textAlign: "center" }}>
            <Stack
              direction="row-reverse"
              alignItems="flex-start"
              justifyContent="center"
              spacing={0.8}
              gap={0.8}
            >
              <Typography
                sx={{
                  color: "#263238",
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1.65,
                  maxWidth: 104,
                }}
              >
                {item.title}
              </Typography>
            </Stack>

            <Typography
              sx={{
                mt: 2,
                color: "#5583FF",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: 1,
                width: "100%",
                textAlign: "left",
              }}
            >
              {item.value}
            </Typography>
            <Typography
              sx={{
                mt: 0.8,
                color: "#A1A1A1",
                fontSize: 11,
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              {item.unit}
            </Typography>

            {index !== stats.length - 1 && (
              <Box
                sx={{
                  mt: 3,
                  mx: "auto",
                  width: 96,
                  height: "1px",
                  bgcolor: "#DFDFDF",
                }}
              />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
