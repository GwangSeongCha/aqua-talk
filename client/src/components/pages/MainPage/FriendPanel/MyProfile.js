import React from "react";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import testProfileImage from "../../../../assets/images/testProfileImage.jpg"; // 임시

function MyProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  let userStatusMessage = "test"; // 임시

  return (
    <div style={{ padding: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
        <Image src={testProfileImage} width={60} roundedCircle style={{ cursor: "pointer" }} />
        <div
          style={{
            marginLeft: 10,
            width: "calc(100% - 60px)",
          }}
        >
          <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
            {currentUser && currentUser.display_name}
          </h4>
          {userStatusMessage && <p style={{ margin: 0 }}>{userStatusMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
