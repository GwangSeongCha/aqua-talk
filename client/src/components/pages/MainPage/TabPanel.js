import React from "react";

import { BsPersonFill, BsFillChatFill, BsThreeDots } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

function TabPanel(props) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: 60,
        paddingTop: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ececec",
      }}
    >
      <ul
        style={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 30,
          alignItems: "center",
        }}
      >
        <li
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.handleTab("friend");
          }}
        >
          <BsPersonFill size={30} color={props.tab === "friend" ? null : "#acacac"} />
        </li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.handleTab("chat");
          }}
        >
          <BsFillChatFill size={30} color={props.tab === "chat" ? null : "#acacac"} />
        </li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.handleTab("more");
          }}
        >
          <BsThreeDots size={30} color={props.tab === "more" ? null : "#acacac"} />
        </li>
      </ul>
      <ul
        style={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 30,
          alignItems: "center",
        }}
      >
        <li>
          <FaSignOutAlt
            size={30}
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.signOut();
            }}
          />
        </li>
      </ul>
    </nav>
  );
}

export default TabPanel;
