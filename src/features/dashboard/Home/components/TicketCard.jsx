import { Box, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";

export default function TicketCard() {
  const edgeCuts = [34, 104, 174, 244, 314, 384];

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: { xs: "16px", sm: "20px", lg: "22px" },
        bgcolor: "#FFFFFF",
        p: { xs: 0.4, sm: 0.7, lg: 0.85 },
        height: { xs: 178, sm: 190, lg: 200 },
        width: "100%",
        maxWidth: { xs: "100%", sm: 610, lg: "100%" },
        mx: "auto",
        overflow: "visible",
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
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
            bgcolor: "#FFFFFF",
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
            bgcolor: "#FFFFFF",
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
              bgcolor: "#FFFFFF",
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
              bgcolor: "#FFFFFF",
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
          border: "1px solid #EAEAEA",
          bgcolor: "#FFFFFF",
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
            bgcolor: "#F6F6F6",
            borderTopLeftRadius: "11px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "80%",
            position: "relative",
            overflow: "hidden",
            alignItems: "flex-end",
          }}
        >
          <Typography sx={{ color: "#263238", fontSize: { xs: 14, sm: 17, lg: 18 }, fontWeight: 700, mt: { xs: 1, lg: 2 } }}>
            180
          </Typography>
          <Typography sx={{ color: "#A1A1A1", fontSize: { xs: 10, sm: 10, lg: 12 }, fontWeight: 500 }}>
            ليرة سورية
          </Typography>
          <Typography sx={{ mt: { xs: 1.4, sm: 1.5, lg: 2.6 }, color: "#263238", fontSize: { xs: 12, sm: 14, lg: 15 }, fontWeight: 700 }}>
            التقييم
          </Typography>
          <Stack direction="row" spacing={0.4} alignItems="center" sx={{ mb: { xs: 0.6, lg: 2 } }} gap={0}>
            <Typography sx={{ color: "#8A8A8A", fontSize: { xs: 10, sm: 10, lg: 12 }, fontWeight: 600 }}>
              3.2
            </Typography>
            <Typography sx={{ color: "#F5C542", fontSize: { xs: 14, sm: 15, lg: 18 }, fontWeight: 700 }}>
              ★
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            bgcolor: "#EEF4FF",
            borderRadius: { xs: "9px", lg: "12px" },
            px: { xs: 0.55, sm: 1.1, lg: 1.4 },
            py: { xs: 0.42, lg: 0.7 },
            height: "80%",
            position: "relative",
            overflow: "hidden",
            width: "99%",
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
              bgcolor: "#FFFFFF",
              zIndex: 2,
            }}
          />

          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={0.6}>
            <Typography sx={{ color: "#4D8BFF", fontSize: { xs: 10.5, sm: 15, lg: 16 }, fontWeight: 700 }}>
              جلسة امتحانية أولى
            </Typography>
            <Box
              sx={{
                px: { xs: 0.55, lg: 1.05 },
                py: { xs: 0.2, lg: 0.32 },
                borderRadius: "8px",
                bgcolor: "#FF7373",
                flexShrink: 0,
              }}
            >
              <Typography sx={{ color: "#FFFFFF", fontSize: { xs: 8.5, lg: 12 }, fontWeight: 700 }}>
                صعب
              </Typography>
            </Box>
          </Stack>

          <Typography
            sx={{
              mt: { xs: 0.45, lg: 0.8 },
              color: "#4B5563",
              fontSize: { xs: 9.3, sm: 12, lg: 13 },
              fontWeight: 500,
              lineHeight: { xs: 1.35, lg: 1.6 },
              textAlign: "right",
            }}
          >
            هذه الأسئلة تساعدك على الخوض في مادة خوارزميات البحث الذكية وبكل ثقة والتقدم للامتحان ونيل أعلى الدرجات بسهولة مطلقة
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: { xs: 0.45, lg: 1.1 }, gap: { xs: 0.45, lg: 1 } }}
          >
            <Stack direction="row" spacing={0.4} gap={0.45}>
              {["علوم أساسية #", "برمجة #", "..."].map((chip) => (
                <Box
                  key={chip}
                  sx={{
                    px: { xs: 0.32, lg: 0.5 },
                    py: { xs: 0.18, lg: 0.3 },
                    borderRadius: "4px",
                    bgcolor: "#4D7EFF",
                  }}
                >
                  <Typography sx={{ color: "#FFFFFF", fontSize: { xs: 7.6, lg: 11 } }}>
                    {chip}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Stack direction="row" spacing={0.8} alignItems="center" gap={{ xs: 0.65, lg: 2 }}>
              <Stack direction="row" spacing={0.3} alignItems="center">
                <AccessTimeRoundedIcon sx={{ fontSize: { xs: 12, lg: 20 }, color: "#263238" }} />
                <Typography sx={{ color: "#263238", fontSize: { xs: 8.8, lg: 14 }, fontWeight: 700 }}>
                  5 يوم
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3} alignItems="center">
                <BrushRoundedIcon sx={{ fontSize: { xs: 12, lg: 20 }, color: "#263238" }} />
                <Typography sx={{ color: "#263238", fontSize: { xs: 8.8, lg: 14 }, fontWeight: 700 }}>
                  89 سؤال
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
