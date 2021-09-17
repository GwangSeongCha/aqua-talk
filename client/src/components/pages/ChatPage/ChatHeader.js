import React from "react";
import { useParams } from "react-router";

function ChatHeader() {
  const { friendEmail } = useParams();
  return (
    <div>
      ChatHeader
      <br />
      {friendEmail}님과의 채팅
    </div>
  );
}

export default ChatHeader;
