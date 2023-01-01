import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./auth-slice";

const store = configureStore({ reducer: { user: userSlice.reducer } });

export default store;
