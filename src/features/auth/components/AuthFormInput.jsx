import { FormControl, InputAdornment, OutlinedInput, useTheme } from "@mui/material";
import { Controller } from "react-hook-form";

export default function AuthFormInput({
  control,
  name,
  placeholder,
  ariaLabel,
  type = "text",
  endAdornment,
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
      render={({ field }) => (
        <FormControl variant="outlined" sx={inputSx}>
          <OutlinedInput
            {...field}
            type={type}
            fullWidth
            placeholder={placeholder}
            inputProps={{ "aria-label": ariaLabel }}
            endAdornment={
              endAdornment ? (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ) : null
            }
          />
        </FormControl>
      )}
    />
  );
}
