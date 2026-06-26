import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const MAX_NOTE_LENGTH = 250;

export const REVISION_TYPES = [
  { value: "نص السؤال", label: "نص السؤال", question: true },
  { value: "نص الاجابة", label: "نص الإجابة", question: true, option: true },
  { value: "التلميح", label: "التلميح", question: true },
  { value: "وصف الاختبار", label: "وصف الاختبار" },
  { value: "إجابة السؤال", label: "إجابة السؤال", question: true },
  { value: "عنوان الاختبار", label: "عنوان الاختبار" },
];

const fieldSx = {
  height: 38,
  borderRadius: "6px",
  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
  color: (theme) => theme.palette.dashboard.textPrimary,
  fontSize: 12,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: (theme) => theme.palette.dashboard.chartBorder,
  },
};

export default function RevisionRequestFields({
  revision,
  index,
  onChange,
  questions = [],
}) {
  const selectedType = REVISION_TYPES.find(
    (type) => type.value === revision.revisionType,
  );
  const selectedQuestion = questions.find(
    (question) =>
      String(question.position) === String(revision.questionPosition),
  );

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        borderRadius: "10px",
        p: 1.2,
      }}
    >
      <Typography
        sx={{
          mb: 0.7,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 11,
        }}
      >
        التعديل {index + 1}
      </Typography>
      <Stack spacing={1}>
        <Select
          displayEmpty
          value={revision.revisionType}
          onChange={(event) =>
            onChange({
              revisionType: event.target.value,
              questionPosition: "",
              optionPosition: "",
            })
          }
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={fieldSx}
        >
          <MenuItem value="" disabled>
            اختر نوع التعديل...
          </MenuItem>
          {REVISION_TYPES.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>

        {selectedType?.question && (
          <Select
            displayEmpty
            value={revision.questionPosition}
            onChange={(event) => {
              onChange({
                questionPosition: event.target.value,
                optionPosition: "",
              });
            }}
            IconComponent={KeyboardArrowDownRoundedIcon}
            sx={fieldSx}
          >
            <MenuItem value="" disabled>
              اختر رقم السؤال...
            </MenuItem>
            {questions.map((question) => (
              <MenuItem
                key={question.question_id}
                value={question.position}
              >
                السؤال {question.position}
              </MenuItem>
            ))}
          </Select>
        )}

        {selectedType?.option && (
          <Select
            displayEmpty
            value={revision.optionPosition}
            onChange={(event) =>
              onChange({ optionPosition: event.target.value })
            }
            disabled={!selectedQuestion}
            IconComponent={KeyboardArrowDownRoundedIcon}
            sx={fieldSx}
          >
            <MenuItem value="" disabled>
              اختر رقم الإجابة...
            </MenuItem>
            {(selectedQuestion?.options || []).map((option) => (
              <MenuItem key={option.option_id} value={option.position}>
                الإجابة {option.position}
              </MenuItem>
            ))}
          </Select>
        )}

        {selectedType && (
          <>
            <TextField
              multiline
              minRows={2}
              value={revision.problemNote}
              onChange={(event) =>
                onChange({
                  problemNote: event.target.value.slice(0, MAX_NOTE_LENGTH),
                })
              }
              placeholder="اكتب المشكلة التي تواجه نوع التعديل..."
              inputProps={{ maxLength: MAX_NOTE_LENGTH, dir: "rtl" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "6px",
                  fontSize: 12,
                },
              }}
            />
            <Typography
              sx={{
                mt: "2px !important",
                color: (theme) => theme.palette.dashboard.textSecondary,
                fontSize: 9,
                direction: "ltr",
                textAlign: "left",
                lineHeight: 1.2,
              }}
            >
              {revision.problemNote.length}\{MAX_NOTE_LENGTH}
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
}
