import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFloatButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  margin: 16,
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  outline: "none",
  WebkitTapHighlightColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
  },
  "&:focus, &:active": {
    outline: "none",
    boxShadow: "none",
  },
  "& .MuiTouchRipple-root": {
    display: "none", // Optional: completely remove ripple if that's what's "bizarre"
  },
}));
