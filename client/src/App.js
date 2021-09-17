import React, { useState, useEffect } from "react";

import { useHistory, Switch, Route } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/actions/user_action";

import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ChatPage from "./components/pages/ChatPage";
import Loading from "./components/pages/Loading";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const domain = "http://www.aqua-talk.shop:3002";
const root = "";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(useSelector((state) => state.user.currentUser));

  useEffect(() => {
    // App 이 생성될때 '/user_info' 로 유저 정보 요청
    if (!currentUser) {
      axios
        .get("/user_info")
        .then((response) => {
          let userInfo = response.data.user_info;
          if (userInfo.id) {
            // user_info에 정보(id)가 담겨있을 경우
            // store에 저장 후 MainPage로
            console.log("유저 정보 조회", userInfo);
            dispatch(setUser(userInfo));
            setIsLoading(false);
            if (userInfo.name) {
              // name 임시
              // user_info에 세부 정보(name)가 담겨있을 경우(최초 Register단계를 거친 경우)
              history.push(`${root}/`);
            } else {
              // Register단계를 거치지 않은 경우
              history.push(`${root}/register`);
            }
          } else {
            // user_info에 정보(id)가 담겨있지 않을 경우(로그인 실패 또는 로그 아웃) 경우
            // store에서 유저 정보 삭제 후 LoginPage로
            console.log("유저 정보 없음", response);
            dispatch(clearUser());
            history.push(`${root}/login`);
          }
        })
        .catch(function (error) {
          // '/user_info'로 유저 정보 요청이 실패한 경우
          alert(`유저 정보 요청 실패
        ${error}`);
          history.push(`${root}/login`);
        });
    }
  });

  // 로그아웃 함수
  const signOut = () => {
    axios
      .get("/logout") // 임시
      .then((response) => {
        console.log("로그아웃 성공");
        dispatch(clearUser());
        history.push(`${root}/login`);
      })
      .catch(function (error) {
        alert(`로그아웃실패
        ${error}`);
      });

    // 임시
    console.log("로그아웃 성공");
    dispatch(clearUser());
    history.push(`${root}/login`);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path={`${root}/`}>
          {isLoading ? <Loading /> : <MainPage signOut={signOut} />}
        </Route>
        <Route path={`${root}/login`}>
          <LoginPage domain={domain} />
        </Route>
        <Route path={`${root}/register`}>
          <RegisterPage root={root} />
        </Route>
        <Route path={`${root}/chat/:friendEmail`}>
          <ChatPage />
        </Route>
        <Route path={`${root}/main`}>
          {/* 임시 메인 페이지 라우터*/}
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
