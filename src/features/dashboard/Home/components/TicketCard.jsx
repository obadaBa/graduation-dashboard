import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";

const defaultTicket = {
  title: "\u062c\u0644\u0633\u0629 \u0627\u0645\u062a\u062d\u0627\u0646\u064a\u0629 \u0623\u0648\u0644\u0649",
  difficulty: "\u0635\u0639\u0628",
  difficultyColor: "#FF7373",
  description:
    "\u0647\u0630\u0647 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u062a\u0633\u0627\u0639\u062f\u0643 \u0639\u0644\u0649 \u0627\u0644\u062e\u0648\u0636 \u0641\u064a \u0645\u0627\u062f\u0629 \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0627\u062a \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u0630\u0643\u064a\u0629 \u0648\u0628\u0643\u0644 \u062b\u0642\u0629 \u0648\u0627\u0644\u062a\u0642\u062f\u0645 \u0644\u0644\u0627\u0645\u062a\u062d\u0627\u0646 \u0648\u0646\u064a\u0644 \u0623\u0639\u0644\u0649 \u0627\u0644\u062f\u0631\u062c\u0627\u062a \u0628\u0633\u0647\u0648\u0644\u0629 \u0645\u0637\u0644\u0642\u0629",
  price: "180",
  currency: "\u0644\u064a\u0631\u0629 \u0633\u0648\u0631\u064a\u0629",
  rating: "3.2",
  questionsCount: "89",
  questionsLabel: "\u0633\u0624\u0627\u0644",
  duration: "5",
  durationLabel: "\u064a\u0648\u0645",
  tags: ["# \u0639\u0644\u0648\u0645 \u0623\u0633\u0627\u0633\u064a\u0629", "# \u0628\u0631\u0645\u062c\u0629", "..."],
};

export default function TicketCard({
  title = defaultTicket.title,
  difficulty = defaultTicket.difficulty,
  difficultyColor = defaultTicket.difficultyColor,
  description = defaultTicket.description,
  price = defaultTicket.price,
  currency = defaultTicket.currency,
  rating = defaultTicket.rating,
  questionsCount = defaultTicket.questionsCount,
  questionsLabel = defaultTicket.questionsLabel,
  duration = defaultTicket.duration,
  durationLabel = defaultTicket.durationLabel,
  tags = defaultTicket.tags,
  onClick,
  sx,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const chartBackground = theme.palette.dashboard.chartBackground;
  const textPrimary = theme.palette.dashboard.chartTextPrimary;
  const textSecondary = theme.palette.dashboard.chartTextSecondary;
  const borderColor = theme.palette.dashboard.chartBorder;
  const mutedPanel = isDark ? "#3A3A3A" : "#F6F6F6";
  const contentPanel = isDark ? "rgba(85, 131, 255, 0.16)" : "#EEF4FF";
  const cutoutColor = isDark ? "#2F2F2F" : "#FFFFFF";

  const edgeCuts = [34, 104, 174, 244, 314, 384];
  const isClickable = typeof onClick === "function";

  const handleKeyDown = (event) => {
    if (!isClickable) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <Box
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      sx={{
        position: "relative",
        borderRadius: { xs: "16px", sm: "20px", lg: "22px" },
        bgcolor: chartBackground,
        p: { xs: 0.4, sm: 0.7, lg: 0.85 },
        height: { xs: 200, sm: 210, lg: 216 },
        width: "100%",
        maxWidth: { xs: "100%", sm: 610, lg: "100%" },
        mx: "auto",
        overflow: "visible",
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
        cursor: isClickable ? "pointer" : "default",
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: { xs: "3.5px", sm: "5px", lg: "6.8px" },
          overflow: "hidden",
          borderRadius: { xs: "16px", sm: "20px", lg: "22px" },
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: { xs: -15, sm: -20, lg: -24 },
            transform: "translateY(-50%)",
            width: { xs: 30, sm: 40, lg: 56 },
            height: { xs: 30, sm: 38, lg: 48 },
            borderRadius: "50%",
            bgcolor: cutoutColor,
            boxShadow:
              "inset -5px 0 10px rgba(15, 23, 42, 0.12), 0 3px 10px rgba(15, 23, 42, 0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: -15, sm: -20, lg: -28 },
            transform: "translateY(-50%)",
            width: { xs: 30, sm: 40, lg: 56 },
            height: { xs: 30, sm: 38, lg: 48 },
            borderRadius: "50%",
            bgcolor: cutoutColor,
            boxShadow:
              "inset 5px 0 10px rgba(15, 23, 42, 0.12), 0 3px 10px rgba(15, 23, 42, 0.1)",
          }}
        />

        {edgeCuts.map((left) => (
          <Box
            key={`top-outer-${left}`}
            sx={{
              position: "absolute",
              top: { xs: -6, sm: -8, lg: -10 },
              left: { xs: left * 0.55, sm: left * 0.9, lg: left },
              width: { xs: 22, sm: 26, lg: 34 },
              height: { xs: 19, sm: 22, lg: 28 },
              borderRadius: "50%",
              bgcolor: cutoutColor,
              boxShadow:
                "inset 0 -4px 8px rgba(15, 23, 42, 0.12), 0 3px 10px rgba(15, 23, 42, 0.08)",
            }}
          />
        ))}

        {edgeCuts.map((left) => (
          <Box
            key={`bottom-outer-${left}`}
            sx={{
              position: "absolute",
              bottom: { xs: -8, sm: -10, lg: -14 },
              left: { xs: left * 0.55, sm: left * 0.9, lg: left },
              width: { xs: 22, sm: 26, lg: 34 },
              height: { xs: 19, sm: 22, lg: 28 },
              borderRadius: "50%",
              bgcolor: cutoutColor,
              boxShadow:
                "inset 0 4px 8px rgba(15, 23, 42, 0.12), 0 -3px 10px rgba(15, 23, 42, 0.08)",
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "0.54fr 1.9fr", sm: "0.65fr 1.75fr", lg: "0.72fr 1.65fr" },
          gap: { xs: 0.8, sm: 1.5, lg: 2 },
          height: "100%",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          borderRadius: { xs: "16px", sm: "20px", lg: "22px" },
          border: `1px solid ${borderColor}`,
          bgcolor: chartBackground,
          p: { xs: 0.45, sm: 0.65, lg: 0.85 },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            position: "absolute",
            left: { xs: "72%", lg: "68.7%" },
            zIndex: 3,
            pointerEvents: "none",
            top: { xs: 8, lg: 10 },
            height: { xs: 140, sm: 152, lg: 160 },
            width: 2.2,
            background:
              "repeating-linear-gradient(to bottom, #D6D6D6 0 15px, transparent 10px 21px)",
          }}
        />

        <Box
          sx={{
            pl: { xs: 0.45, sm: 0.7, lg: 1.15 },
            bgcolor: mutedPanel,
            borderTopLeftRadius: "11px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "88%",
            position: "relative",
            overflow: "hidden",
            alignItems: "flex-end",
            px: { xs: 0.45, sm: 0.7, lg: 1 },
          }}
        >
          <Typography
            sx={{
              color: textPrimary,
              fontSize: { xs: 14, sm: 17, lg: 18 },
              fontWeight: 700,
              mt: { xs: 1, lg: 2 },
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {price}
          </Typography>
          <Typography sx={{ color: textSecondary, fontSize: { xs: 10, sm: 10, lg: 12 }, fontWeight: 500 }}>
            {currency}
          </Typography>
          <Typography
            sx={{
              mt: { xs: 1.4, sm: 1.5, lg: 2.6 },
              color: textPrimary,
              fontSize: { xs: 12, sm: 14, lg: 15 },
              fontWeight: 700,
            }}
          >
            {"\u0627\u0644\u062a\u0642\u064a\u064a\u0645"}
          </Typography>
          <Stack direction="row" spacing={0.4} alignItems="center" sx={{ mb: { xs: 0.6, lg: 2 } }} gap={0}>
            <Typography sx={{ color: textSecondary, fontSize: { xs: 10, sm: 10, lg: 12 }, fontWeight: 600 }}>
              {rating}
            </Typography>
            <Typography sx={{ color: "#F5C542", fontSize: { xs: 14, sm: 15, lg: 18 }, fontWeight: 700 }}>
              {"\u2605"}
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            bgcolor: contentPanel,
            borderRadius: { xs: "9px", lg: "12px" },
            px: { xs: 0.55, sm: 1.1, lg: 1.4 },
            py: { xs: 0.42, lg: 0.7 },
            height: "88%",
            position: "relative",
            overflow: "hidden",
            width: "99%",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: { xs: -11, sm: -15, lg: -20 },
              transform: "translateY(-50%)",
              width: { xs: 22, sm: 30, lg: 40 },
              height: { xs: 22, sm: 30, lg: 40 },
              borderRadius: "50%",
              bgcolor: cutoutColor,
              zIndex: 2,
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={0.6}
            sx={{ minHeight: { xs: 30, sm: 42 }, minWidth: 0 }}
          >
            <Typography
              sx={{
                color: "#4D8BFF",
                fontSize: { xs: 10.5, sm: 15, lg: 16 },
                fontWeight: 700,
                lineHeight: 1.35,
                textAlign: "right",
                minWidth: 0,
                flex: 1,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                overflowWrap: "anywhere",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                px: { xs: 0.55, lg: 1.05 },
                py: { xs: 0.2, lg: 0.32 },
                borderRadius: "8px",
                bgcolor: difficultyColor,
                flexShrink: 0,
              }}
            >
              <Typography sx={{ color: "#FFFFFF", fontSize: { xs: 8.5, lg: 12 }, fontWeight: 700 }}>
                {difficulty}
              </Typography>
            </Box>
          </Stack>

          <Typography
            sx={{
              mt: { xs: 0.45, lg: 0.8 },
              color: textSecondary,
              fontSize: { xs: 9.3, sm: 12, lg: 13 },
              fontWeight: 500,
              lineHeight: { xs: 1.35, lg: 1.6 },
              textAlign: "right",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              overflowWrap: "anywhere",
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              mt: "auto",
              pt: { xs: 0.4, lg: 0.7 },
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(42px, 0.7fr) minmax(0, 1.7fr)",
                sm: "minmax(70px, 0.9fr) minmax(0, 1.6fr)",
              },
              alignItems: "center",
              gap: { xs: 0.45, lg: 0.8 },
              minWidth: 0,
            }}
          >
            <Stack
              direction="row"
              gap={0.45}
              sx={{ minWidth: 0, overflow: "hidden" }}
            >
              {tags.slice(0, 2).map((chip) => (
                <Box
                  key={chip}
                  sx={{
                    px: { xs: 0.32, lg: 0.5 },
                    py: { xs: 0.18, lg: 0.3 },
                    borderRadius: "4px",
                    bgcolor: "#4D7EFF",
                    maxWidth: { xs: 44, sm: 70, lg: 82 },
                    minWidth: 0,
                    overflow: "hidden",
                    flexShrink: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: { xs: 7.6, lg: 11 },
                      whiteSpace: "nowrap",
                      lineHeight: 1.2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {chip}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              gap={{ xs: 0.5, lg: 0.8 }}
              sx={{ minWidth: 0, overflow: "hidden" }}
            >
              <Stack
                direction="row"
                spacing={0.3}
                alignItems="center"
                sx={{ minWidth: 0, overflow: "hidden" }}
              >
                <AccessTimeRoundedIcon sx={{ fontSize: { xs: 12, lg: 20 }, color: textPrimary }} />
                <Typography
                  title={`${duration} ${durationLabel}`.trim()}
                  dir="auto"
                  sx={{
                    color: textPrimary,
                    fontSize: { xs: 8.8, sm: 11, lg: 12 },
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: 0,
                  }}
                >
                  {`${duration} ${durationLabel}`}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={0.3}
                alignItems="center"
                sx={{ flexShrink: 0, whiteSpace: "nowrap" }}
              >
                <BrushRoundedIcon sx={{ fontSize: { xs: 12, lg: 20 }, color: textPrimary }} />
                <Typography sx={{ color: textPrimary, fontSize: { xs: 8.8, sm: 11, lg: 12 }, fontWeight: 700, whiteSpace: "nowrap" }}>
                  {`${questionsCount} ${questionsLabel}`}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
