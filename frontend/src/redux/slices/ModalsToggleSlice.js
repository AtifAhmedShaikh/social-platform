import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "Modals",
  // states of Modal for open and close based on their boolean value
  initialState: {
    deleteConfirmationModal: false,
  },
  reducers: {
    // Open the provided modal in payload
    openModal: (state, action) => {
      const modalToOpen = action.payload;
      state[modalToOpen] = true;
    },
    // provided the payload modal has been closed
    closeModal: (state, action) => {
      const modalToClose = action.payload;
      state[modalToClose] = false;
    },
  },
});

export const { openModal, closeModal } = drawerSlice.actions;

export default drawerSlice.reducer;
