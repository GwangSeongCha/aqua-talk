import React from "react";

function ChatInput() {
  return (
    <form style={{ display: "flex", justifyContent: "space-between" }}>
      <input type="text" style={{ width: "calc(100% - 60px)" }} />
      <input type="submit" style={{ width: 50 }} />
    </form>
  );
}

export default ChatInput;
