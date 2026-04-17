import { Box, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";

export default function TicketCard() {
  const edgeCuts = [34, 104, 174, 244, 314, 384];

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "22px",
        bgcolor: "#FFFFFF",
        p: 0.85,
        height: 200,
        overflow: "visible",
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "6.8px",
          overflow: "hidden",
          borderRadius: "22px",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: -28,
            transform: "translateY(-50%)",
            width: 56,
            height: 48,
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
            right: -28,
            transform: "translateY(-50%)",
            width: 56,
            height: 48,
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
              top: -10,
              left,
              width: 34,
              height: 28,
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
              bottom: -14,
              left,
              width: 34,
              height: 28,
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
          gridTemplateColumns: "0.72fr 1.65fr",
          gap: 2,
          height: "100%",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          borderRadius: "22px",
          border: "1px solid #EAEAEA",
          bgcolor: "#FFFFFF",
          p: 0.85,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "68.4%",
            zIndex: 3,
            pointerEvents: "none",
            top: 10,
            height: 160,
            width: 2.4,
            background:
              "repeating-linear-gradient(to bottom, #D6D6D6 0 19px, transparent 11px 24px)",
          }}
        />
        <Box
          sx={{
            pl: 1.15,
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
          <Typography sx={{ color: "#263238", fontSize: 18, fontWeight: 700, mt: 2 }}>
            180
          </Typography>
          <Typography sx={{ color: "#A1A1A1", fontSize: 12, fontWeight: 500 }}>
            ليرة سورية
          </Typography>
          <Typography sx={{ mt: 2.6, color: "#263238", fontSize: 15, fontWeight: 700 }}>
            التقييم
          </Typography>
          <Stack direction="row" spacing={0.6} alignItems="center" sx={{ mb: 2 }} gap={0}>
            <Typography sx={{ color: "#8A8A8A", fontSize: 12, fontWeight: 600 }}>
              3.2
            </Typography>
            <Typography sx={{ color: "#F5C542", fontSize: 18, fontWeight: 700 }}>
              ★
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            bgcolor: "#EEF4FF",
            borderRadius: "12px",
            px: 1.4,
            py: 0.7,
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
              left: -20,
              transform: "translateY(-50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
              zIndex: 2,
            }}
          />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ color: "#4D8BFF", fontSize: 16, fontWeight: 700 }}>
              جلسة امتحانية أولى
            </Typography>
            <Box
              sx={{
                px: 1.05,
                py: 0.32,
                borderRadius: "8px",
                bgcolor: "#FF7373",
              }}
            >
              <Typography sx={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700 }}>
                صعب
              </Typography>
            </Box>
          </Stack>

          <Typography
            sx={{
              mt: 0.8,
              color: "#4B5563",
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1.6,
              textAlign: "right",
            }}
          >
            هذه الأسئلة تساعدك على الخوض في مادة خوارزميات البحث الذكية
            وبكل ثقة والتقدم للامتحان ونيل أعلى الدرجات بسهولة مطلقة
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1.1 }}
          >
            <Stack direction="row" spacing={0.6} gap={1}>
              {["علوم أساسية #", "برمجة #", "..."].map((chip) => (
                <Box
                  key={chip}
                  sx={{
                    px: 0.5,
                    py: 0.3,
                    borderRadius: "4px",
                    bgcolor: "#4D7EFF",
                  }}
                >
                  <Typography sx={{ color: "#FFFFFF", fontSize: 11 }}>
                    {chip}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Stack direction="row" spacing={1.25} alignItems="center" gap={2}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeRoundedIcon sx={{ fontSize: 20, color: "#263238" }} />
                <Typography sx={{ color: "#263238", fontSize: 14, fontWeight: 700 }}>
                  5 يوم
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <BrushRoundedIcon sx={{ fontSize: 20, color: "#263238" }} />
                <Typography sx={{ color: "#263238", fontSize: 14, fontWeight: 700 }}>
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
