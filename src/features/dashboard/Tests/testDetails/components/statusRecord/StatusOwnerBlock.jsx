import { Avatar, Box, Stack, Typography } from "@mui/material";

const defaultAvatar = "http://localhost/storage/defaults/default-avatar.svg";

const roleLabels = {
  owner: "مالك التطبيق",
  supervisor: "مشرف",
  mobile_user: "مستخدم التطبيق",
};

export default function StatusOwnerBlock({ actor }) {
  if (!actor) {
    return null;
  }

  return (
    <Stack direction="row-reverse" spacing={1.1} alignItems="center" gap={1}>
      <Avatar
        src={actor.avatar || defaultAvatar}
        alt={actor.name}
        sx={{ width: 48, height: 48, borderRadius: "10px" }}
      />
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 20,
            fontWeight: 800,
          }}
        >
          {actor.name}
        </Typography>
        {actor.role && (
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            {roleLabels[actor.role] || actor.role}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
