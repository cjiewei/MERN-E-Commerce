import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 設置用戶憑據並更新狀態
    setCredientials: (state, action) => {
      state.userInfo = action.payload;
      // 將 userInfo 存入 localStorage，以便在頁面刷新或重新打開時能夠恢復狀態
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      // 計算出憑據的過期時間（30 天後）並將其存儲在 localStorage 中
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },

    // 處裡用戶登出並清除狀態不保留任何用戶信息
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredientials, logout } = authSlice.actions;

export default authSlice.reducer;
