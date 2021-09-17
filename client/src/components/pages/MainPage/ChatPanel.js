import React, { useState } from "react";

import ChatHeader from "./ChatPanel/ChatHeader";
import ChatList from "./ChatPanel/ChatList";

import testFriendImage1 from "../../../assets/images/UTH.png"; // 임시
import testFriendImage2 from "../../../assets/images/KJG.png"; // 임시
import testFriendImage3 from "../../../assets/images/CGS.png"; // 임시

function ChatPanel() {
  const [messageTotal, setMessageTotal] = useState(0);

  const [isSearching, setIsSearching] = useState(false);
  const [chatData, setChatData] = useState([
    {
      name: "엄태혁",
      email: "test1@test.test",
      statusMessage: "test",
      profileImage: testFriendImage1,
    },
    {
      name: "김정국",
      email: "test2@test.test",
      statusMessage: "test",
      profileImage: testFriendImage2,
    },
    {
      name: "차광성",
      email: "test3@test.test",
      statusMessage:
        "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
      profileImage: testFriendImage3,
    },
  ]);
  const [searchedChatData, setSearchedChatData] = useState([]);

  const renderSearched = (input) => {
    setIsSearching(true);

    if (input) {
      let chatDataArray = [...chatData];
      console.log(input);
      setSearchedChatData(
        chatDataArray.filter((chat) => {
          let regex = new RegExp(input);
          return chat.name.search(regex) != -1;
        })
      );
    } else {
      setIsSearching(false);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        padding: "0 20px 0 80px",
        boxSizing: "border-box",
      }}
    >
      <ChatHeader renderSearched={renderSearched} />

      <ChatList chatData={isSearching ? searchedChatData : chatData} />
    </div>
  );
}

export default ChatPanel;
