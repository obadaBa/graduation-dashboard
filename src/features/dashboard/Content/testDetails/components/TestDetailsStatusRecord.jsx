import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ApprovedStatusDetails from "./statusRecord/ApprovedStatusDetails";
import DeletedStatusDetails from "./statusRecord/DeletedStatusDetails";
import NeedsEditStatusDetails from "./statusRecord/NeedsEditStatusDetails";
import NewStatusDetails from "./statusRecord/NewStatusDetails";
import ReportedStatusDetails from "./statusRecord/ReportedStatusDetails";
import ReviewingStatusDetails from "./statusRecord/ReviewingStatusDetails";
import StatusRecordItem from "./statusRecord/StatusRecordItem";
import { deletedStatus, previousStatuses } from "./statusRecord/statusRecordData";

const statusDetailsComponents = {
  deleted: DeletedStatusDetails,
  reported: ReportedStatusDetails,
  approved: ApprovedStatusDetails,
  reviewing: ReviewingStatusDetails,
  needs_edit: NeedsEditStatusDetails,
  new: NewStatusDetails,
};

export default function TestDetailsStatusRecord() {
  const [selectedStatus, setSelectedStatus] = useState("deleted");
  const SelectedStatusDetails =
    statusDetailsComponents[selectedStatus] || DeletedStatusDetails;

  return (
    <Box
      sx={{
        mt: 1.2,
        width: "100%",
        height: "calc(100vh - 315px)",
        borderRadius: "10px",
        border: "1px solid #EAEAEA",
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
        px: { xs: 2, md: 3 },
        py: { xs: 2.2, md: 2.6 },
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
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

          <StatusRecordItem
            label={deletedStatus.label}
            time={deletedStatus.time}
            color={deletedStatus.color}
            active={selectedStatus === deletedStatus.key}
            onClick={() => setSelectedStatus(deletedStatus.key)}
            icon={deletedStatus.icon}
          />

          <Box sx={{ mt: 2.15, mb: 2.15, height: "1px", bgcolor: "#ECECEC" }} />

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
              <StatusRecordItem
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

        <SelectedStatusDetails />
      </Box>
    </Box>
  );
}
