import React, { useState } from "react";
import { useHistory } from "react-router";

import { Image } from "react-bootstrap";

function Chat(props) {
  const [showProfile, setShowProfile] = useState(false);

  const history = useHistory();
  const handleOpenChat = () => {
    alert(props.chat.email);
    history.push(`/chat/${props.chat.email}`);
  };
  return (
    <div
      style={{ padding: "10px 0" }} //호버시 배경 회색 추가 필요
      onDoubleClick={() => {
        handleOpenChat();
      }}
    >
      <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
        <Image
          src={props.chat.profileImage}
          width={50}
          height={50}
          roundedCircle
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowProfile((prev) => !prev);
          }}
        />
        <div
          style={{
            width: "calc(100% - 130px)",
            marginLeft: 10,
          }}
        >
          <h4 style={{ fontSize: "1rem", fontWeight: 600 }}>{props.chat.name}</h4>
          {props.chat.statusMessage && (
            <p
              style={{
                overflowX: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {props.chat.statusMessage}
            </p>
          )}
        </div>
        <div
          style={{
            width: 70,
            marginBottom: 16,
            textAlign: "right",
            fontSize: 12,
            color: "#ccc",
          }}
        >
          <span>오전 12:00</span> {/* 임시 */}
        </div>
      </div>
      {showProfile && <div style={{ backgroundColor: "#ececec" }}>Profile</div> /* modal? */}
    </div>
  );
}

export default Chat;
