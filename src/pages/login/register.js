import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  registerProcess,
  setUsername,
  setPassword,
  setUserData,
  setName,
  setConfirmpassword,
} from "../../features/auth/userSlice";
var sha1 = require("sha1");

function MyRegister(props) {
  const [insertData, setInsertData] = useState("");
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);
  const loginErrors = useSelector((state) => state.user.loginErrors);
  const dispatch = useDispatch();
  async function getData(username) {
    const response = await fetch(`http://localhost:3002/member/${username}`);
    const json = await response.json();
    const items = json.rows;
    dispatch(setUserData(items));
  }

  async function insertMemberToServer(item) {
    const request = new Request("http://localhost:3002/member/insertMember", {
      method: "POST",
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    console.log("After JSON: ", JSON.stringify(item));

    const response = await fetch(request);
    const data = await response.json();
  }

  const registerSuccessCallback = () => {
    insertMemberToServer(insertData);
    alert("註冊成功，跳到login");
    props.history.push("/login", { from: "從登入頁來的" });
  };

  const displayErrors = loginErrors.length ? (
    <div className="alert alert-danger" role="alert">
      <ul className="list-unstyled">
        {loginErrors.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  ) : (
    ""
  );

  const displayForm = (
    <>
      <form action="" method="">
        <div className="bg position-relative d-flex">
          <div className="bgLeft">
            <div className="loginInput">
              <div className="loginBlock">
                <h5>Name</h5>
                <input
                  className="form-control mb2"
                  type="text"
                  required="required"
                  placeholder="請輸入姓名暱稱"
                  onChange={(event) => {
                    dispatch(setName(event.target.value));
                    setInsertData({
                      ...insertData,
                      memberName: event.target.value,
                    });
                  }}
                />
                <h5>Account</h5>
                <input
                  className="form-control mb2"
                  type="text"
                  required="required"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  placeholder="請輸入信箱帳號"
                  onChange={(event) => {
                    dispatch(setUsername(event.target.value));
                    setInsertData({
                      ...insertData,
                      email: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="loginBlock">
                <h5>Password</h5>
                <input
                  className="form-control mb2"
                  type="password"
                  required="required"
                  placeholder="請輸入密碼"
                  onChange={(event) => {
                    dispatch(setPassword(event.target.value));
                    setInsertData({
                      ...insertData,
                      pwd: sha1(event.target.value),
                    });
                  }}
                />
                <h5>Confirm</h5>
                <input
                  className="form-control mb2"
                  type="password"
                  pattern={password}
                  title="與上列密碼不符"
                  required="required"
                  placeholder="再次確認密碼"
                  onChange={(event) => {
                    dispatch(setConfirmpassword(event.target.value));
                  }}
                />
                <div className="loginBlock">
                  <input
                    className="btn btn-primary mb2 loginBlock loginBtn"
                    type="submit"
                    value="Register"
                    onMouseEnter={() => {
                      getData(username);
                    }}
                    onClick={() => {
                      dispatch(registerProcess({ registerSuccessCallback }));
                    }}
                  />
                </div>
                {displayErrors}
              </div>
            </div>
          </div>
          <div className="bgRight-register"></div>
        </div>
      </form>
    </>
  );

  return <>{displayForm}</>;
}

export default withRouter(MyRegister);
