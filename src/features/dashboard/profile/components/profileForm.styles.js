export const profileInputSx = {
  "& .MuiOutlinedInput-root": {
    height: 40,
    borderRadius: "6px",
    backgroundColor: "#FAFAFA",
    "& fieldset": {
      borderColor: "#DFDFDF",
    },
    "&:hover fieldset": {
      borderColor: "#DFDFDF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5583FF",
      borderWidth: "1px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#868686",
    fontSize: 14,
    py: 0,
  },
  "& .MuiInputAdornment-root": {
    color: "#A1A1A1",
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
    color: "#868686",
    fontSize: 14,
    py: 0,
    textAlign: "right",
  },
};

export const selectSx = {
  height: 40,
  borderRadius: "6px",
  bgcolor: "#FAFAFA",
  color: "#868686",
  fontSize: 14,
  "& fieldset": {
    borderColor: "#DFDFDF",
  },
  "&:hover fieldset": {
    borderColor: "#DFDFDF",
  },
  "&.Mui-focused fieldset": {
    borderColor: "#5583FF",
    borderWidth: 1,
  },
  "& .MuiSelect-select": {
    textAlign: "right",
    py: 1.1,
  },
};
