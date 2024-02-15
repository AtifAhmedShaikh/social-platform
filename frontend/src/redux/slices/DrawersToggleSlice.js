import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "Drawers",
  // states of Drawers for open and close based on their boolean value
  initialState: {
    LikedUsersListDrawer: false,
    commentsListDrawer: false,
    shareDrawer: false,
    followersListDrawer: false,
    followingListDrawer: false,
  },
  reducers: {
    // Open the provided drawer in payload
    openDrawer: (state, action) => {
      const drawerToOpen = action.payload;
      state[drawerToOpen] = true;
    },
    // provided the payload Drawer has been closed
    closeDrawer: (state, action) => {
      const drawerToClose = action.payload;
      state[drawerToClose] = false;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
