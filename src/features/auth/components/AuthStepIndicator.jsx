import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const getStepOffset = (stepIndex) =>
  `calc(${stepIndex} * (var(--step-width) + var(--step-gap)))`;

export default function AuthStepIndicator({
  totalSteps = 3,
  activeStep = 0,
  initialActiveStep = activeStep,
  sx,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        "--step-width": { xs: "56px", sm: "84px" },
        "--step-gap": { xs: "16px", sm: "24px" },
        width: `calc(${totalSteps} * var(--step-width) + ${totalSteps - 1} * var(--step-gap))`,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        gap: "var(--step-gap)",
        ...sx,
      }}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: "var(--step-width)",
            height: 6,
            borderRadius: 999,
            backgroundColor: theme.palette.auth.divider,
          }}
        />
      ))}

      <Box
        component={motion.div}
        initial={{ right: getStepOffset(initialActiveStep) }}
        animate={{ right: getStepOffset(activeStep) }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        sx={{
          position: "absolute",
          top: 0,
          width: "var(--step-width)",
          height: 6,
          borderRadius: 999,
          backgroundColor: theme.palette.auth.title,
        }}
      />
    </Box>
  );
}
