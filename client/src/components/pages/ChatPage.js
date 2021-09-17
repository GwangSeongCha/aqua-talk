import React from "react";
import { useParams } from "react-router";

import ChatHeader from "./ChatPage/ChatHeader";
import ChatBody from "./ChatPage/ChatBody";
import ChatInput from "./ChatPage/ChatInput";

function ChatPage() {
  const { friendEmail } = useParams();

  const onSubmit = () => {};
  return (
    <div>
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
}

export default ChatPage;
