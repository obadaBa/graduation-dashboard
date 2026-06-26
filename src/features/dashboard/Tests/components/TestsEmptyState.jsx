import { Box, Stack, Typography } from "@mui/material";
import nodataImage from "../../Assets/nodata.svg";

export default function TestsEmptyState({
  title = "لا يوجد اختبارات",
  description = "لم يتم العثور على اختبارات ضمن هذا التصنيف في اليوم المحدد.",
  imageSize = 110,
  maxWidth = 220,
  px = 2,
}) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1.2}
      sx={{ height: "100%", textAlign: "center", px }}
    >
      <Box
        component="img"
        src={nodataImage}
        alt="لا يوجد بيانات"
        sx={{ width: imageSize, height: imageSize, objectFit: "contain" }}
      />
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 17,
          fontWeight: 800,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          maxWidth,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.7,
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
}
