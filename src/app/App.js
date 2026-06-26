import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "../shared/lib/queryClient";
import { TestAiEvaluationProvider } from "../features/dashboard/Tests/context/TestAiEvaluationContext";
import { router } from "./router/routes";
import { ColorModeContext } from "./theme/colorModeContext";
import { createAppTheme } from "./theme/theme";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
        ? "light"
        : "dark",
  );
  const theme = createAppTheme(mode);
  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("currentMode", nextMode);
          return nextMode;
        });
      },
    }),
    [mode],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TestAiEvaluationProvider
            onOpenResult={(testId) =>
              router.navigate(`/test-details/${testId}?aiEvaluation=open`)
            }
          >
            <div dir="rtl">
              <RouterProvider router={router} />
            </div>
          </TestAiEvaluationProvider>
          <ToastContainer />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
