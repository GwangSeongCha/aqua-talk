import React, { useState } from "react";

import Chat from "./Chat";

function ChatList(props) {
  const renderChats = () => {
    let chatArray = [];
    props.chatData.map((chat, index) => {
      chatArray.push(<Chat key={index} chat={chat} />);
    });
    return chatArray;
  };

  return <div>{renderChats()}</div>;
}

export default ChatList;
