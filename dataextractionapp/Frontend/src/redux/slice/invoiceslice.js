import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    data: [],   // ✅ ensure data is always defined
  },
  reducers: {
    setInvoices: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
