import React from "react";
import Typography from "@mui/material/Typography";

const MainText = (props) => {
  const { size, color, weight, text } = props;
  return (
    <div>
      <Typography fontSize={size} color={color} fontWeight={weight}>
        {text}
      </Typography>
    </div>
  );
};

export default MainText;
