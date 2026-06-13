import { Avatar, Box, Stack, Typography } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const stats = [
  {
    id: 1,
    value: "23",
    text: "اختبار محتواه مسيء (أخلاقياً - دينياً - اجتماعياً)",
    color: "#FF6A64",
  },
  {
    id: 2,
    value: "18",
    text: "يوجد أخطاء علمية داخل المحتوى",
    color: "#8A8A8A",
  },
  {
    id: 3,
    value: "13",
    text: "محتوى فارغ لا يوجد به معلومات",
    color: "#8A8A8A",
  },
];

const reports = [
  {
    id: 1,
    author: "أمل سمير عرفة",
    tag: "اختبار محتواه مسيء (أخلاقياً - دينياً - اجتماعياً)",
    description:
      "اختبار رائع جدا مليء بالمعرفة والأشياء الشيقة والرائعة التي تعطي تجربة حقيقية وواقعية للمستخدم وتجعله يتذكر بطريقة فعالة",
    date: "2025\\01\\22",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    author: "قمر هيثم خلف",
    tag: "يوجد خطأ في الشرح",
    description:
      "اختبار رائع جدا مليء بالمعرفة والأشياء الشيقة والرائعة التي تعطي تجربة حقيقية وواقعية للمستخدم وتجعله يتذكر بطريقة فعالة",
    date: "2025\\01\\22",
    avatar:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    author: "أمل سمير عرفة",
    tag: "اختبار محتواه مسيء (أخلاقياً - دينياً - اجتماعياً)",
    description:
      "اختبار رائع جدا مليء بالمعرفة والأشياء الشيقة والرائعة التي تعطي تجربة حقيقية وواقعية للمستخدم وتجعله يتذكر بطريقة فعالة",
    date: "2025\\01\\22",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
];

function ReportCard({ item }) {
  return (
    <Box sx={{ textAlign: "right" }}>
      <Stack direction="row-reverse" spacing={0.6} alignItems="flex-start" >
        

        <Box sx={{ flex: 1 }}>
          <Stack
            direction="row-reverse"
            spacing={0.45}
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: "fit-content" }}
          >
          
            <Typography sx={{ color: "#263238", fontSize: 18, fontWeight: 800 }}>
              {item.author}
            </Typography>
            <VerifiedRoundedIcon sx={{ fontSize: 15, color: "#5C84FF" }} />
              <Avatar
          src={item.avatar}
          alt={item.author}
          sx={{ width: 44, height: 44, borderRadius: "10px", flexShrink: 0 }}
        />
          </Stack>

          <Box
            sx={{
              mt: 0.7,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 1.15,
              minHeight: 22,
              borderRadius: "7px",
              bgcolor: "#EEF2FF",
              color: "#5C84FF",
              fontSize: 11,
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {item.tag}
          </Box>

          <Typography
            sx={{
              mt: 1,
              color: "#8F8F8F",
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.45,
              maxWidth: 370,
            }}
          >
            {item.description}
          </Typography>

          <Stack
            direction="row-reverse"
            spacing={0.7}
            alignItems="center"
            justifyContent="flex-start"
            sx={{ mt: 0.9 }}
          >
            <Typography sx={{ color: "#263238", fontSize: 15, fontWeight: 500 }}>
              {item.date}
            </Typography>
            <AccessTimeRoundedIcon sx={{ fontSize: 17, color: "#263238" }} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default function ContentCreationsRecord() {
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
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: "flex-start",
          gap: { xs: 3, md: 4 },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            sx={{
              color: "#263238",
              fontSize: 23,
              fontWeight: 800,
              textAlign: "right",
              mb: 2.4,
            }}
          >
            الإبلاغات
          </Typography>

          <Box
            sx={{
              maxHeight: { xs: "none", md: 430 },
              overflowY: { xs: "visible", md: "auto" },
              pr: { xs: 0, md: 0.5 },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Stack spacing={3.1}>
              {reports.map((report) => (
                <ReportCard key={report.id} item={report} />
              ))}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Stack
            direction="row-reverse"
            alignItems="center"
            gap={1}
            sx={{ mb: 2.2 }}
            justifyContent="flex-end"
          >
             <Box
              sx={{
                minWidth: 34,
                height: 24,
                px: 1,
                borderRadius: "8px",
                bgcolor: "#5C84FF",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              231
            </Box>
            <Typography sx={{ color: "#263238", fontSize: 23, fontWeight: 800 }}>
              إحصائية الإبداعات
            </Typography>

           
          </Stack>

          <Stack spacing={1.8}>
            {stats.map((stat) => (
              <Box
                key={stat.id}
                sx={{
                  minHeight: 56,
                  borderRadius: "8px",
                  border: "1px solid #E2E2E2",
                  bgcolor: "#FFFFFF",
                  px: 2.2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography sx={{ color: "#8F8F8F", fontSize: 16, fontWeight: 500 }}>
                  {stat.text}
                </Typography>
                <Typography sx={{ color: stat.color, fontSize: 20, fontWeight: 500 }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
