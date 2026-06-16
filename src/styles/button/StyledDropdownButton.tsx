import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from "@mui/material";

export const StyledDropdownButton = styled(Accordion)(({ theme }) => ({
  background: "#fd6e002d !important",
  color: "var(--mainColor)",
  cursor: "pointer",
  borderRadius: "calc(var(--border-radius)*1) !important",
  boxShadow: "1px 3px 10px 0px #0000006b",
  width: "90%",
  position: "relative",
  border: "1px solid var(--mainColor)",
  overflow: "hidden",
  transition: "all 0.3s ease",

  "& h3": {
    fontSize: "var(--font-size-h3)",
    fontFamily: "var(--text-font)",
    lineHeight: "1.2",
    wordBreak: "break-word",
    [theme.breakpoints.down(400)]: {
      fontSize: "calc(var(--font-size-ref) * 1.1)",
    },
  },

  "& h4": {
    fontSize: "var(--font-size-h3)",
    textAlign: "left",
  },

  "&:hover": {
    opacity: 0.9,
  },

  "&.Mui-expanded": {
    background: "var(--mainColor) !important",
    color: "white",
    [theme.breakpoints.up(768)]: {
      margin: "auto !important",
      width: "90vw !important",
      order: 1,
    },
  },

  [theme.breakpoints.up(768)]: {
    flex: "1 ",
    width: "90vw",
    margin: "0 auto",
  },

  [theme.breakpoints.up(1024)]: {
    width: "auto",
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary)`
  padding: 0 var(--spacing-ref) 0 var(--spacing-ref) !important;
  font-family: var(--text-font);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 !important;
  min-height: 80px;

  & .MuiAccordionSummary-content {
    margin: 12px 0 !important;
  }
`;

export const StyledSummaryContent = styled("div")`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: bold;
  color: var(--mainColor);
  width: 100%;

  .Mui-expanded & {
    color: white;
  }
`;

export const StyledExpandIcon = styled(ExpandMoreIcon)`
  color: var(--mainColor);
  font-size: 2rem;
  flex-shrink: 0;

  .Mui-expanded & {
    color: white;
  }
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  padding: var(--spacing-ref);
  background: white;
  color: var(--mainColor);
  padding: calc(var(--spacing-ref) * 2);
  font-family: calc(var(--font-size-h2) / 2.5);
  text-align: center;
`;

export const StyledDropdownButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "var(--spacing-ref) 0",

  "&:has(.Mui-expanded)": {
    [theme.breakpoints.up(1024)]: {
      width: "90%",
      maxWidth: "100%",
      order: 1,
    },
  },
}));

export const DropdownButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "0 calc(var(--spacing-ref) * 2)",

  [theme.breakpoints.up(768)]: {},
}));
