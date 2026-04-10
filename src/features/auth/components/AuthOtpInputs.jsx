import { useEffect, useRef } from "react";
import { Box, FormControl, OutlinedInput, useTheme } from "@mui/material";
import { Controller } from "react-hook-form";

export default function AuthOtpInputs({
  control,
  names = ["digit1", "digit2", "digit3", "digit4", "digit5", "digit6"],
}) {
  const theme = useTheme();
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: { xs: 1, sm: 1.25 },
        direction: "ltr",
      }}
    >
      {names.map((name, index) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <FormControl
              variant="outlined"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  height: { xs: 60, sm: 66, md: 70 },
                  borderRadius: "12px",
                  backgroundColor: theme.palette.app.form.background,
                  "& fieldset": {
                    borderColor: theme.palette.app.form.border,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.app.form.border,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.auth.title,
                    borderWidth: "1px",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: 0,
                  textAlign: "center",
                  fontSize: { xs: "1.3rem", sm: "1.45rem" },
                  fontWeight: 700,
                  color: theme.palette.auth.fieldLabel,
                },
              }}
            >
              <OutlinedInput
                {...field}
                inputRef={(element) => {
                  inputRefs.current[index] = element;
                }}
                onChange={(event) => {
                  const nextValue = event.target.value.replace(/\D/g, "").slice(-1);
                  field.onChange(nextValue);

                  if (nextValue && index < names.length - 1) {
                    inputRefs.current[index + 1]?.focus();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Backspace") {
                    return;
                  }

                  event.preventDefault();

                  if (field.value) {
                    field.onChange("");
                  }

                  if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
                inputProps={{
                  maxLength: 1,
                  inputMode: "numeric",
                  "aria-label": "خانة من رمز التحقق",
                }}
              />
            </FormControl>
          )}
        />
      ))}
    </Box>
  );
}
