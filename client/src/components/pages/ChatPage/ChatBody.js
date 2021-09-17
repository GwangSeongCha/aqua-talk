import React from "react";
import { useParams } from "react-router";

function ChatBody() {
  const { friendEmail } = useParams();
  return <div>{friendEmail}과의ChatBody</div>;
}

export default ChatBody;
