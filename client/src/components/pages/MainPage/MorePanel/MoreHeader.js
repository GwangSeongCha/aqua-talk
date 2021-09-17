import React from "react";

function MoreHeader() {
  return (
    <div style={{ paddingTop: 30, display: "flex", justifyContent: "space-between" }}>
      <h2 style={{ textAlign: "left", fontSize: "1.5rem", fontWeight: 600 }}>더보기</h2>
      <ul style={{ display: "flex" }}></ul>
    </div>
  );
}

export default MoreHeader;
