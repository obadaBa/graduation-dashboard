import { Box, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

function PreviewSheet({ imageSrc, title }) {
  return (
    <Box
      sx={{
        width: { xs: 96, md: 112 },
        height: { xs: 92, md: 108 },
        borderRadius: "22px",
        border: "2px solid #8C8C8C",
        bgcolor: "#FFFDF8",
        overflow: "hidden",
       
        boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {imageSrc ? (
        <Box
          component="img"
          src={imageSrc}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <Stack alignItems="center" spacing={0.8} sx={{ color: "#9E9E9E" }}>
          <ImageOutlinedIcon sx={{ fontSize: 38 }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
            لا يوجد صورة
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default function ContentItemCard({
  item = {
    type: "صورة",
    title: "وثيقة صبغي حيوي",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية", "# برمجة"],
    duration: "15 س",
    imageSrc: "",
  },
  onClick = undefined,
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        mt: 1.4,
        width: "92%",
        mr: "auto",
        borderBottom: "1px solid #ECECEC",
        pb: 1.4,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <Box
        sx={{
          direction: "rtl",
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: "center",
          gap: { xs: 2.2, md: 3.5 },
        }}
      >
       

        <Box sx={{ flex: 1, minWidth: 0, textAlign: { xs: "center", md: "right" } }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              mb: 1.2,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 70,
                height: 24,
                px: 1.4,
                borderRadius: "6px",
                bgcolor: "#8D5AE7",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {item.type}
            </Box>
          </Box>

          <Typography
            sx={{
              color: "#263238",
              fontSize: { xs: 22, md: 26 },
              fontWeight: 800,
              lineHeight: 1.25,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              mt: 0.55,
              color: "#A1A1A1",
              fontSize: { xs: 14, md: 15 },
              fontWeight: 600,
              lineHeight: 1.55,
              maxWidth: 500,
              mx: { xs: "auto", md: 0 },
            }}
          >
            {item.description}
          </Typography>

          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            alignItems={{ xs: "center", md: "center" }}
            justifyContent="space-between"
            sx={{ mt: 1.4, gap: { xs: 1.1, md: 1.5 } }}
          >
            <Stack direction="row-reverse" spacing={1.2} gap={1.2} flexWrap="wrap">
              {item.tags.map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    minWidth: 64,
                    height: 24,
                    px: 1,
                    borderRadius: "6px",
                    bgcolor: "#EEF2FF",
                    color: "#5583FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Stack>

            <Stack direction="row-reverse" alignItems="center" spacing={0.7} gap={0.7}>
              <AccessTimeRoundedIcon sx={{ color: "#263238", fontSize: 22 }} />
              <Typography sx={{ color: "#666666", fontSize: 15, fontWeight: 700 }}>
                {item.duration}
              </Typography>
            </Stack>
          </Stack>
        </Box>
         <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            flexShrink: 0,
            width: { xs: "100%", md: "auto" },
            mt: { xs: 0, md: 4 },
          }}
        >
          <PreviewSheet imageSrc={item.imageSrc} title={item.title} />
        </Box>
      </Box>
    </Box>
  );
}
