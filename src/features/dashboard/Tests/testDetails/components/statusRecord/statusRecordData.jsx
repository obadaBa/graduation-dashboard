import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";

export const deletedStatus = {
  key: "deleted",
  label: "تم حذفه",
  time: "2025/10/22 - الآن",
  color: "#FF6A64",
  icon: <DeleteOutlineRoundedIcon sx={{ fontSize: 18, color: "#FF6A64" }} />,
};

export const previousStatuses = [
  {
    id: 1,
    key: "reported",
    label: "مبلغ عنه",
    time: "5 يوم",
    icon: <ReportGmailerrorredRoundedIcon sx={{ fontSize: 18, color: "#A66BFF" }} />,
  },
  {
    id: 2,
    key: "approved",
    label: "تم الموافقة عليه",
    time: "5 يوم",
    icon: <CheckBoxRoundedIcon sx={{ fontSize: 18, color: "#32D74B" }} />,
  },
  {
    id: 3,
    key: "reviewing",
    label: "قيد المراجعة",
    time: "5 يوم",
    icon: <RateReviewRoundedIcon sx={{ fontSize: 18, color: "#FFD400" }} />,
  },
  {
    id: 4,
    key: "needs_edit",
    label: "يحتاج تعديل",
    time: "5 يوم",
    icon: <EditNoteRoundedIcon sx={{ fontSize: 18, color: "#FFB84D" }} />,
  },
  {
    id: 5,
    key: "new",
    label: "جديد",
    time: "5 يوم",
    icon: <OutlinedFlagRoundedIcon sx={{ fontSize: 18, color: "#5C84FF" }} />,
  },
];
