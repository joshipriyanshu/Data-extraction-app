// productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],   // ✅ always define initial structure
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    clearProducts: (state) => {
      state.data = [];
    },
  },
});

export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
