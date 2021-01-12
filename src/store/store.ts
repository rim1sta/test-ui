import { userSlice } from "./slices/user";
import { partnerSlice } from "./slices/partner";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    partnerSlice: partnerSlice.reducer,
    userSlice: userSlice.reducer,
  },
});
