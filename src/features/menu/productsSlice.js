import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    menuId: 1,
  },
  reducers: {
    setMenuId: (state, action) => {
      state.menuId = action.payload;
    },
  },
});

export const { setMenuId } = productsSlice.actions;

export default productsSlice.reducer;
