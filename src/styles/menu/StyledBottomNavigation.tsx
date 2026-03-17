import { BottomNavigation } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: "fixed",
  width: "auto",
  maxWidth: "900px",
  height: "80px",
  margin: "0 auto",
  justifySelf: "center",
  zIndex: 9999,
  bottom: 0,
  left: "0",
  right: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  marginBottom: "var(--spacing-ref)",
  borderRadius: "calc(var(--border-radius)*2.5)",
  padding: "calc(var(--spacing-ref) * 2)",

  [theme.breakpoints.down(768)]: {
    display: "flex", // Ensure it's visible on mobile as per Menu.tsx usage
    width: "auto",
    gap: "0.75rem",
    padding: "0.5rem 1rem",
    height: "auto",
    minHeight: "60px",
  },
  [theme.breakpoints.down(400)]: {
    gap: "0.5rem",
    padding: "0.4rem 0.8rem",
  }
}));
