import React from "react";

function Loading() {
  return (
    <div>
      <h1
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e101c",
          color: "#fff",
          fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
"Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
          fontWeight: "100",
        }}
      >
        ... loading
      </h1>
    </div>
  );
}

export default Loading;
