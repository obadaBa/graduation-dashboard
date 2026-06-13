import { Avatar, Box, Stack, Typography } from "@mui/material";

export default function StatusOwnerBlock() {
  return (
    <Stack direction="row-reverse" spacing={1.1} alignItems="center" gap={1}>
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
        alt="محمد منصور"
        sx={{ width: 48, height: 48, borderRadius: "10px" }}
      />
      <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ color: "#263238", fontSize: 20, fontWeight: 800 }}>
          محمد منصور
        </Typography>
        <Typography sx={{ color: "#9A9A9A", fontSize: 15, fontWeight: 500 }}>
          مالك التطبيق
        </Typography>
      </Box>
    </Stack>
  );
}
