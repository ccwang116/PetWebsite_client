import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginProcess,
  logoutProcess,
  setUsername,
  setPassword,
  setUserData,
  setLoginErrors,
} from "../../features/auth/userSlice";
var sha1 = require("sha1");

function MyLogin(props) {
  const userData = useSelector((state) => state.user.userData);
  const username = useSelector((state) => state.user.username);
  const loginErrors = useSelector((state) => state.user.loginErrors);
  const dispatch = useDispatch();
  const [isShowNext, setIsShowNext] = useState(false);
  async function getData(username) {
    const response = await fetch(`http://localhost:3002/member/${username}`);
    const json = await response.json();
    const items = json.rows;
    if (items.length === 0) {
      dispatch(setLoginErrors(["E-mail is not exist"]));
      return;
    }
    dispatch(setUserData(items));
    dispatch(setLoginErrors([]));
    setIsShowNext(true);
  }

  // 錯誤訊息陣列的呈現
  const displayErrors =
    loginErrors.length > 0 ? (
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

  // login成功時的callback
  const loginSuccessCallback = () => {
    localStorage.setItem("member", JSON.stringify(userData));
    // console.log(userData);
    alert("登入成功");
    props.history.push("/shop", { from: "從登入頁來的" });
  };

  // logout成功時的callback
  const logoutSuccessCallback = () => {
    alert("登出成功，跳回上一頁");
    props.history.goBack();
  };

  const forgetCallback = () => {
    props.history.push("/forgetpwd", { from: "從登入頁來的" });
  };

  const registerCallback = () => {
    props.history.push("/register", { from: "從登入頁來的" });
  };

  const forgetButton = (
    <div className="">
      <button
        className="btn btn-secondary mb-2 w-100"
        onClick={() => {
          dispatch(logoutProcess(forgetCallback));
        }}
      >
        forget password?
      </button>
    </div>
  );

  const registerButton = (
    <div className="">
      <button
        className="btn btn-success mb-2 w-100"
        onClick={() => {
          dispatch(logoutProcess(registerCallback));
        }}
      >
        register
      </button>
    </div>
  );

  const displayForm = (
    <>
      <form action="" method="" onSubmit={(e) => e.preventDefault()}>
        <div
          className=""
          style={{
            width: "250px",
            height: "320px",
            left: "840px",
            top: "140px",
            borderRadius: "10px",
            padding: "20px",
            background: "rgba(255,255,255,0.8)",
            margin: "0 auto",
          }}
        >
          <div className="" style={{ left: "860px", top: "160px" }}>
            <h5>Account</h5>
            <input
              className="form-control mb2"
              type="text"
              required="required"
              // value={username}
              disabled={isShowNext}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              placeholder="請輸入帳號"
              onChange={(event) => {
                dispatch(setUsername(event.target.value));
              }}
            />
            {isShowNext && (
              <>
                <h5>Password</h5>
                <input
                  className="form-control mb2"
                  type="password"
                  required="required"
                  placeholder="請輸入密碼"
                  onChange={(event) => {
                    dispatch(setPassword(event.target.value));
                  }}
                />

                <input
                  value="login"
                  type="submit"
                  className="btn btn-warning mb-2 w-100"
                  onClick={() => {
                    dispatch(
                      loginProcess({ sha1: sha1, loginSuccessCallback })
                    );
                  }}
                />
              </>
            )}
            {!isShowNext && (
              <button
                className="btn btn-success mb-2 w-100"
                onClick={() => getData(username)}
              >
                下一步
              </button>
            )}
            {registerButton}
            {forgetButton}
            {displayErrors}
          </div>
        </div>
      </form>
    </>
  );

  return (
    <>
      <div
        className="W-100"
        style={{
          height: "506px",
          backgroundClip: "cover",
          background:
            "url('https://cdn.pixabay.com/photo/2018/01/02/13/01/dog-3056131_960_720.jpg')",
        }}
      >
        {displayForm}
      </div>
    </>
  );
}

export default withRouter(MyLogin);
