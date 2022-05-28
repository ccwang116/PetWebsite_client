import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    name: "",
    username: "",
    password: "",
    confirmpassword: "",
    loginErrors: [],
    auth: false,
  },
  reducers: {
    loginProcess: (state, action) => {
      const errors = [];

      // 檢查錯誤

      if (state.username === "") {
        errors.push("Account is empty");
      } else {
        if (state.userData.length === 0) {
          errors.push("E-mail not exist");
        } else {
          if (action.payload.sha1(state.password) !== state.userData[0].pwd)
            errors.push("Wrong password");
        }
      }

      if (state.password === "") errors.push("Password is empty");

      if (errors.length > 0) {
        state.loginErrors = errors;
        return;
      }

      // 清空錯誤訊息陣列 + 登入
      // 清空錯誤訊息陣列為必要
      state.loginErrors = [];

      // 執行成功的callback(來自MemberLogin)
      // loginSuccessCallback();
      state.auth = true;
      action.payload.loginSuccessCallback();
    },
    logoutProcess: (state, action) => {
      state.name = "";
      state.username = "";
      state.password = "";
      state.auth = false;
      localStorage.removeItem("member");
      // 執行成功的callback(來自MemberLogin)
      action.payload();
    },
    // 處理會員註冊
    registerProcess: (state, action) => {
      const errors = [];
      var matches = state.username.match(
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
      );
      if (state.name === "") {
        errors.push("Name is empty");
      }
      if (state.username === "") {
        errors.push("Account is empty");
      } else {
        if (state.userData.length !== 0) {
          errors.push("E-mail is not exist");
        } else if (matches === null)
          errors.push("E-mail doesn't match the pattern");
      }

      // if (password === '') errors.push('Password is empty')

      // 檢查錯誤
      if (errors.length > 0) {
        state.loginErrors = errors;
        return;
      }
      // 清空錯誤訊息陣列 + 登入
      // 清空錯誤訊息陣列為必要
      state.loginErrors = [];
      action.payload.registerSuccessCallback();
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLoginErrors: (state, action) => {
      state.loginErrors = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setConfirmpassword: (state, action) => {
      state.confirmpassword = action.payload;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const {
  loginProcess,
  logoutProcess,
  registerProcess,
  setUsername,
  setPassword,
  setUserData,
  setLoginErrors,
  setName,
  setConfirmpassword,
  setAuth,
} = userSlice.actions;

export default userSlice.reducer;
