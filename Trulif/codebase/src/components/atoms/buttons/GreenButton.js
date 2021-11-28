import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 17,
  padding: "12px",
  color: "#ffffff",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#219653",
  fontFamily: '"Segoe UI"',
  borderRadius: "10px",
  borderColor: "#ffffff",
  "&:hover": {
    backgroundColor: "#219653",
    borderColor: "#ffffff",
    boxShadow: "none",
  },
});

const greenButton = (props) => {
  const { text, onClick, disabled } = props;
  return (
    <div>
      <Grid>
        <BootstrapButton
          variant="contained"
          fullWidth
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </BootstrapButton>
      </Grid>
    </div>
  );
};

export default greenButton;
