import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slice/customerSlice";
import invoiceReducer from "./slice/invoiceslice";
import productReducer from "./slice/productslice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    invoice: invoiceReducer,
    product: productReducer,
  },
});
