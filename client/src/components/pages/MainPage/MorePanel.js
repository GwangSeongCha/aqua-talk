import React from "react";
import MoreHeader from "./MorePanel/MoreHeader";

function MorePanel() {
  return (
    <div
      style={{
        width: "100%",
        padding: "0 20px 0 80px",
        boxSizing: "border-box",
      }}
    >
      <MoreHeader />
    </div>
  );
}

export default MorePanel;
