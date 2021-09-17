import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

import googleIcon from "../../assets/images/google_icon.png";

function LoginPage(props) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundImage: "linear-gradient(70deg, #3A9995, #C4EBE8)",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 200,
          color: "#fff",
          textShadow: "1px 1px 1px #3A9995",
          marginBottom: 50,
        }}
      >
        Aqua
      </h1>

      <div
        style={{
          width: "min-content",
          height: 42,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#3F81EC",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            marginLeft: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <img width="24px" src={googleIcon} />
        </div>
        <a
          href={props.domain + "/auth/google"}
          style={{
            padding: "0 20px",
            whiteSpace: "nowrap",
            textDecoration: "none",
            color: "#fff",
          }}
        >
          구글로 로그인
        </a>
      </div>
      {/* <Button
        variant="primary"
        onClick={() => {
          axios
            .get("/auth/google")
            .then(function (response) {
              console.log("로그인 성공", response);
            })
            .catch(function (error) {
              console.log("로그인 실패");
            });
        }}
      >
        Ajax 구글 버튼
      </Button> */}
      <Button as={Link} to={"/register"}>
        임시 회원가입 페이지
      </Button>
      <Button as={Link} to={"/main"}>
        임시 메인 페이지
      </Button>
    </div>
  );
}

export default LoginPage;
