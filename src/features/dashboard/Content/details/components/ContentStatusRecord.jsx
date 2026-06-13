import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import { useState } from "react";

const previousStatuses = [
  {
    id: 1,
    key: "approved",
    label: "تم الموافقة عليه",
    time: "5 يوم",
    icon: <CheckBoxRoundedIcon sx={{ fontSize: 18, color: "#32D74B" }} />,
  },
  {
    id: 2,
    key: "new",
    label: "جديد",
    time: "5 يوم",
    icon: <OutlinedFlagRoundedIcon sx={{ fontSize: 18, color: "#5C84FF" }} />,
  },
];

function StatusItem({ label, time, icon, active = false, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        minHeight: 44,
        borderRadius: "10px",
        border: `1px solid ${active ? "#A66BFF" : "#E5E5E5"}`,
        bgcolor: active ? "#F8F1FF" : "#FFFFFF",
        px: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.2,
        cursor: "pointer",
      }}
    >
      <Stack direction="row-reverse" spacing={0.85} alignItems="center">
        {icon}
        <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 700 }}>
          {label}
        </Typography>
      </Stack>

      <Stack direction="row-reverse" spacing={0.45} alignItems="center">
        <Typography sx={{ color: "#8F8F8F", fontSize: 13, fontWeight: 500 }}>
          {time}
        </Typography>
        <AccessTimeRoundedIcon sx={{ fontSize: 15, color: "#4B4B4B" }} />
      </Stack>
    </Box>
  );
}

function ReportedDetails() {
  return (
    <>
      <Typography
        sx={{
          mt: 2.1,
          color: "#8F8F8F",
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.7,
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        هذا الاختبار ينتهك سياسة الخصوصية ويجب اتخاذ إجراء مناسب بحقه ويتم ذلك من خلال تاب
        سجل الإبلاغات والوجود ضمن نفس هذه الصفحة
      </Typography>

      <Box
        sx={{
          mt: 2.15,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          startIcon={<ReplyRoundedIcon sx={{ fontSize: 18 }} />}
          sx={{
            minWidth: 94,
            height: 31,
            px: 1.45,
            borderRadius: "999px",
            bgcolor: "#5C84FF",
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: 700,
            boxShadow: "0 6px 14px rgba(92, 132, 255, 0.24)",
            "&:hover": {
              bgcolor: "#5C84FF",
            },
            "& .MuiButton-startIcon": {
              marginInlineStart: 0,
              marginInlineEnd: "4px",
            },
          }}
        >
          التوجه إليها
        </Button>

        <Stack direction="row-reverse" spacing={0.9} alignItems="center">
          <Typography sx={{ color: "#263238", fontSize: 17, fontWeight: 500 }}>
            21\03\2026 - الساعة 14:00
          </Typography>
          <AccessTimeRoundedIcon sx={{ fontSize: 22, color: "#263238" }} />
        </Stack>
      </Box>
    </>
  );
}

function ApprovedDetails() {
  return (
    <Box
      sx={{
        mt: 2.4,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      

      <Stack direction="row-reverse" spacing={1.1} alignItems="center" gap={1}>
        
        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ color: "#263238", fontSize: 20, fontWeight: 800 }}>
            محمد منصور
          </Typography>
          <Typography sx={{ color: "#9A9A9A", fontSize: 15, fontWeight: 500 }}>
            صانع التطبيق
          </Typography>
        </Box>
        <Avatar
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
          alt="محمد منصور"
          sx={{ width: 48, height: 48, borderRadius: "10px" }}
        />
      </Stack>
      <Stack direction="row-reverse" spacing={0.9} alignItems="center">
        <Typography sx={{ color: "#263238", fontSize: 17, fontWeight: 500 }}>
          21\03\2026 - الساعة 14:00
        </Typography>
        <AccessTimeRoundedIcon sx={{ fontSize: 22, color: "#263238" }} />
      </Stack>
    </Box>
  );
}

function NewDetails() {
  return (
    <>
      <Typography
        sx={{
          mt: 2.1,
          color: "#8F8F8F",
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.75,
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        المحتوى ما زال جديداً ولم يتم اتخاذ أي إجراء مناسب له، يجب عليك أيضاً المشرف أن تقوم
        بقبول هذا المحتوى او حذفه إن كان يخالف معايير خصوصية التطبيق بشكل مباشر
      </Typography>

      <Stack
        direction="row-reverse"
        spacing={0.9}
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mt: 2.35 }}
      >
        <Typography sx={{ color: "#263238", fontSize: 17, fontWeight: 500 }}>
          21\03\2026 - الساعة 14:00
        </Typography>
        <AccessTimeRoundedIcon sx={{ fontSize: 22, color: "#263238" }} />
      </Stack>
    </>
  );
}

export default function ContentStatusRecord() {
  const [selectedStatus, setSelectedStatus] = useState("reported");

  return (
    <Box
      sx={{
        mt: 2.8,
        width: "100%",
        minHeight: 560,
        borderRadius: "18px",
        border: "1px solid #EAEAEA",
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 3, md: 4 },
          alignItems: "start",
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              color: "#263238",
              fontSize: 24,
              fontWeight: 900,
              textAlign: "right",
              mb: 1.8,
            }}
          >
            الحالة الحالية
          </Typography>

          <StatusItem
            label="مبلغ عنه"
            time="5 يوم"
            active={selectedStatus === "reported"}
            onClick={() => setSelectedStatus("reported")}
            icon={<ReportGmailerrorredRoundedIcon sx={{ fontSize: 18, color: "#A66BFF" }} />}
          />

          <Box
            sx={{
              mt: 2.15,
              mb: 2.15,
              height: "1px",
              bgcolor: "#ECECEC",
            }}
          />

          <Typography
            sx={{
              color: "#263238",
              fontSize: 24,
              fontWeight: 900,
              textAlign: "right",
              mb: 1.8,
            }}
          >
            الحالات السابقة
          </Typography>

          <Stack spacing={1.4}>
            {previousStatuses.map((status) => (
              <StatusItem
                key={status.id}
                label={status.label}
                time={status.time}
                icon={status.icon}
                active={selectedStatus === status.key}
                onClick={() => setSelectedStatus(status.key)}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            width: "100%",
            pt: { xs: 0, md: 1.2 },
          }}
        >
          <Typography sx={{ color: "#263238", fontSize: 24, fontWeight: 900 }}>
            تفاصيل الحالة
          </Typography>

          {selectedStatus === "approved" ? (
            <ApprovedDetails />
          ) : selectedStatus === "new" ? (
            <NewDetails />
          ) : (
            <ReportedDetails />
          )}
        </Box>
      </Box>
    </Box>
  );
}
