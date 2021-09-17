import React, { useState } from "react";

import FriendHeader from "./FriendPanel/FriendHeader";
import MyProfile from "./FriendPanel/MyProfile";
import FriendList from "./FriendPanel/FriendList";
import Partition from "../../common/Partition";

import testFriendImage1 from "../../../assets/images/UTH.png"; // 임시
import testFriendImage2 from "../../../assets/images/KJG.png"; // 임시
import testFriendImage3 from "../../../assets/images/CGS.png"; // 임시

function FriendPanel() {
  const [isSearching, setIsSearching] = useState(false);
  const [friendData, setFriendData] = useState([
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
      statusMessage: "test",
      profileImage: testFriendImage3,
    },
  ]);
  const [searchedFriendData, setSearchedFriendData] = useState([]);

  const renderSearched = (input) => {
    setIsSearching(true);

    if (input) {
      let friendDataArray = [...friendData];
      console.log(input);
      setSearchedFriendData(
        friendDataArray.filter((friend) => {
          let regex = new RegExp(input);
          return friend.name.search(regex) != -1;
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
      <FriendHeader renderSearched={renderSearched} />
      {isSearching ? (
        <FriendList friendData={searchedFriendData} />
      ) : (
        <>
          <MyProfile />
          <Partition />
          {/* added friend? */}
          <FriendList friendData={friendData} />
        </>
      )}
    </div>
  );
}

export default FriendPanel;
