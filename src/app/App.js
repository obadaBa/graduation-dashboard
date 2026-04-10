import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { queryClient } from "../shared/lib/queryClient";
import { router } from "./router/routes";
import { createAppTheme } from "./theme/theme";

function App() {
  const [mode /* setMyMode */] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
        ? "light"
        : "dark",
  );
  const theme = createAppTheme(mode);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div dir="rtl">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
