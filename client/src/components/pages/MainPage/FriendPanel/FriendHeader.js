import React, { useState } from "react";
import axios from "axios";

import { BiSearch, BiUserPlus } from "react-icons/bi";

function FriendHeader(props) {
  const [headerMenu, setHeaderMenu] = useState("");
  const handleHeaderMenuChange = (menu) => {
    if (menu == headerMenu) {
      setHeaderMenu("");
    } else {
      setHeaderMenu(menu);
    }
  };

  const renderHeaderMenu = (headerMenu) => {
    switch (headerMenu) {
      case "친구 찾기":
        return (
          <form
            style={{
              padding: "10px 0",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              gap: 10,
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                handleSearchFriend(e);
              }}
              placeholder="이름으로 친구 검색"
              style={{
                width: "50%",
                height: 32,
                borderRadius: 20,
                border: "2px solid skyblue",
                padding: "5px 10px",
                fontSize: 12,
              }}
            ></input>
          </form>
        );
        break;

      case "친구 추가":
        return (
          <>
            <form
              style={{
                padding: "10px 0",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                gap: 10,
              }}
            >
              <input
                type="text"
                onChange={(e) => {
                  handlePostAddFriend(e);
                }}
                placeholder="Email로 친구 추가"
                style={{
                  width: "50%",
                  height: 32,
                  borderRadius: 20,
                  border: "2px solid skyblue",
                  padding: "5px 10px",
                  fontSize: 12,
                }}
              ></input>
              <input
                type="submit"
                onClick={(e) => {
                  handleAddFriend(e);
                }}
                value="추가"
                style={{
                  height: 32,
                  borderRadius: 20,
                  border: "none",
                  backgroundColor: "skyblue",
                  padding: "5px 10px",
                  fontSize: 12,
                  color: "#fff",
                }}
              ></input>
            </form>
            {searchedFriendFromServer}
          </>
        );
        break;
      default:
    }
  };

  const handleSearchFriend = (e) => {
    let input = e.target.value.trim();
    props.renderSearched(input);
  };

  const searchedFriendFromServer = null;
  const handlePostAddFriend = (e) => {
    let friend_name = e.target.value;
    axios
      .post("/api/search/friend", { data: friend_name })
      .then((response) => {
        console.log(response);
        // 여기에 친구추가 전처리(검색) 작성
        searchedFriendFromServer = (
          <div
            style={{
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* 여기에 검색된 친구 출력 */}
          </div>
        );
      })
      .catch(function (error) {
        alert(`친구 정보 요청 실패
    ${error}`);
      });
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    axios
      .post("/api/insert/friend")
      .then((response) => {
        console.log(response);
        // 여기에 친구추가 작성
      })
      .catch(function (error) {
        alert(`친구 추가 실패
    ${error}`);
      });
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 30,
          paddingBottom: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ textAlign: "left", fontSize: "1.5rem", fontWeight: 600 }}>친구</h2>
        <ul style={{ display: "flex", gap: 15 }}>
          <li>
            <BiSearch
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleHeaderMenuChange("친구 찾기");
              }}
            />
          </li>
          <li>
            <BiUserPlus
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleHeaderMenuChange("친구 추가");
              }}
            />
          </li>
        </ul>
      </div>
      {headerMenu && renderHeaderMenu(headerMenu)}
    </div>
  );
}

export default FriendHeader;
