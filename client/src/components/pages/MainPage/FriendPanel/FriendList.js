import React, { useState } from "react";

import Friend from "./Friend";

function FriendList(props) {
  const renderFriends = () => {
    let friendArray = [];
    props.friendData.map((friend, index) => {
      friendArray.push(<Friend key={index} friend={friend} />);
    });
    return friendArray.sort((a, b) => {
      return a.props.friend.name > b.props.friend.name ? 1 : -1;
    });
  };

  return (
    <div>
      <h5
        style={{
          marginTop: 10,
          fontSize: "0.8rem",
          color: "#777",
          textAlign: "left",
        }}
      >
        친구 {props.friendData.length}
      </h5>
      {renderFriends()}
    </div>
  );
}

export default FriendList;
