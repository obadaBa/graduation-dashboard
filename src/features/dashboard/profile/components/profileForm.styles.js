export const profileInputSx = {
  "& .MuiOutlinedInput-root": {
    height: 40,
    borderRadius: "6px",
    backgroundColor: (theme) => theme.palette.dashboard.chartBackground,
    "& fieldset": {
      borderColor: (theme) => theme.palette.dashboard.chartBorder,
    },
    "&:hover fieldset": {
      borderColor: (theme) => theme.palette.dashboard.chartBorder,
    },
    "&.Mui-focused fieldset": {
      borderColor: (theme) => theme.palette.dashboard.logoPrimary,
      borderWidth: "1px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: (theme) => theme.palette.dashboard.textPrimary,
    fontSize: 14,
    py: 0,
    "&::placeholder": {
      color: (theme) => theme.palette.dashboard.textSecondary,
      opacity: 1,
    },
  },
  "& .MuiInputAdornment-root": {
    color: (theme) => theme.palette.dashboard.textSecondary,
    mr: 0.75,
  },
};

export const phoneInputSx = {
  ...profileInputSx,
  "& .MuiOutlinedInput-root": {
    ...profileInputSx["& .MuiOutlinedInput-root"],
    flexDirection: "row-reverse",
    pl: 0,
  },
  "& .MuiInputAdornment-positionStart": {
    height: "100%",
    maxHeight: "none",
    mr: 0,
    ml: 0,
  },
  "& .MuiOutlinedInput-input": {
    color: (theme) => theme.palette.dashboard.textPrimary,
    fontSize: 14,
    py: 0,
    textAlign: "right",
  },
};

export const selectSx = {
  height: 40,
  borderRadius: "6px",
  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
  color: (theme) => theme.palette.dashboard.textPrimary,
  fontSize: 14,
  "& fieldset": {
    borderColor: (theme) => theme.palette.dashboard.chartBorder,
  },
  "&:hover fieldset": {
    borderColor: (theme) => theme.palette.dashboard.chartBorder,
  },
  "&.Mui-focused fieldset": {
    borderColor: (theme) => theme.palette.dashboard.logoPrimary,
    borderWidth: 1,
  },
  "& .MuiSvgIcon-root": {
    color: (theme) => theme.palette.dashboard.textSecondary,
  },
  "& .MuiSelect-select": {
    textAlign: "right",
    py: 1.1,
  },
};
