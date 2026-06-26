import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Alert,
  Box,
  IconButton,
  Modal,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

function StatItem({ icon, label, value, color, showDivider = true }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
      <Stack alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ color, height: 28, display: "flex", alignItems: "center" }}>
          {icon}
        </Box>
        <Typography
          sx={{
            mt: 0.5,
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 15,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            mt: 0.25,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {value}
        </Typography>
      </Stack>
      {showDivider && (
        <Box
          sx={{
            width: "2px",
            height: 56,
            bgcolor: (theme) => theme.palette.dashboard.divider,
          }}
        />
      )}
    </Stack>
  );
}

function ResultCard({ item, total }) {
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        borderRadius: "9px",
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        px: 1.8,
        py: 1.4,
      }}
    >
      <Stack direction="row" justifyContent="space-between" gap={4}>
        <Box sx={{ minWidth: 72, flexShrink: 0 }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.logoPrimary,
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            السؤال
          </Typography>
          <Typography
            sx={{
              mt: 0.3,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 12,
            }}
          >
            {item.question_position}/{total}
          </Typography>
        </Box>
        <Box sx={{ minWidth: 0, flex: 1, textAlign: "right" }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.logoPrimary,
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            المشكلة
          </Typography>
          <Typography
            sx={{
              mt: 0.3,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 12,
              lineHeight: 1.7,
              overflowWrap: "anywhere",
            }}
          >
            {item.problem}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function LoadingContent() {
  return (
    <>
      <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
        {[1, 2, 3].map((item) => (
          <Stack key={item} alignItems="center" sx={{ flex: 1 }}>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton width="76%" height={26} />
            <Skeleton width="46%" height={20} />
          </Stack>
        ))}
      </Stack>

      <Skeleton sx={{ mt: 1.5, mb: 1 }} width={135} height={32} />

      <Stack spacing={1.4}>
        {[1, 2, 3].map((item) => (
          <Skeleton
            key={item}
            variant="rounded"
            height={86}
            sx={{ borderRadius: "9px" }}
          />
        ))}
      </Stack>
    </>
  );
}

export default function TestAiAssistantModal({
  open,
  onClose,
  evaluation,
  isLoading = false,
  isError = false,
}) {
  const status = evaluation?.status?.toLowerCase();
  const isFailed = status === "failed";
  const total = Number(evaluation?.questions_count || 0);
  const score = Number(evaluation?.score_percentage || 0);
  const issues = Array.isArray(evaluation?.issues) ? evaluation.issues : [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(8, 10, 14, 0.55)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "calc(100% - 28px)", sm: 440 },
          maxHeight: "calc(100vh - 40px)",
          borderRadius: "13px",
          bgcolor: (theme) => theme.palette.dashboard.surface,
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          direction: "rtl",
          outline: 0,
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 1.8,
            py: 1.4,
            borderBottom: (theme) =>
              `3px dashed ${theme.palette.dashboard.divider}`,
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            مساعد الذكاء الاصطناعي
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              width: 31,
              height: 31,
              borderRadius: "4px",
              border: (theme) =>
                `1px solid ${theme.palette.dashboard.chartBorder}`,
              color: (theme) => theme.palette.dashboard.textPrimary,
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Box sx={{ px: 1.8, py: 2 }}>
          {isLoading ? (
            <LoadingContent />
          ) : isError || isFailed ? (
            <Alert severity="error" sx={{ fontWeight: 700 }}>
              {evaluation?.failure ||
                "تعذر إكمال تقييم الاختبار. حاول مرة أخرى لاحقاً."}
            </Alert>
          ) : (
            <>
              <Stack direction="row" sx={{ width: "100%" }}>
                <StatItem
                  icon={<DoneAllRoundedIcon sx={{ fontSize: 30 }} />}
                  label="نسبة الصحة"
                  value={`${score} بالمية`}
                  color="#FFD400"
                />
                <StatItem
                  icon={<VisibilityOutlinedIcon sx={{ fontSize: 30 }} />}
                  label="الأسئلة الصحيحة"
                  value={evaluation?.correct_questions || `0/${total}`}
                  color="#5BD746"
                />
                <StatItem
                  icon={<SearchRoundedIcon sx={{ fontSize: 30 }} />}
                  label="أسئلة مشتبهة"
                  value={
                    evaluation?.suspicious_questions ||
                    `${issues.length}/${total}`
                  }
                  color="#1AA8FF"
                  showDivider={false}
                />
              </Stack>

              <Typography
                sx={{
                  mt: 1.5,
                  mb: 1,
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 19,
                  fontWeight: 900,
                }}
              >
                نتيجة التحقق
              </Typography>

              <Stack
                spacing={1.4}
                sx={{
                  maxHeight: 300,
                  overflowY: "auto",
                  pr: 0.2,
                  pb: 1,
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {issues.length > 0 ? (
                  issues.map((item, index) => (
                    <ResultCard
                      key={`${item.question_position}-${index}`}
                      item={item}
                      total={total}
                    />
                  ))
                ) : (
                  <Alert severity="success" sx={{ fontWeight: 700 }}>
                    لم يتم العثور على مشاكل في أسئلة الاختبار.
                  </Alert>
                )}
              </Stack>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
