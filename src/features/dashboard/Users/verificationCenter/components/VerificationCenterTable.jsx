import { useEffect, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useAcademicVerificationRequestsQuery } from "../../hooks/useAcademicVerificationRequestsQuery";
import { useAcademicVerificationDocumentsMutation } from "../../hooks/useAcademicVerificationDocumentsMutation";
import {
  GenderCell,
  NameCell,
  TableCell,
} from "../../../components/TableUser";
import VerificationDocumentsModal from "./VerificationDocumentsModal";

const columns = [
  { key: "id", label: "المعرف" },
  { key: "name", label: "الاسم" },
  { key: "email", label: "البريد الإلكتروني" },
  { key: "university", label: "الجامعة" },
  { key: "department", label: "القسم" },
  { key: "information", label: "معلومات التأكيد" },
  { key: "governorate", label: "المحافظة" },
  { key: "gender", label: "الجنس" },
  { key: "actions", label: "" },
];

const gridTemplateColumns =
  "0.55fr 1.25fr 2fr 1.25fr 1.25fr 1.2fr 1fr 0.8fr 0.65fr";

function InformationButton({ onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        border: 0,
        height: 25,
        px: 1.1,
        borderRadius: "4px",
        bgcolor: "#F1F1F1",
        color: "#9A9A9A",
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      عرض المعلومات
      <ArrowBackRoundedIcon sx={{ fontSize: 14 }} />
    </Box>
  );
}

function VerificationActions() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <IconButton
        aria-label="رفض التوثيق"
        size="small"
        sx={{ color: "#263238", width: 28, height: 28 }}
      >
        <CloseRoundedIcon sx={{ fontSize: 19 }} />
      </IconButton>
      <IconButton
        aria-label="قبول التوثيق"
        size="small"
        sx={{
          ml: 0.5,
          width: 30,
          height: 30,
          borderRadius: "6px",
          border: "1px dashed #30DF5B",
          bgcolor: "#E9FFEE",
          color: "#24D850",
          "&:hover": { bgcolor: "#E9FFEE" },
        }}
      >
        <CheckRoundedIcon sx={{ fontSize: 19 }} />
      </IconButton>
    </Box>
  );
}

export default function VerificationCenterTable() {
  const [sortBy, setSortBy] = useState("submitted_at");
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [documentErrors, setDocumentErrors] = useState([]);
  const verificationRequestsQuery =
    useAcademicVerificationRequestsQuery(sortBy);
  const documentsMutation = useAcademicVerificationDocumentsMutation();
  const verificationUsers = Array.isArray(
    verificationRequestsQuery.data?.data,
  )
    ? verificationRequestsQuery.data.data
    : [];

  useEffect(() => {
    return () => {
      documents.forEach((document) => URL.revokeObjectURL(document.url));
    };
  }, [documents]);

  const handleShowDocuments = async (requestId) => {
    setDocuments([]);
    setDocumentErrors([]);
    setIsDocumentsModalOpen(true);

    try {
      const result = await documentsMutation.mutateAsync(requestId);
      setDocuments(
        result.documents.map((document) => ({
          ...document,
          url: URL.createObjectURL(document.blob),
        })),
      );
      setDocumentErrors(result.errors);
    } catch {
      setDocumentErrors([]);
    }
  };

  const handleCloseDocumentsModal = () => {
    setIsDocumentsModalOpen(false);
    documentsMutation.reset();
    setDocuments([]);
    setDocumentErrors([]);
  };

  return (
    <>
      <Box
        sx={{
          mt: 3.5,
          display: "flex",
          justifyContent: "flex-start",
          direction: "rtl",
        }}
      >
        <Select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            width: 155,
            height: 38,
            borderRadius: "999px",
            bgcolor: "#FFFFFF",
            color: "#8A8A8A",
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.08)",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#ECECEC",
            },
            ".MuiSelect-select": {
              py: 0.8,
              pr: 2,
              pl: 4,
              textAlign: "right",
            },
            ".MuiSvgIcon-root": {
              left: 11,
              right: "auto",
              color: "#8A8A8A",
            },
          }}
        >
          <MenuItem value="submitted_at">حسب تاريخ الإرسال</MenuItem>
          <MenuItem value="university">حسب الجامعة</MenuItem>
          <MenuItem value="department">حسب القسم</MenuItem>
          <MenuItem value="gender">حسب الجنس</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          mt: 1.5,
          width: "100%",
          minHeight: 430,
          borderRadius: "10px",
          border: "1px solid #EAEAEA",
          bgcolor: "#FFFFFF",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.10)",
          overflow: "hidden",
          direction: "rtl",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns,
            alignItems: "center",
            minHeight: 48,
            bgcolor: "#F6F6F6",
            px: 1.4,
          }}
        >
          {columns.map((column) => (
            <Typography
              key={column.key}
              sx={{
                color: "#8F8F8F",
                fontSize: 15,
                fontWeight: 800,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {column.label}
            </Typography>
          ))}
        </Box>

        {verificationUsers.map((user) => (
          <Box
            key={user.verification_request_id}
            sx={{
              display: "grid",
              gridTemplateColumns,
              alignItems: "center",
              minHeight: 41,
              px: 1.4,
              borderTop: "1px solid #EFEFEF",
            }}
          >
            <TableCell>
              <Typography
                sx={{ color: "#4F7DFF", fontSize: 14, fontWeight: 800 }}
              >
                #{user.user_id}
              </Typography>
            </TableCell>
            <TableCell>
              <NameCell user={user} />
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.university}</TableCell>
            <TableCell>{user.department}</TableCell>
            <TableCell>
              <InformationButton
                onClick={() =>
                  handleShowDocuments(user.verification_request_id)
                }
              />
            </TableCell>
            <TableCell>{user.governorate}</TableCell>
            <TableCell>
              <GenderCell gender={user.gender} />
            </TableCell>
            <TableCell>
              <VerificationActions />
            </TableCell>
          </Box>
        ))}

        {verificationRequestsQuery.isLoading && (
          <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={28} />
          </Box>
        )}

        {!verificationRequestsQuery.isLoading &&
          verificationUsers.length === 0 && (
            <Typography
              sx={{
                py: 8,
                color: "#8A8A8A",
                fontSize: 14,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              لا توجد طلبات توثيق لعرضها
            </Typography>
          )}
      </Box>

      <VerificationDocumentsModal
        open={isDocumentsModalOpen}
        onClose={handleCloseDocumentsModal}
        documents={documents}
        errors={documentErrors}
        isLoading={documentsMutation.isPending}
      />
    </>
  );
}
