import {
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function AuthFormInput({
  control,
  name,
  placeholder,
  ariaLabel,
  type = "text",
  startAdornment,
  endAdornment,
  sx,
  rules,
  readOnly = false,
  disabled = false,
}) {
  const theme = useTheme();

  const inputSx = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: { xs: 48, sm: 50, md: 52 },
      borderRadius: { xs: "12px", sm: "10px" },
      backgroundColor: theme.palette.app.form.background,
      "& fieldset": {
        borderColor: theme.palette.app.form.border,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.app.form.border,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4275FF",
        borderWidth: "1px",
      },
      "&.Mui-error fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&.Mui-error:hover fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&.Mui-error.Mui-focused fieldset": {
        borderColor: theme.palette.error.main,
      },
    },
    "& .MuiOutlinedInput-input": {
      textAlign: "right",
      color: "#868686",
      fontSize: { xs: "0.95rem", sm: "1rem" },
      padding: { xs: "12px 0", sm: "13px 0" },
    },
    "& .MuiInputAdornment-root": {
      marginLeft: 0,
      marginRight: { xs: "10px", sm: "12px" },
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl
          error={Boolean(fieldState.error)}
          variant="outlined"
          sx={{ ...inputSx, ...sx }}
        >
          <OutlinedInput
            {...field}
            value={field.value ?? ""}
            type={type}
            fullWidth
            disabled={disabled}
            placeholder={placeholder}
            inputProps={{ "aria-label": ariaLabel, readOnly }}
            startAdornment={
              startAdornment ? (
                <InputAdornment position="start">{startAdornment}</InputAdornment>
              ) : null
            }
            endAdornment={
              endAdornment ? (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ) : null
            }
          />
          {fieldState.error?.message ? (
            <FormHelperText
              sx={{
                mx: 0,
                mt: 0.75,
                textAlign: "right",
                fontSize: { xs: "0.78rem", sm: "0.82rem" },
                fontWeight: 600,
              }}
            >
              {fieldState.error.message}
            </FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
}
