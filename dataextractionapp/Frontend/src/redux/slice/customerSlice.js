import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: [],   // ✅ ensure data is always defined
  },
  reducers: {
    setCustomers: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;
