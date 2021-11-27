import React from "react";
import MainText from "../../components/atoms/text/MainText";
import Header from "../../components/molecules/header/Header";
import { BsChatText } from "react-icons/bs";
import { main } from "./Style";

const Message = () => {
  return (
    <div style={main}>
      <BsChatText style={{ width: "30px", height: "30px", color: "#828282" }} />
      <MainText
        text="No messages"
        color="#828282"
        size="17px"
        weight="normal"
      />
      <Header />
    </div>
  );
};

export default Message;
