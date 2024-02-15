import { configureStore } from "@reduxjs/toolkit";
import DrawersToggleReducer from "./slices/DrawersToggleSlice";
import ModalToggleReducer from "./slices/ModalsToggleSlice";
import AuthenticationSlice from "./slices/AuthenticationSlice";

const store = configureStore({
  reducer: {
    DrawersToggle: DrawersToggleReducer,
    ModalToggle: ModalToggleReducer,
    Authentication: AuthenticationSlice,
  },
});
export default store;
